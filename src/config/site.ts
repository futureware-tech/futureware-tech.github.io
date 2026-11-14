// Governing: ADR-0002 (EN/DE subpath routing and locale-invariant testimonial), ADR-0003 (Serverless contact form and Google Calendar booking)
// Implements: SPEC-0001 REQ "Customer Review Section", SPEC-0001 REQ "Serverless Contact Form and Consultation Alternatives", SPEC-0001 REQ "Localized Legal Pages and Footer"

export const SITE_CONFIG = {
  siteUrl: 'https://futureware.dev',
  domainLabel: {
    prefix: 'future',
    accent: 'ware',
    tld: '.dev',
  },
  company: {
    legalName: 'FutureWare GmbH',
    englishLegalAlias: 'FutureWare LLC',
    street: 'Gulerstrasse 26',
    postalCode: '7320',
    city: 'Sargans',
    countryEn: 'Switzerland',
    countryDe: 'Schweiz',
    email: 'contact@futureware.ch',
  },
  bookingUrl: 'https://calendar.app.google/5Ciymv2rX73e5fwy8',
  contactForm: {
    web3FormsEndpoint: 'https://api.web3forms.com/submit',
    web3FormsAccessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
    formspreeEndpoint: import.meta.env.PUBLIC_FORMSPREE_ENDPOINT ?? '',
  },
  testimonial: {
    // Intentionally locale-invariant original German quote per ADR-0002 & SPEC-0001 REQ "Customer Review Section"
    quoteDe:
      'Katarina ist ein Profi von A-Z. Sie arbeitet exakt, rasch und zuverlässig. Ich freue mich auf weitere Projekte mit FutureWare!',
    author: 'Mario Bianchi',
    websiteUrl: 'https://rockylith.ch/',
    websiteLabel: 'rockylith.ch',
  },
} as const;
