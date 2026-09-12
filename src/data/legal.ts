/**
 * The legal documents — Privacy Policy and Terms of Service.
 *
 * These exist because platform reviewers (Meta / WhatsApp Business API among
 * them) require a public privacy policy URL and a public terms URL before
 * granting API access. They are rendered by `components/LegalPage`, and each
 * gets a real static entry (`/privacy`, `/terms`) so the URL resolves on any
 * host without a rewrite rule.
 *
 * Copy lives here rather than in the component for the same reason the rest of
 * `src/data` does: content is edited far more often than layout.
 */

/** A paragraph, a bulleted list, or a pulled-out statement. */
export type LegalBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'note'; text: string };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  /** Path segment, without the leading slash. */
  slug: 'privacy' | 'terms';
  /** Short label used in navigation and the footer. */
  label: string;
  /** Kicker above the title. */
  eyebrow: string;
  title: string;
  /** One line under the title. Doubles as the page meta description. */
  tagline: string;
  /** Lead paragraph, set larger than the body. */
  intro: string;
  updated: string;
  sections: LegalSection[];
}

/** Both documents state the same effective date — they shipped together. */
const UPDATED = '12 September 2026';

export const privacyPolicy: LegalDoc = {
  slug: 'privacy',
  label: 'Privacy',
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  tagline:
    'How Tricreta utilizes account credentials, workspace activity, payments, automation events, and customer support data to run the platform securely.',
  intro:
    'Tricreta uses certain account and activity information to operate the platform securely and provide selling, automation, payment, and support services.',
  updated: UPDATED,
  sections: [
    {
      heading: 'Your Privacy Matters',
      blocks: [
        {
          kind: 'text',
          text: 'Tricreta uses certain account and activity information to operate the platform securely and provide selling, automation, payment, and support services.'
        },
        { kind: 'note', text: 'We do not sell your personal data.' }
      ]
    },
    {
      heading: 'Information We Collect',
      blocks: [
        {
          kind: 'list',
          items: [
            'Your business name and profile details',
            'Phone numbers linked to your account',
            'Payment references and transaction activity'
          ]
        },
        {
          kind: 'text',
          text: 'This information helps us improve reliability, support, fraud protection, and platform performance.'
        }
      ]
    },
    {
      heading: 'Customer Information',
      blocks: [
        { kind: 'text', text: 'If you use Tricreta to serve customers, you may handle:' },
        {
          kind: 'list',
          items: ['Customer phone numbers', 'Orders and payment confirmations', 'Delivery records']
        }
      ]
    },
    {
      heading: 'Security and Protection',
      blocks: [
        {
          kind: 'text',
          text: 'We use security controls, account protections, and system monitoring to help protect platform data and reduce unauthorized access.'
        },
        { kind: 'text', text: 'While we work hard to keep the platform secure, users should also:' },
        {
          kind: 'list',
          items: [
            'Use strong passwords',
            'Avoid sharing login details',
            'Report suspicious activity quickly'
          ]
        }
      ]
    },
    {
      heading: 'Third-Party Services',
      blocks: [
        { kind: 'text', text: 'Some Tricreta features may rely on third-party providers such as:' },
        {
          kind: 'list',
          items: ['M-Pesa services', 'WhatsApp integrations', 'Hosting or automation systems']
        },
        {
          kind: 'text',
          text: 'Certain information may pass through these services to complete payments, messaging, or automation workflows.'
        }
      ]
    },
    {
      heading: 'Policy Updates',
      blocks: [
        {
          kind: 'text',
          text: 'As Tricreta grows, this privacy policy may be updated to reflect new services, legal requirements, or platform improvements.'
        },
        {
          kind: 'text',
          text: 'Major updates will be communicated clearly inside the platform or official channels.'
        }
      ]
    }
  ]
};

export const termsOfService: LegalDoc = {
  slug: 'terms',
  label: 'Terms',
  eyebrow: 'Legal',
  title: 'Terms of Service',
  tagline:
    'The terms you agree to when you use Tricreta for selling, automation, payments, messaging, and customer support.',
  intro:
    'These terms cover how Tricreta may be used, what we are responsible for, and what you are responsible for as an account holder.',
  updated: UPDATED,
  sections: [
    {
      heading: 'Accepting These Terms',
      blocks: [
        {
          kind: 'text',
          text: 'By creating an account or using any part of the Tricreta platform, you agree to these terms. If you do not agree with them, please do not use the platform.'
        },
        {
          kind: 'text',
          text: 'If you use Tricreta on behalf of a business, you confirm you are authorized to accept these terms for that business.'
        }
      ]
    },
    {
      heading: 'What Tricreta Provides',
      blocks: [
        {
          kind: 'text',
          text: 'Tricreta provides software for running and growing a business, which may include:'
        },
        {
          kind: 'list',
          items: [
            'Selling and order management tools',
            'Automation and workflow features',
            'Payment and transaction handling',
            'Messaging and customer support features'
          ]
        },
        { kind: 'text', text: 'Features may be added, changed, or retired as the platform grows.' }
      ]
    },
    {
      heading: 'Your Account',
      blocks: [
        {
          kind: 'text',
          text: 'You are responsible for the account you create and for everything done through it. That means you should:'
        },
        {
          kind: 'list',
          items: [
            'Provide accurate business and contact details',
            'Keep your login details private',
            'Use strong passwords and account protections',
            'Report suspicious activity quickly'
          ]
        }
      ]
    },
    {
      heading: 'Acceptable Use',
      blocks: [
        { kind: 'text', text: 'You agree not to use Tricreta to:' },
        {
          kind: 'list',
          items: [
            'Break any applicable law or regulation',
            'Send spam, scams, or unsolicited bulk messages',
            'Impersonate another person or business',
            'Attempt to gain unauthorized access to the platform or to other accounts',
            'Interfere with, overload, or disrupt platform systems'
          ]
        },
        {
          kind: 'note',
          text: 'Accounts used for fraud, abuse, or unlawful activity may be suspended without notice.'
        }
      ]
    },
    {
      heading: 'Customer Data You Handle',
      blocks: [
        {
          kind: 'text',
          text: 'If you use Tricreta to serve your own customers, you remain responsible for the customer information you collect and process — including phone numbers, orders, payment confirmations, and delivery records.'
        },
        {
          kind: 'text',
          text: 'You agree to handle that information lawfully and to honour any request your customers make about their own data.'
        }
      ]
    },
    {
      heading: 'Payments',
      blocks: [
        {
          kind: 'text',
          text: 'Where the platform handles payments, transactions are processed through third-party providers such as M-Pesa. Those providers apply their own terms, fees, and limits.'
        },
        {
          kind: 'text',
          text: 'You are responsible for the accuracy of the payment details you enter, and for any taxes arising from your own sales.'
        }
      ]
    },
    {
      heading: 'Third-Party Services',
      blocks: [
        {
          kind: 'text',
          text: 'Some features depend on third-party providers — M-Pesa services, WhatsApp integrations, and hosting or automation systems among them. Your use of those features is also subject to each provider’s own terms.'
        },
        {
          kind: 'text',
          text: 'We are not responsible for outages, changes, or decisions made by those providers.'
        }
      ]
    },
    {
      heading: 'Availability',
      blocks: [
        {
          kind: 'text',
          text: 'We work to keep Tricreta running reliably, but the platform is provided on an “as available” basis. Maintenance, upgrades, network problems, or third-party outages may interrupt service from time to time.'
        }
      ]
    },
    {
      heading: 'Limitation of Liability',
      blocks: [
        {
          kind: 'text',
          text: 'To the extent permitted by law, Tricreta is not liable for indirect or consequential losses — including lost profits, lost sales, or lost data — arising from your use of the platform.'
        },
        {
          kind: 'text',
          text: 'Nothing in these terms removes rights you hold that cannot be limited by law.'
        }
      ]
    },
    {
      heading: 'Ending Your Use',
      blocks: [
        {
          kind: 'text',
          text: 'You may stop using Tricreta at any time. We may suspend or close an account that breaches these terms, puts other users at risk, or that we are required by law to close.'
        }
      ]
    },
    {
      heading: 'Changes to These Terms',
      blocks: [
        {
          kind: 'text',
          text: 'As Tricreta grows, these terms may be updated to reflect new services, legal requirements, or platform improvements.'
        },
        {
          kind: 'text',
          text: 'Major updates will be communicated clearly inside the platform or official channels. Continuing to use the platform after an update means you accept the revised terms.'
        }
      ]
    },
    {
      heading: 'Governing Law',
      blocks: [
        {
          kind: 'text',
          text: 'These terms are governed by the laws of Kenya, where Tricreta is operated.'
        }
      ]
    }
  ]
};

export const legalDocs = [privacyPolicy, termsOfService] as const;

/* ---------------------------------------------------------------------------
 * Data deletion
 * ------------------------------------------------------------------------ */

/**
 * Where a submitted deletion request is POSTed as JSON.
 *
 * Null until the receiving endpoint exists — an n8n webhook, a form service,
 * anything that accepts a POST. Set the URL here and the form starts
 * delivering; nothing else needs to change. While it is null the confirmation
 * screen asks the requester to send the same details over WhatsApp or email
 * instead, so a request made today still reaches a person.
 */
export const DELETION_ENDPOINT: string | null = null;

/** Hours quoted to the requester, and used in the confirmation copy. */
export const DELETION_WINDOW_HOURS = 24;

export interface DeletionPageCopy {
  slug: 'data';
  label: string;
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  /** Shown above the form — what the request actually does. */
  notice: string[];
  /** What gets removed, listed so the requester knows what they are losing. */
  removes: string[];
}

export const dataDeletion: DeletionPageCopy = {
  slug: 'data',
  label: 'Data',
  eyebrow: 'Legal',
  title: 'Data Deletion Request',
  tagline:
    'Request the permanent removal of your business and customer data from the Tricreta WhatsApp automation.',
  intro:
    'Use this form to ask for your data to be deleted from the Tricreta WhatsApp automation. Fill in the details linked to your account so the right records can be found.',
  notice: [
    `Requests are processed within ${DELETION_WINDOW_HOURS} hours of being received.`,
    'Deletion is permanent and cannot be reversed. Once your records are removed they cannot be recovered, and any automation running against them stops working.'
  ],
  removes: [
    'Your business name and profile details',
    'Phone numbers linked to your account',
    'Message and automation history',
    'Payment references and transaction activity',
    'Customer records held on your behalf — phone numbers, orders, and delivery records'
  ]
};

/**
 * Every legal URL, in footer order. Drives the footer row and the
 * cross-links at the foot of each page, so a new document is added once.
 */
export const legalPages = [
  { slug: 'privacy', label: privacyPolicy.label, title: privacyPolicy.title },
  { slug: 'terms', label: termsOfService.label, title: termsOfService.title },
  { slug: 'data', label: dataDeletion.label, title: dataDeletion.title }
] as const;

export type LegalSlug = (typeof legalPages)[number]['slug'];
