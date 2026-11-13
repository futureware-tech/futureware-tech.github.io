// Governing: ADR-0002 (Bilingual EN/DE subpath routing and translation strategy)
// Implements: SPEC-0001 REQ "Bilingual Navigation and Localized SEO Routing", SPEC-0001 REQ "Hero, Core Capabilities, and Value Proposition Sections", SPEC-0001 REQ "Customer Review Section", SPEC-0001 REQ "Serverless Contact Form and Consultation Alternatives", SPEC-0001 REQ "Localized Legal Pages and Footer"

export type Locale = 'en' | 'de';

export const LOCALES: readonly Locale[] = ['en', 'de'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

export function localePath(lang: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') {
    return normalized;
  }
  if (normalized === '/') {
    return '/de/';
  }
  return `/de${normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/de' || pathname === '/de/') {
    return '/';
  }
  if (pathname.startsWith('/de/')) {
    return pathname.slice(3);
  }
  return pathname || '/';
}

export const UI_STRINGS = {
  en: {
    meta: {
      homeTitle: 'Futureware | Local AI & Automation Solutions',
      homeDescription:
        'Futureware provides secure, custom AI solutions, intelligent RAG systems, and automations to streamline your routine tasks while keeping your data strictly local and private.',
      imprintTitle: 'Imprint | Futureware',
      imprintDescription: 'Corporate imprint and legal disclosure for FutureWare GmbH in Sargans, Switzerland.',
      privacyTitle: 'Privacy Policy | Futureware',
      privacyDescription:
        'Data protection and privacy policy of FutureWare GmbH under the Swiss Federal Act on Data Protection (FADP) and EU GDPR.',
      projectsTitle: 'Projects & Use-Cases | Futureware',
      projectsDescription:
        'Real-world local AI deployments, RAG pipelines, and workflow automations built by Futureware.',
      blogTitle: 'Blog & Insights | Futureware',
      blogDescription:
        'Practical articles on sovereign local AI, Retrieval-Augmented Generation, and business process automation.',
    },
    a11y: {
      skipToContent: 'Skip to main content',
      primaryNav: 'Primary',
      footerNav: 'Legal',
      languageSwitcher: 'Language selector',
      menuButton: 'Menu',
      switchToEnglish: 'English',
      switchToGerman: 'Deutsch',
      pauseAnimation: 'Pause background animation',
      playAnimation: 'Play background animation',
      errorIconLabel: 'Error',
      externalNewTab: '(opens in a new tab)',
    },
    nav: {
      services: 'Services',
      benefits: 'Why Us',
      reviews: 'Testimonials',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact',
      bookCall: 'Book Consultation',
    },
    hero: {
      titleLead: 'Empower Your Business with',
      titleAccent: 'Local AI & Automation',
      subtitle:
        'Futureware provides secure, custom AI solutions, Intelligent RAG systems, and automations to streamline your routine tasks while keeping your data strictly local and private.',
      primaryCta: 'Explore Solutions',
      secondaryCta: 'Book a Consultation',
    },
    services: {
      heading: 'Our Core Capabilities',
      subheading:
        'We build practical, modern tools that solve real business problems without compromising security.',
      items: [
        {
          id: 'local-ai',
          accent: 'brand',
          title: 'Local AI Solutions',
          description:
            'We deploy powerful Large Language Models (LLMs) and AI tools directly on your own hardware or local infrastructure. Guarantee absolute data sovereignty and compliance by cutting the cord to external cloud providers.',
        },
        {
          id: 'rag-systems',
          accent: 'purple',
          title: 'RAG Systems (Chat with your Data)',
          description:
            "Retrieval-Augmented Generation (RAG) allows you to securely connect AI to your company's documents, PDFs, and databases. Find instant answers, summarize massive reports, and extract key knowledge instantly.",
        },
        {
          id: 'task-automation',
          accent: 'green',
          title: 'Routine Task Automation',
          description:
            "We build intelligent workflows that automate your repetitive tasks—from sorting emails and processing invoices to data entry. Free your team's time so they can focus on high-value, strategic work.",
        },
        {
          id: 'custom-agents',
          accent: 'orange',
          title: 'Custom AI Agents',
          description:
            'We design tailor-made chatbots and virtual assistants tailored to your specific business logic. Whether for customer support, internal IT queries, or industry-specific analysis, our agents work 24/7.',
        },
      ],
    },
    benefits: {
      headingPrefix: 'Why Partner with',
      headingBrand: 'Futureware',
      headingSuffix: '?',
      visualCaption: 'Sovereign local AI architecture keeping enterprise data inside your perimeter',
      items: [
        {
          title: 'Data Privacy First',
          description:
            'Based in Switzerland, we understand the importance of data security. Local deployments ensure your proprietary data never leaves your environment.',
        },
        {
          title: 'Tailored to Your Needs',
          description:
            "We don't sell off-the-shelf software. We analyze your unique bottlenecks and build lightweight, effective automations that fit right into your workflow.",
        },
        {
          title: 'Simple Language, Clear Results',
          description:
            'We skip the complex technical jargon. Our focus is on clear communication, fast implementation, and measurable improvements to your business operations.',
        },
      ],
    },
    testimonial: {
      heading: 'What Our Clients Say',
      subheading: 'Trusted execution and Swiss engineering precision.',
    },
    contact: {
      heading: 'Ready to Optimize Your Workflows?',
      subheading:
        "Let's discuss how local AI and automation can solve your specific challenges.",
      preferCallText: 'Prefer to talk directly? Schedule a free 30-minute consultation:',
      bookCallButton: 'Book 30-min Free Consultation',
      nameLabel: 'Name',
      namePlaceholder: 'Jane Doe',
      nameError: 'Please enter your name (at least 2 characters).',
      emailLabel: 'Email',
      emailHint: 'Format: jane@company.com',
      emailPlaceholder: 'jane@company.com',
      emailError: 'Enter a valid email address in the format jane@company.com.',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      messageError: 'Please describe how we can help (at least 10 characters).',
      honeypotLabel: 'Do not fill this field if you are human',
      submitButton: 'Send Message',
      submittingButton: 'Sending…',
      successMessage:
        'Thank you! Your message has been sent. We will get back to you shortly.',
      errorMessagePrefix:
        'We could not send your message automatically right now. Please email us directly at',
      unconfiguredPrefix:
        'Direct form gateway is being finalized—your email client has been opened, or reach us anytime at',
      orBookText: 'or book a 30-minute call directly',
    },
    collections: {
      projectsHeading: 'Projects & Use-Cases',
      projectsSubheading:
        'Selected local AI, RAG, and workflow automation implementations.',
      projectsEmpty:
        'New case studies are currently being prepared. Get in touch to discuss reference architectures relevant to your industry.',
      blogHeading: 'Blog & Insights',
      blogSubheading:
        'Practical insights on sovereign AI, local LLMs, and reliable business automation.',
      blogEmpty:
        'First articles are coming soon. In the meantime, explore our core capabilities or book a consultation.',
      backToHome: 'Back to Home',
      backToProjects: 'All Projects & Use-Cases',
      backToBlog: 'All Articles',
      readMore: 'Read case study',
      readArticle: 'Read article',
      publishedOn: 'Published on',
      updatedOn: 'Updated on',
      clientLabel: 'Client',
      industryLabel: 'Industry',
      outcomesLabel: 'Key Outcomes',
      articleCtaHeading: 'Want similar results for your organization?',
      articleCtaBody:
        'Book a free 30-minute consultation to explore how local AI and automation fit your infrastructure.',
    },
    footer: {
      tagline: 'Local AI & Automation Solutions',
      imprint: 'Imprint',
      privacy: 'Privacy Policy',
      rights: 'All rights reserved.',
    },
  },
  de: {
    meta: {
      homeTitle: 'Futureware | Lokale KI & Automatisierungslösungen',
      homeDescription:
        'Futureware bietet sichere, massgeschneiderte KI-Lösungen, intelligente RAG-Systeme und Automatisierungen zur Optimierung Ihrer Prozesse – strikt lokal und privat.',
      imprintTitle: 'Impressum | Futureware',
      imprintDescription: 'Impressum und rechtliche Angaben der FutureWare GmbH in Sargans, Schweiz.',
      privacyTitle: 'Datenschutzerklärung | Futureware',
      privacyDescription:
        'Datenschutzerklärung der FutureWare GmbH gemäss Schweizer Datenschutzgesetz (nDSG) und EU-DSGVO.',
      projectsTitle: 'Projekte & Use-Cases | Futureware',
      projectsDescription:
        'Praxisnahe lokale KI-Lösungen, RAG-Systeme und Prozessautomatisierungen von Futureware.',
      blogTitle: 'Blog & Einblicke | Futureware',
      blogDescription:
        'Praxisnahe Beiträge zu souveräner lokaler KI, Retrieval-Augmented Generation und Prozessautomatisierung.',
    },
    a11y: {
      skipToContent: 'Zum Hauptinhalt springen',
      primaryNav: 'Hauptnavigation',
      footerNav: 'Rechtliches',
      languageSwitcher: 'Sprachauswahl',
      menuButton: 'Menü',
      switchToEnglish: 'English',
      switchToGerman: 'Deutsch',
      pauseAnimation: 'Hintergrundanimation pausieren',
      playAnimation: 'Hintergrundanimation abspielen',
      errorIconLabel: 'Fehler',
      externalNewTab: '(öffnet in neuem Tab)',
    },
    nav: {
      services: 'Dienstleistungen',
      benefits: 'Warum Wir',
      reviews: 'Referenzen',
      projects: 'Projekte',
      blog: 'Blog',
      contact: 'Kontakt',
      bookCall: 'Beratung Buchen',
    },
    hero: {
      titleLead: 'Stärken Sie Ihr Unternehmen mit',
      titleAccent: 'Local AI & Automation',
      subtitle:
        'Futureware bietet sichere, massgeschneiderte KI-Lösungen, intelligente RAG-Systeme und Automatisierungen zur Optimierung Ihrer Prozesse – wobei Ihre Daten strikt lokal und privat bleiben.',
      primaryCta: 'Lösungen Entdecken',
      secondaryCta: 'Beratung Buchen',
    },
    services: {
      heading: 'Unsere Kernkompetenzen',
      subheading:
        'Wir entwickeln praktische, moderne Tools, die echte Geschäftsprobleme lösen, ohne die Sicherheit zu gefährden.',
      items: [
        {
          id: 'local-ai',
          accent: 'brand',
          title: 'Lokale KI-Lösungen',
          description:
            'Wir implementieren leistungsstarke Sprachmodelle (LLMs) und KI-Tools direkt auf Ihrer Hardware oder lokalen Infrastruktur. Garantieren Sie absolute Datensouveränität und Compliance, indem Sie auf externe Cloud-Anbieter verzichten.',
        },
        {
          id: 'rag-systems',
          accent: 'purple',
          title: 'RAG-Systeme (Ihre Daten durchsuchen)',
          description:
            'Mit Retrieval-Augmented Generation (RAG) können Sie KI sicher mit den Dokumenten, PDFs und Datenbanken Ihres Unternehmens verbinden. Finden Sie sofort Antworten, fassen Sie Berichte zusammen und extrahieren Sie wichtiges Wissen.',
        },
        {
          id: 'task-automation',
          accent: 'green',
          title: 'Prozessautomatisierung',
          description:
            'Wir entwickeln intelligente Workflows, die Ihre wiederkehrenden Aufgaben automatisieren – von der E-Mail-Sortierung und Rechnungsverarbeitung bis zur Dateneingabe. Befreien Sie Ihr Team für strategische Aufgaben.',
        },
        {
          id: 'custom-agents',
          accent: 'orange',
          title: 'Individuelle KI-Agenten',
          description:
            'Wir entwerfen massgeschneiderte Chatbots und virtuelle Assistenten, die auf Ihre spezifische Geschäftslogik zugeschnitten sind. Ob für Kundensupport, interne IT-Anfragen oder branchenspezifische Analysen.',
        },
      ],
    },
    benefits: {
      headingPrefix: 'Warum mit',
      headingBrand: 'Futureware',
      headingSuffix: ' arbeiten?',
      visualCaption: 'Souveräne lokale KI-Architektur – Ihre Unternehmensdaten bleiben in Ihrer Umgebung',
      items: [
        {
          title: 'Datenschutz an erster Stelle',
          description:
            'Als Schweizer Unternehmen verstehen wir die Bedeutung von Datensicherheit. Lokale Implementierungen stellen sicher, dass Ihre Daten Ihre Umgebung nie verlassen.',
        },
        {
          title: 'Auf Ihre Bedürfnisse zugeschnitten',
          description:
            'Wir verkaufen keine Standardsoftware. Wir analysieren Ihre individuellen Engpässe und entwickeln effektive Automatisierungen, die genau in Ihren Workflow passen.',
        },
        {
          title: 'Einfache Sprache, klare Ergebnisse',
          description:
            'Wir verzichten auf komplexen Fachjargon. Unser Fokus liegt auf klarer Kommunikation, schneller Umsetzung und messbaren Verbesserungen für Ihre Geschäftsprozesse.',
        },
      ],
    },
    testimonial: {
      heading: 'Was unsere Kunden sagen',
      subheading: 'Verlässliche Umsetzung und Schweizer Präzision.',
    },
    contact: {
      heading: 'Bereit, Ihre Workflows zu optimieren?',
      subheading:
        'Lassen Sie uns besprechen, wie lokale KI und Automatisierung Ihre spezifischen Herausforderungen lösen können.',
      preferCallText: 'Lieber direkt sprechen? Buchen Sie ein kostenloses 30-minütiges Erstgespräch:',
      bookCallButton: '30-Min. Erstgespräch Buchen',
      nameLabel: 'Name',
      namePlaceholder: 'Jane Doe',
      nameError: 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).',
      emailLabel: 'E-Mail',
      emailHint: 'Format: jane@firma.ch',
      emailPlaceholder: 'jane@firma.ch',
      emailError: 'Geben Sie eine gültige E-Mail-Adresse im Format jane@firma.ch ein.',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Wie können wir Ihnen helfen?',
      messageError: 'Bitte beschreiben Sie kurz Ihr Anliegen (mindestens 10 Zeichen).',
      honeypotLabel: 'Bitte lassen Sie dieses Feld leer',
      submitButton: 'Nachricht Senden',
      submittingButton: 'Wird gesendet…',
      successMessage:
        'Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns in Kürze bei Ihnen.',
      errorMessagePrefix:
        'Ihre Nachricht konnte momentan nicht automatisch übermittelt werden. Schreiben Sie uns bitte direkt an',
      unconfiguredPrefix:
        'Das Formular-Gateway wird gerade eingerichtet – Ihr E-Mail-Programm wurde geöffnet, oder schreiben Sie uns direkt an',
      orBookText: 'oder buchen Sie direkt ein 30-minütiges Gespräch',
    },
    collections: {
      projectsHeading: 'Projekte & Use-Cases',
      projectsSubheading:
        'Ausgewählte Implementierungen für lokale KI, RAG-Systeme und Prozessautomatisierung.',
      projectsEmpty:
        'Neue Fallstudien werden derzeit aufbereitet. Kontaktieren Sie uns gerne für Referenzarchitekturen aus Ihrer Branche.',
      blogHeading: 'Blog & Einblicke',
      blogSubheading:
        'Praxisnahe Einblicke in souveräne KI, lokale Sprachmodelle und verlässliche Automatisierung.',
      blogEmpty:
        'Die ersten Fachbeiträge erscheinen in Kürze. Entdecken Sie in der Zwischenzeit unsere Kernkompetenzen oder buchen Sie ein Gespräch.',
      backToHome: 'Zurück zur Startseite',
      backToProjects: 'Alle Projekte & Use-Cases',
      backToBlog: 'Alle Beiträge',
      readMore: 'Fallstudie lesen',
      readArticle: 'Beitrag lesen',
      publishedOn: 'Veröffentlicht am',
      updatedOn: 'Aktualisiert am',
      clientLabel: 'Kunde',
      industryLabel: 'Branche',
      outcomesLabel: 'Ergebnisse',
      articleCtaHeading: 'Möchten Sie ähnliche Ergebnisse in Ihrem Unternehmen erzielen?',
      articleCtaBody:
        'Buchen Sie ein kostenloses 30-minütiges Beratungsgespräch, um lokale KI und Automatisierung für Ihre Infrastruktur zu prüfen.',
    },
    footer: {
      tagline: 'Lokale KI & Automatisierungslösungen',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      rights: 'Alle Rechte vorbehalten.',
    },
  },
} as const;

export function getTranslations(lang: Locale) {
  return UI_STRINGS[lang];
}
