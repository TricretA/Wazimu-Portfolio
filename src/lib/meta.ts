import { site, absoluteUrl } from '../data/site';
import { solvedProblems, findProblem, problemCount } from '../data/problems';
import { insights, findInsight } from '../data/insights';
import { services, findService } from '../data/services';
import { legalPages, privacyPolicy, termsOfService, dataDeletion } from '../data/legal';
import { pathFor, toRoute, type Route } from './route';

/**
 * Every page's head, in one place.
 *
 * The prerender script writes these into the static HTML at build time and the
 * client re-applies them on navigation, so a crawler and a person clicking
 * around end up looking at the same title and description. Deriving them from
 * the same data the page renders means they cannot drift from the content.
 */

export interface Head {
  title: string;
  description: string;
  /** Absolute. Both the `<link rel=canonical>` and `og:url`. */
  canonical: string;
  ogType: 'website' | 'article' | 'profile';
  /** Absolute URL of the share image. */
  ogImage: string;
  /** ISO dates, articles only. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Set on pages that exist for people but add nothing to an index. */
  noindex?: boolean;
}

const DEFAULT_OG = absoluteUrl('/og.png');

/**
 * Meta descriptions get truncated around 155–160 characters in results, so
 * anything past that is written for nobody. Cuts on a word boundary.
 */
function clamp(text: string, limit = 155): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const cut = flat.slice(0, limit - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** `Title | Tricreta`, unless the title already carries the brand. */
function titled(text: string): string {
  return text.includes(site.workName) ? text : `${text} | ${site.workName}`;
}

/** The share image for a case study is its own screenshot where it has one. */
function shareImage(image: string | null): string {
  return image ? absoluteUrl(image) : DEFAULT_OG;
}

export function headFor(route: Route): Head {
  switch (route.kind) {
    case 'home':
      return {
        title: `${site.name} (${site.workName}) — ${site.jobTitle} in Kenya`,
        description: clamp(
          `I build WhatsApp Business API automations, M-Pesa integrations, n8n workflows and AI agents for businesses in Kenya and East Africa. ${problemCount} documented case studies.`
        ),
        canonical: absoluteUrl('/'),
        ogType: 'profile',
        ogImage: DEFAULT_OG
      };

    case 'work-index':
      return {
        title: `${problemCount} solved business problems — case studies`,
        description: clamp(
          `Every project is a real business problem, the system built to remove it, and what changed afterwards. ${problemCount} case studies across automation, AI, web, mobile, design and video.`
        ),
        canonical: absoluteUrl(pathFor.workIndex()),
        ogType: 'website',
        ogImage: DEFAULT_OG
      };

    case 'work': {
      const project = findProblem(route.slug);
      if (!project) return notFoundHead();
      return {
        title: titled(`${project.title} — ${project.category} case study`),
        description: clamp(project.summary),
        canonical: absoluteUrl(pathFor.work(project.slug)),
        ogType: 'article',
        ogImage: shareImage(project.image)
      };
    }

    case 'insight-index':
      return {
        title: 'Insights on automation, AI and building for Kenyan businesses',
        description: clamp(
          'Plain-spoken writing on automation, applied AI, and why most business software quietly fails to do its job.'
        ),
        canonical: absoluteUrl(pathFor.insightIndex()),
        ogType: 'website',
        ogImage: DEFAULT_OG
      };

    case 'insight': {
      const post = findInsight(route.slug);
      if (!post) return notFoundHead();
      return {
        title: titled(post.title),
        description: clamp(post.dek),
        canonical: absoluteUrl(pathFor.insight(post.slug)),
        ogType: 'article',
        ogImage: DEFAULT_OG,
        publishedTime: post.published,
        modifiedTime: post.updated ?? post.published
      };
    }

    case 'service-index':
      return {
        title: 'Services — automation, applied AI, web, mobile, design, video',
        description: clamp(
          `What I build and what each capability fixes. Led by ${site.specialism}.`
        ),
        canonical: absoluteUrl(pathFor.serviceIndex()),
        ogType: 'website',
        ogImage: DEFAULT_OG
      };

    case 'service': {
      const service = findService(route.slug);
      if (!service) return notFoundHead();
      return {
        title: titled(`${service.title} in Kenya`),
        description: clamp(service.lede),
        canonical: absoluteUrl(pathFor.service(service.slug)),
        ogType: 'website',
        ogImage: DEFAULT_OG
      };
    }

    case 'about':
      return {
        title: `About ${site.name} — ${site.jobTitle}`,
        description: clamp(
          `${site.name}, known as ${site.workName}: a Kenyan automation engineer and applied AI developer building WhatsApp, M-Pesa and n8n systems for businesses across East Africa.`
        ),
        canonical: absoluteUrl(pathFor.about()),
        ogType: 'profile',
        ogImage: DEFAULT_OG
      };

    case 'contact':
      return {
        title: `Contact ${site.name} (${site.workName})`,
        description: clamp(
          `Start a project: WhatsApp ${site.phone}, email ${site.email}. Tell me what is broken and you get a fixed figure in writing.`
        ),
        canonical: absoluteUrl(pathFor.contact()),
        ogType: 'website',
        ogImage: DEFAULT_OG
      };

    case 'privacy':
      return legalHead(privacyPolicy.title, privacyPolicy.tagline, pathFor.legal('privacy'));

    case 'terms':
      return legalHead(termsOfService.title, termsOfService.tagline, pathFor.legal('terms'));

    case 'data':
      return legalHead(dataDeletion.title, dataDeletion.tagline, pathFor.legal('data'));

    case 'not-found':
    default:
      return notFoundHead();
  }
}

function legalHead(title: string, tagline: string, path: string): Head {
  return {
    title: titled(title),
    description: clamp(tagline),
    canonical: absoluteUrl(path),
    ogType: 'article',
    ogImage: DEFAULT_OG
  };
}

function notFoundHead(): Head {
  return {
    title: titled('Page not found'),
    description: 'That page does not exist. Everything else is one click away.',
    canonical: absoluteUrl('/404'),
    ogType: 'website',
    ogImage: DEFAULT_OG,
    noindex: true
  };
}

export function headForPath(path: string): Head {
  return headFor(toRoute(path));
}

/* ------------------------------------------------------------------ *
 * The route table
 * ------------------------------------------------------------------ */

export interface RouteEntry {
  path: string;
  /** Relative weight in the sitemap. The home page is the only 1.0. */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** ISO date, where the content carries one. */
  lastmod?: string;
}

/**
 * Every URL the site publishes.
 *
 * The prerender script renders this list, the sitemap is generated from it,
 * and `llms.txt` links from it — so a new case study appears in all three the
 * moment it lands in `data/problems.ts`, with nothing to remember.
 */
export const routeTable: RouteEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: pathFor.workIndex(), priority: 0.9, changefreq: 'weekly' },
  { path: pathFor.serviceIndex(), priority: 0.9, changefreq: 'monthly' },
  { path: pathFor.insightIndex(), priority: 0.8, changefreq: 'weekly' },
  { path: pathFor.about(), priority: 0.8, changefreq: 'monthly' },
  { path: pathFor.contact(), priority: 0.8, changefreq: 'monthly' },

  ...services.map((service) => ({
    path: pathFor.service(service.slug),
    priority: 0.85,
    changefreq: 'monthly' as const
  })),

  ...solvedProblems.map((project) => ({
    // Live, verifiable builds carry more weight than design one-offs.
    path: pathFor.work(project.slug),
    priority: project.status === 'public' ? 0.7 : 0.6,
    changefreq: 'monthly' as const
  })),

  ...insights.map((post) => ({
    path: pathFor.insight(post.slug),
    priority: 0.7,
    changefreq: 'monthly' as const,
    lastmod: post.updated ?? post.published
  })),

  ...legalPages.map((page) => ({
    path: pathFor.legal(page.slug),
    priority: 0.2,
    changefreq: 'yearly' as const
  }))
];

/** Just the paths, for the prerenderer. */
export const allPaths: string[] = routeTable.map((entry) => entry.path);
