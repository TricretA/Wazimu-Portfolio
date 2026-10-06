import { site, sameAs, knowsAbout, absoluteUrl } from '../data/site';
import { solvedProblems, findProblem, problemCount } from '../data/problems';
import { insights, findInsight } from '../data/insights';
import { services, findService, type Faq } from '../data/services';
import { contactFaqs } from '../data/faqs';
import { testimonials } from '../data/testimonials';
import { pathFor, type Route } from './route';

/**
 * JSON-LD, generated from the same data the pages render.
 *
 * Google is explicit that structured data is not required to appear in its
 * generative features, and that is worth believing rather than working around.
 * It is here for the things it genuinely does: rich results, and giving every
 * engine an unambiguous machine-readable statement of who this person is, what
 * they do, and which of these pages are the same entity. Hand-written schema
 * drifts from the page within two edits; generated schema cannot.
 *
 * Stable `@id`s let the separate blocks reference one another instead of
 * repeating themselves, so a crawler resolves one Person across sixty-six
 * pages rather than sixty-six similar-looking people.
 */

type Json = Record<string, unknown>;

export const ID = {
  person: `${site.origin}/#person`,
  business: `${site.origin}/#business`,
  website: `${site.origin}/#website`,
  work: (slug: string) => `${site.origin}${pathFor.work(slug)}#project`,
  insight: (slug: string) => `${site.origin}${pathFor.insight(slug)}#article`,
  service: (slug: string) => `${site.origin}${pathFor.service(slug)}#service`
};

/* ------------------------------------------------------------------ *
 * The entity
 * ------------------------------------------------------------------ */

function person(): Json {
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: site.name,
    alternateName: site.workName,
    jobTitle: site.jobTitle,
    description: `Kenyan automation engineer and applied AI developer specialising in ${site.specialism}.`,
    url: site.origin,
    image: absoluteUrl('/portrait.webp'),
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: site.location.countryCode
    },
    nationality: { '@type': 'Country', name: site.location.country },
    knowsAbout,
    knowsLanguage: ['en', 'sw'],
    sameAs
  };
}

/**
 * The person is who a reader is hiring; the service is what a "who can do X
 * near me" query matches against. They are the same operation, so they point
 * at each other rather than competing as two separate businesses.
 */
function professionalService(): Json {
  return {
    '@type': 'ProfessionalService',
    '@id': ID.business,
    name: site.workName,
    legalName: site.name,
    description: `Automation, applied AI and software development for businesses in Kenya and East Africa. ${site.specialism}.`,
    url: site.origin,
    image: absoluteUrl('/og.png'),
    logo: absoluteUrl('/logo.webp'),
    email: `mailto:${site.email}`,
    telephone: site.phone,
    founder: { '@id': ID.person },
    employee: { '@id': ID.person },
    address: {
      '@type': 'PostalAddress',
      addressCountry: site.location.countryCode
    },
    areaServed: [
      { '@type': 'Country', name: site.location.country },
      { '@type': 'Place', name: site.location.region },
      { '@type': 'Place', name: 'Worldwide (remote)' }
    ],
    priceRange: 'Quoted per project',
    knowsAbout,
    sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: site.phone,
        email: site.email,
        availableLanguage: ['English', 'Swahili'],
        areaServed: site.location.countryCode
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': ID.service(service.slug),
          name: service.title,
          description: service.desc,
          url: absoluteUrl(pathFor.service(service.slug))
        }
      }))
    }
  };
}

function website(): Json {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    name: `${site.workName} — ${site.name}`,
    url: site.origin,
    inLanguage: 'en',
    publisher: { '@id': ID.person }
  };
}

/* ------------------------------------------------------------------ *
 * Reviews
 * ------------------------------------------------------------------ */

/**
 * Four of the seven clients gave a company and a role but no personal name.
 * Schema requires an author, and inventing one would be the worst possible
 * answer, so the business stands as the author — which is also who the quote
 * is really from.
 */
function reviewsFor(slug: string): Json[] {
  return testimonials
    .filter((quote) => quote.projectSlug === slug)
    .map((quote) => ({
      '@type': 'Review',
      reviewBody: quote.quote,
      author: quote.name
        ? { '@type': 'Person', name: quote.name, worksFor: { '@type': 'Organization', name: quote.business } }
        : { '@type': 'Organization', name: quote.business },
      itemReviewed: { '@id': ID.work(slug) }
    }));
}

/* ------------------------------------------------------------------ *
 * Page-level blocks
 * ------------------------------------------------------------------ */

function breadcrumbs(trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path)
    }))
  };
}

function faqPage(faqs: Faq[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

/** Strips the `**emphasis**` markers so schema carries prose, not markup. */
function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ *
 * Per-route assembly
 * ------------------------------------------------------------------ */

/**
 * Returns the `@graph` entries for a route. The prerender script wraps them in
 * a single `application/ld+json` block, because one graph with cross-references
 * resolves more reliably than five disconnected scripts.
 */
export function schemaFor(route: Route): Json[] {
  switch (route.kind) {
    case 'home':
      return [
        person(),
        professionalService(),
        website(),
        {
          '@type': 'ProfilePage',
          '@id': `${site.origin}/#profilepage`,
          url: site.origin,
          mainEntity: { '@id': ID.person },
          isPartOf: { '@id': ID.website },
          about: { '@id': ID.person }
        },
        {
          '@type': 'ItemList',
          name: `${problemCount} solved business problems`,
          numberOfItems: problemCount,
          itemListElement: solvedProblems.slice(0, 20).map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: project.title,
            url: absoluteUrl(pathFor.work(project.slug))
          }))
        }
      ];

    case 'about':
      return [
        person(),
        {
          '@type': 'ProfilePage',
          '@id': `${site.origin}${pathFor.about()}#profilepage`,
          url: absoluteUrl(pathFor.about()),
          mainEntity: { '@id': ID.person },
          isPartOf: { '@id': ID.website }
        },
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'About', path: pathFor.about() }
        ])
      ];

    case 'contact':
      return [
        professionalService(),
        {
          '@type': 'ContactPage',
          url: absoluteUrl(pathFor.contact()),
          mainEntity: { '@id': ID.business }
        },
        faqPage(contactFaqs),
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Contact', path: pathFor.contact() }
        ])
      ];

    case 'work-index':
      return [
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Work', path: pathFor.workIndex() }
        ]),
        {
          '@type': 'CollectionPage',
          url: absoluteUrl(pathFor.workIndex()),
          name: `${problemCount} solved business problems`,
          isPartOf: { '@id': ID.website },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: problemCount,
            itemListElement: solvedProblems.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: project.title,
              url: absoluteUrl(pathFor.work(project.slug))
            }))
          }
        }
      ];

    case 'work': {
      const project = findProblem(route.slug);
      if (!project) return [];
      const creativeWork: Json = {
        '@type': 'CreativeWork',
        '@id': ID.work(project.slug),
        name: project.title,
        headline: project.title,
        abstract: project.summary,
        description: `${project.problem} ${project.solution} ${project.outcome}`,
        url: absoluteUrl(pathFor.work(project.slug)),
        genre: project.category,
        creator: { '@id': ID.person },
        author: { '@id': ID.person },
        provider: { '@id': ID.business },
        inLanguage: 'en',
        ...(project.image ? { image: absoluteUrl(project.image) } : {}),
        // `sameAs` points at the live deployment; `url` stays on the case
        // study, so the two never compete for the same canonical.
        ...(project.status === 'public' && project.link ? { sameAs: project.link } : {}),
        ...(project.repoUrl ? { codeRepository: project.repoUrl } : {})
      };
      const reviews = reviewsFor(project.slug);
      if (reviews.length) creativeWork.review = reviews;

      return [
        creativeWork,
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Work', path: pathFor.workIndex() },
          { name: project.title, path: pathFor.work(project.slug) }
        ])
      ];
    }

    case 'insight-index':
      return [
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Insights', path: pathFor.insightIndex() }
        ]),
        {
          '@type': 'Blog',
          url: absoluteUrl(pathFor.insightIndex()),
          name: 'Insights',
          publisher: { '@id': ID.person },
          blogPost: insights.map((post) => ({
            '@type': 'BlogPosting',
            '@id': ID.insight(post.slug),
            headline: post.title,
            url: absoluteUrl(pathFor.insight(post.slug)),
            datePublished: post.published,
            dateModified: post.updated ?? post.published
          }))
        }
      ];

    case 'insight': {
      const post = findInsight(route.slug);
      if (!post) return [];
      return [
        {
          '@type': 'BlogPosting',
          '@id': ID.insight(post.slug),
          headline: post.title,
          description: post.dek,
          articleBody: plain(post.body),
          url: absoluteUrl(pathFor.insight(post.slug)),
          mainEntityOfPage: absoluteUrl(pathFor.insight(post.slug)),
          datePublished: post.published,
          dateModified: post.updated ?? post.published,
          wordCount: plain(post.body).split(/\s+/).length,
          timeRequired: `PT${post.minutes}M`,
          inLanguage: 'en',
          author: { '@id': ID.person },
          publisher: { '@id': ID.person },
          image: absoluteUrl('/og.png')
        },
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Insights', path: pathFor.insightIndex() },
          { name: post.title, path: pathFor.insight(post.slug) }
        ])
      ];
    }

    case 'service-index':
      return [
        professionalService(),
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Services', path: pathFor.serviceIndex() }
        ])
      ];

    case 'service': {
      const service = findService(route.slug);
      if (!service) return [];
      return [
        {
          '@type': 'Service',
          '@id': ID.service(service.slug),
          name: service.title,
          description: service.lede,
          url: absoluteUrl(pathFor.service(service.slug)),
          serviceType: service.title,
          provider: { '@id': ID.business },
          areaServed: [
            { '@type': 'Country', name: site.location.country },
            { '@type': 'Place', name: site.location.region }
          ],
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: absoluteUrl(pathFor.contact()),
            servicePhone: site.phone
          }
        },
        faqPage(service.faqs),
        breadcrumbs([
          { name: 'Home', path: pathFor.home() },
          { name: 'Services', path: pathFor.serviceIndex() },
          { name: service.title, path: pathFor.service(service.slug) }
        ])
      ];
    }

    case 'privacy':
    case 'terms':
    case 'data':
      return [
        {
          '@type': 'WebPage',
          url: absoluteUrl(pathFor.legal(route.kind)),
          isPartOf: { '@id': ID.website },
          publisher: { '@id': ID.person }
        }
      ];

    default:
      return [];
  }
}

/** The finished `<script type="application/ld+json">` payload for a route. */
export function schemaJson(route: Route): string | null {
  const graph = schemaFor(route);
  if (!graph.length) return null;
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}
