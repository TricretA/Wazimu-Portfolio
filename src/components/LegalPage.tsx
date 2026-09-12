import { Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';
import type { LegalBlock, LegalDoc } from '../data/legal';
import LegalShell from './LegalShell';

interface Props {
  doc: LegalDoc;
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === 'list') {
    return (
      <ul className="mt-3 flex flex-col gap-2.5">
        {block.items.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-[0.92rem] leading-relaxed text-[var(--soft)] before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[rgb(var(--cat-rgb))] before:opacity-70 before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === 'note') {
    return (
      <p className="mt-4 rounded-2xl border border-[rgba(164,255,231,0.16)] bg-[rgba(164,255,231,0.06)] px-4 py-3 text-[0.92rem] font-semibold leading-relaxed text-[var(--success)]">
        {block.text}
      </p>
    );
  }

  return <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--soft)]">{block.text}</p>;
}

/**
 * Renders one prose legal document — the privacy policy or the terms. They are
 * the same shape, and platform reviewers read them side by side.
 */
export default function LegalPage({ doc }: Props) {
  return (
    <LegalShell
      slug={doc.slug}
      eyebrow={doc.eyebrow}
      title={doc.title}
      tagline={doc.tagline}
      updated={doc.updated}
    >
      <article className="glass-panel px-5 py-8 sm:px-9 sm:py-11">
        <p className="text-[1.02rem] leading-[1.7] text-[var(--text)]">{doc.intro}</p>

        {doc.sections.map((section, index) => (
          <section
            key={section.heading}
            className={index === 0 ? 'mt-9' : 'mt-9 border-t border-[var(--line-soft)] pt-9'}
          >
            <h2 className="m-0 text-[1.12rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
              {section.heading}
            </h2>
            {section.blocks.map((block, blockIndex) => (
              <Block key={blockIndex} block={block} />
            ))}
          </section>
        ))}

        {/* Reviewers look for a reachable owner; so do users. */}
        <section className="mt-9 border-t border-[var(--line-soft)] pt-9">
          <h2 className="m-0 text-[1.12rem] font-semibold tracking-[-0.01em] text-[var(--text)]">
            Contact
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--soft)]">
            Questions about this {doc.title.toLowerCase()}? Reach {site.name} directly.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${site.email}`} className="secondary-button w-full sm:w-auto">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button w-full sm:w-auto"
            >
              <FaWhatsapp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </section>
      </article>
    </LegalShell>
  );
}
