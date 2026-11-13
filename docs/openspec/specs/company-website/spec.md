---
status: approved
date: 2026-11-13
implements: [ADR-0001, ADR-0002, ADR-0003]
---

# SPEC-0001: FutureWare Bilingual Company Website

## Graph Edges

- **Implements:** [ADR-0001](../../../adrs/ADR-0001-astro-tailwind-static-site.md) — Static site architecture with Astro 5 and Tailwind CSS on GitHub Pages
- **Implements:** [ADR-0002](../../../adrs/ADR-0002-bilingual-i18n-routing.md) — Bilingual EN/DE subpath routing and translation strategy
- **Implements:** [ADR-0003](../../../adrs/ADR-0003-serverless-contact-and-booking.md) — Serverless contact form delivery and external Google Calendar booking

## Overview

Defines the public bilingual (`en` and `de`) corporate website for FutureWare GmbH (`futureware.ch`), transitioning the company's web presence to **Local AI & Automation Solutions** while preserving the visual design, typography, and interactive neural-network `<canvas>` animation from `futureware_website.html` and integrating key assets from the live `futureware.ch` site (Google Calendar consultation booking link, Mario Bianchi's customer review, and FutureWare GmbH corporate/legal details). See ADR-0001, ADR-0002, and ADR-0003.

## Requirements

### Requirement: Visual Theme and Interactive Neural-Network Background

The website MUST reproduce the dark brand aesthetic and interactive background animation established in `futureware_website.html` using build-time compiled Tailwind CSS (without runtime CDN scripts):

- The base theme MUST use `#030712` (`dark` / `gray-950`) background surfaces, `Inter` sans-serif typography, sky-to-indigo brand gradients (`#38bdf8` → `#818cf8` for text; `#0ea5e9` → `#6366f1` for primary CTAs), and `.glow-card` hover elevation/glow transitions.
- A full-viewport fixed `<canvas>` (`pointer-events: none`) MUST render floating cyan particles (`rgba(56, 189, 248, 0.4)`) that bounce at viewport boundaries, draw connecting edges within `120px`, and connect interactively to the pointer cursor within `150px`.
- The `<canvas>` animation MUST respect `prefers-reduced-motion: reduce` by rendering a static Subtle particle frame without continuous `requestAnimationFrame` motion, and MUST pause animation frames whenever `document.hidden` is `true`.

#### Scenario: Visitor interacts with background on desktop

- **WHEN** a visitor loads any page with standard motion preferences and moves the mouse cursor across the viewport
- **THEN** the background `<canvas>` renders smoothly drifting particles connected within `120px` and dynamically draws connecting lines to particles within `150px` of the cursor without intercepting pointer clicks on foreground elements

#### Scenario: Reduced motion preference or hidden browser tab

- **WHEN** a visitor has `prefers-reduced-motion: reduce` enabled in their OS/browser OR switches away from the browser tab (`document.hidden === true`)
- **THEN** continuous `requestAnimationFrame` particle movement MUST NOT run, conserving CPU/GPU resources while preserving visual background styling

### Requirement: Bilingual Navigation and Localized SEO Routing

The website MUST serve statically generated English (`en`) and German (`de`) routes per ADR-0002:

- English pages MUST be served at unprefixed root paths (`/`, `/imprint`, `/privacy`) and German pages MUST be served under `/de/` (`/de/`, `/de/imprint`, `/de/privacy`).
- Every page MUST render a sticky frosted-glass navigation bar containing the `futureware.ch` wordmark, section/page navigation links (both desktop and an accessible collapsible mobile menu), a consultation booking action or contact link, and an `EN` / `DE` language switcher.
- Activating `EN` or `DE` in the language switcher MUST navigate to the corresponding route in the selected locale while preserving visual active-locale styling.
- Every HTML document MUST set `<html lang="en">` or `<html lang="de">`, a localized `<title>` and `<meta name="description">`, Open Graph metadata, a self-referencing `<link rel="canonical">`, and reciprocal `<link rel="alternate" hreflang="en|de|x-default">` tags.

#### Scenario: Visitor switches language from English to German

- **WHEN** a visitor on `/` (or `/privacy`) activates the `DE` switch in the header
- **THEN** the browser navigates to `/de/` (or `/de/privacy`), `<html lang="de">` is set, and all UI navigation, headings, and body copy render in German

#### Scenario: Search crawler indexes localized metadata

- **WHEN** a search engine crawler fetches `/` and `/de/`
- **THEN** each document contains only its target locale's UI text (excluding explicitly locale-invariant quotes), localized `<title>` and `<meta name="description">`, and reciprocal `hreflang="en"`, `hreflang="de"`, and `hreflang="x-default"` links

### Requirement: Hero, Core Capabilities, and Value Proposition Sections

The landing page (`/` and `/de/`) MUST present FutureWare's Local AI & Automation offering using the bilingual copy and layout structure from `futureware_website.html`, enriched with the live appointment booking link:

- **Hero Section**: MUST display the localized headline (*"Empower Your Business with Local AI & Automation"* / *"Stärken Sie Ihr Unternehmen mit Local AI & Automation"*), localized value proposition paragraph, primary CTA (*"Explore Solutions"* / *"Lösungen Entdecken"*) linking to `#services`, and secondary CTA (*"Book a Consultation"* / *"Beratung Buchen"*) linking directly to `https://calendar.app.google/5Ciymv2rX73e5fwy8` (`target="_blank" rel="noopener noreferrer"`).
- **Core Capabilities (`#services`)**: MUST display all four capability cards in a responsive grid with distinct icon badges and localized EN/DE descriptions:
  1. *Local AI Solutions* / *Lokale KI-Lösungen*
  2. *RAG Systems (Chat with your Data)* / *RAG-Systeme (Ihre Daten durchsuchen)*
  3. *Routine Task Automation* / *Prozessautomatisierung*
  4. *Custom AI Agents* / *Individuelle KI-Agenten*
- **Value Proposition (`#benefits`)**: MUST display the *"Why Partner with Futureware?"* / *"Warum mit Futureware arbeiten?"* section with all three localized pillars (*Data Privacy First*, *Tailored to Your Needs*, *Simple Language, Clear Results*) alongside a localized **Local AI Architecture** visual card showing internal data sources, on-premise LLM & RAG processing, automated outcomes, and a zero-external-cloud data-sovereignty guarantee.

#### Scenario: Prospective client books a consultation from the Hero

- **WHEN** a visitor clicks *"Book a Consultation"* on `/` or *"Beratung Buchen"* on `/de/`
- **THEN** `https://calendar.app.google/5Ciymv2rX73e5fwy8` opens in a new browser tab with `rel="noopener noreferrer"`

### Requirement: Customer Review Section

The landing page MUST feature a dedicated social-proof section displaying the existing client testimonial from `futureware.ch`:

- The section heading MUST be localized (e.g., *"What Our Clients Say"* on `/` and *"Was unsere Kunden sagen"* on `/de/`).
- The testimonial quote MUST be rendered **untranslated in its original German** on BOTH English and German routes:
  > *"Katarina ist ein Profi von A-Z. Sie arbeitet exakt, rasch und zuverlässig. Ich freue mich auf weitere Projekte mit FutureWare!"*
- On English routes (`<html lang="en">`), the German `<blockquote>` element MUST carry `lang="de"` so assistive technologies pronounce the German quote accurately.
- Attribution MUST display **Mario Bianchi** and an external link to `https://rockylith.ch/` (`target="_blank" rel="noopener noreferrer"`).

#### Scenario: Visitor views customer review on English landing page

- **WHEN** a visitor views the customer review section on `/`
- **THEN** the section heading renders in English (*"What Our Clients Say"*), Mario Bianchi's quote renders verbatim in original German inside a `<blockquote lang="de">`, and `rockylith.ch` links to `https://rockylith.ch/`

#### Scenario: Visitor views customer review on German landing page

- **WHEN** a visitor views the customer review section on `/de/`
- **THEN** the section heading renders in German (*"Was unsere Kunden sagen"*) alongside the identical German quote and attribution link to `https://rockylith.ch/`

### Requirement: Serverless Contact Form and Consultation Alternatives

The Contact section (`#contact`) MUST provide a functional, accessible contact form backed by a serverless form endpoint per ADR-0003, alongside direct email and booking options:

- The form MUST collect required `name` (text), `email` (email), and `message` (textarea) inputs with localized labels and placeholders, plus a hidden honeypot field (e.g., `botcheck`) to reject automated spam bots.
- Form endpoint URL and public access key / form ID (supporting Web3Forms by default and Formspree via central site configuration) MUST be read from centralized configuration (`src/config/site.ts` / build environment variables).
- Submitting the form MUST send an asynchronous `fetch()` HTTPS `POST` request, disable the submit button while in flight to prevent duplicate submissions, and announce localized success or error feedback inside an `aria-live="polite"` status region.
- If the form endpoint is not yet configured with a live key or if a network/API error occurs, the UI MUST display a clear localized fallback message containing a direct clickable link to `contact@futureware.ch` and the Google Calendar booking URL (`https://calendar.app.google/5Ciymv2rX73e5fwy8`).

#### Scenario: Successful contact inquiry submission

- **WHEN** a visitor enters a valid name, email address, and message and clicks *"Send Message"* / *"Nachricht Senden"*
- **THEN** the client validates the fields, sends an HTTPS `POST` payload to the configured serverless form endpoint (delivering to `contact@futureware.ch`), resets the form upon `200 OK`, and announces a localized confirmation message

#### Scenario: Submission failure or offline state

- **WHEN** the serverless form API returns an error status or network request fails
- **THEN** the user's typed message MUST NOT be cleared, and a localized error alert MUST appear with a direct `mailto:contact@futureware.ch` fallback link

### Requirement: Localized Legal Pages and Footer

The website MUST include a consistent footer and dedicated localized legal pages for corporate transparency and Swiss/EU data protection compliance:

- **Footer**: MUST display the `futureware.ch` brand mark, localized tagline, dynamic copyright year, email (`contact@futureware.ch`), and working links to localized **Imprint / Impressum** and **Privacy Policy / Datenschutz** pages (replacing the placeholder `#` links in `futureware_website.html`).
- **Imprint (`/imprint` and `/de/imprint`)**: MUST state corporate identification per Swiss law (UWG Art. 3 lit. s): **FutureWare GmbH**, **Gulerstrasse 26, 7320 Sargans, Switzerland**, and **`contact@futureware.ch`**.
- **Privacy Policy (`/privacy` and `/de/privacy`)**: MUST provide localized EN and DE privacy notices compliant with the **Swiss Federal Act on Data Protection (FADP / nDSG)** and **EU GDPR**, accurately describing data controller identity (`FutureWare GmbH`, `contact@futureware.ch`), static hosting via GitHub Pages, contact form processing via Web3Forms/Formspree, external appointment scheduling links to Google Calendar (`calendar.app.google`), absence of non-essential tracking cookies, retention periods, and data subject rights (removing obsolete Shopify-agency clauses from the legacy site).

#### Scenario: Visitor navigates to Impressum from German footer

- **WHEN** a visitor on `/de/` clicks *"Impressum"* or *"Datenschutz"* in the footer
- **THEN** the browser navigates to `/de/imprint` or `/de/privacy` respectively, displaying the complete German legal notice for FutureWare GmbH with full site navigation and footer

### Requirement: GitHub Pages Static Build and CI/CD Deployment

The project MUST build deterministically into a static artifact ready for GitHub Pages custom-domain hosting:

- `npm run build` MUST output static HTML/CSS/JS assets to `dist/` with zero server adapter dependencies.
- `public/CNAME` MUST contain `futureware.ch` so GitHub Pages preserves the custom domain across deployments, and `public/favicon.svg` (plus fallback icon metadata) MUST be included.
- `@astrojs/sitemap` MUST generate `sitemap-index.xml` referencing `https://futureware.ch` as the canonical `site` origin.
- A GitHub Actions workflow (`.github/workflows/deploy.yml`) MUST build the Astro project and deploy `dist/` to GitHub Pages on pushes to the default branch (`main` / `master`) and `workflow_dispatch`.

#### Scenario: Automated deployment on branch push

- **WHEN** changes are pushed to the default branch on GitHub with GitHub Pages configured for "GitHub Actions" source
- **THEN** the workflow installs dependencies, runs `npm run build`, uploads `dist/` (including `CNAME` and sitemap), and publishes the updated site to `https://futureware.ch`

## Security Requirements

<!-- Governing: ADR-0018 (Security-by-Default), SPEC-0016 REQ "Mandatory Security Section in Web Specs" -->

### Authentication

All endpoints MUST require authentication by default. Because this capability is a public static corporate website hosted on GitHub Pages with outbound submission to a third-party form gateway, every served route and outbound integration is explicitly designated below:

| Endpoint | Auth | Justification |
|----------|------|---------------|
| `GET /` , `GET /de/` | Public | Public corporate landing pages — must be accessible to unauthenticated prospective clients and search crawlers |
| `GET /imprint` , `GET /de/imprint` | Public | Statutory corporate imprint disclosure (Swiss UWG) — must be publicly accessible without login |
| `GET /privacy` , `GET /de/privacy` | Public | Statutory FADP/GDPR privacy notice — must be publicly accessible without login |
| `GET /sitemap-index.xml` , `GET /robots.txt` | Public | Search engine discovery metadata — required for unauthenticated web crawlers |
| `POST https://api.web3forms.com/submit` (or configured Formspree URL) | Public (Scoped Access Key) | Public visitor contact submission endpoint — authenticated to recipient inbox via domain-restricted public form access key + anti-bot honeypot |

### Rate Limiting

GitHub Pages CDN enforces platform-level DDoS and HTTP request rate limiting on static asset delivery. Contact form submissions MUST include a hidden honeypot field (`botcheck`) checked both client-side and by Web3Forms/Formspree, relying on the form provider's per-IP and per-key rate limiting to block automated abuse. The submit button MUST be disabled while a request is in flight to prevent rapid client double-submits.

### Security Headers

GitHub Pages serves `Strict-Transport-Security` (when "Enforce HTTPS" is enabled) and `X-Content-Type-Options` at the CDN layer, and does not support custom server-side response header configuration files. To harden browser execution within GitHub Pages constraints:

- Every HTML `<head>` MUST include `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- Every HTML `<head>` SHOULD include a `<meta http-equiv="Content-Security-Policy" ...>` restricting `default-src 'self'`, `connect-src 'self' https://api.web3forms.com https://formspree.io`, `img-src 'self' data:`, `style-src 'self' 'unsafe-inline'`, `font-src 'self'`, `script-src 'self' 'unsafe-inline'`, `base-uri 'self'`, and `form-action 'self' https://api.web3forms.com https://formspree.io`. *(Note: `X-Frame-Options` / `frame-ancestors` cannot be set via `<meta>` per W3C CSP spec and is documented as a known GitHub Pages static-hosting platform constraint.)*
- Fonts (`Inter`) SHOULD be self-hosted (e.g., via `@fontsource/inter` or bundled WOFF2) rather than fetched from `fonts.googleapis.com` at runtime, improving both CSP tightness and Swiss FADP/GDPR privacy (no visitor IP leak to Google Fonts).

### Request Body Size Limits

Client-side contact form fields MUST enforce explicit `maxlength` bounds (`name <= 120` chars, `email <= 254` chars, `message <= 4000` chars) prior to `fetch()` serialization, ensuring outbound JSON payloads remain well under `< 16 KB` and within Web3Forms/Formspree server-enforced body size limits.

### CSRF Protection

The static site maintains zero authenticated user sessions or cookies, so cookie-bearing Cross-Site Request Forgery against site visitors is inapplicable. Outbound `POST` requests to Web3Forms/Formspree use `Content-Type: application/json` (which triggers CORS preflight and cannot be forged by cross-origin HTML `<form>` auto-posts) combined with provider domain allowlisting for `futureware.ch`.

### Redirect Validation

The website MUST NOT implement any open redirect logic reading unvalidated URL query parameters. Language switcher links MUST resolve strictly against build-time static route tables (`/` ↔ `/de/`), and all external links (`https://calendar.app.google/5Ciymv2rX73e5fwy8`, `https://rockylith.ch/`) MUST be hardcoded constants rendered with `rel="noopener noreferrer"`.

## Accessibility Requirements

This spec involves user-facing UI. The following are MANDATORY for every UI component this spec produces, per WCAG 2.1 AA:

- **WCAG 2.1 AA compliance** — the minimum conformance target
- **ARIA landmarks** — `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` on page-structure elements
- **`aria-label` on icon-only controls** — every button or link with no visible text label
- **`aria-live` regions for dynamic content** — `polite` for routine updates, `assertive` for critical status changes (HTMX swaps, auto-refresh panels, real-time status)
- **Keyboard navigation** — logical tab order, Enter/Space activation, Escape to dismiss, arrow keys within composite widgets
- **Focus management in modals and dialogs** — trap focus while open, move focus to the first focusable element on open, return it to the trigger on close

The full checklist behind each line is the SDD plugin's `references/accessibility-requirements.md`; this section is the normative summary and is not expanded inline.
