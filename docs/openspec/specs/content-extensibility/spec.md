---
status: approved
date: 2026-11-13
implements: [ADR-0001, ADR-0002]
requires: [SPEC-0001]
---

# SPEC-0002: Extensible Content Collections for Projects and Blog

## Graph Edges

- **Implements:** [ADR-0001](../../../adrs/ADR-0001-astro-tailwind-static-site.md) — Astro Content Collections with compile-time Zod schemas for Markdown/MDX authoring
- **Implements:** [ADR-0002](../../../adrs/ADR-0002-bilingual-i18n-routing.md) — Bilingual EN/DE subpath routing and cross-locale content linking
- **Requires:** [SPEC-0001](../company-website/spec.md) — Base layout, visual theme, navigation chrome, and localized routing helpers

## Overview

Establishes the extensible content architecture enabling FutureWare to publish localized (`en` and `de`) **Projects / Use-Cases** case studies and **Blog** articles without restructuring the codebase, navigation, or deployment pipeline. See ADR-0001, ADR-0002, and SPEC-0001.

## Requirements

### Requirement: Typed Content Schemas for Projects and Blog

The codebase MUST define compile-time validated Astro Content Collections (`src/content.config.ts`) for both `projects` (Use-Cases) and `blog` supporting Markdown (`.md`) and MDX (`.mdx`) entries:

- Both collections MUST validate required frontmatter fields: `title` (`string`), `description` (`string`), `pubDate` (`date`), `lang` (`'en' | 'de'`), `draft` (`boolean`, defaulting to `false`), and optional `updatedDate` (`date`), `translationSlug` (`string` pairing EN and DE counterparts), and `tags` (`string[]`).
- The `projects` collection MUST additionally support structured case-study metadata: optional `client` (`string`), `industry` (`string`), `services` (`string[]`), and `outcomes` (`string[]` highlighting measurable results).
- Invalid frontmatter in any `.md` or `.mdx` file MUST fail `npm run build` with a descriptive schema validation error before deployment.

#### Scenario: Author adds a valid bilingual use-case entry

- **WHEN** an author adds `src/content/projects/en/local-rag-legal.md` and `src/content/projects/de/local-rag-legal.md` with valid frontmatter and `draft: false`
- **THEN** `npm run build` validates both entries against the `projects` Zod schema and includes them in static route generation

#### Scenario: Author commits malformed frontmatter

- **WHEN** a content file omits a required field such as `title` or uses an unsupported `lang` value
- **THEN** `npm run build` MUST abort with a schema validation error identifying the offending file and field

### Requirement: Localized Collection Listing and Detail Routes

The routing layer MUST support statically generated listing and detail routes for both collections across English and German locales:

- Listing routes MUST map to `/projects` & `/de/projects` (Projects / Use-Cases) and `/blog` & `/de/blog` (Blog), displaying published entries (`draft: false`) matching the active locale sorted newest-first (`pubDate` descending).
- Detail routes MUST map to `/projects/[slug]`, `/de/projects/[slug]`, `/blog/[slug]`, and `/de/blog/[slug]`, rendering formatted dark-mode prose styled consistently with `SPEC-0001` plus a bottom CTA inviting readers to book a consultation or contact FutureWare.
- Entries marked `draft: true` MUST NOT be emitted as public static pages or listed in `sitemap-index.xml` during production builds.

#### Scenario: Draft blog post exclusion in production build

- **WHEN** a blog entry has `draft: true` in its frontmatter during `npm run build`
- **THEN** no static HTML detail page is generated for that entry in `dist/`, and it does not appear on `/blog`, `/de/blog`, or in the sitemap

### Requirement: Conditional Navigation and Graceful Empty States

Because Projects/Use-Cases and Blog content will be added incrementally after initial launch, navigation MUST adapt cleanly without broken or empty links:

- The header and mobile navigation bar MUST dynamically check published (`draft: false`) entry counts per collection at build time, displaying the *"Projects"* / *"Projekte"* link only when at least one published project exists and displaying *"Blog"* only when at least one published blog post exists.
- If a visitor navigates directly to `/projects`, `/de/projects`, `/blog`, or `/de/blog` while zero published entries exist, the listing page MUST render a clean localized empty-state message with a link back to the landing page (`/` or `/de/`) rather than a broken layout.

#### Scenario: Initial website launch with zero blog posts

- **WHEN** the repository contains zero `draft: false` entries in the `blog` collection at build time
- **THEN** the top navigation bar omits the *"Blog"* item on both `/` and `/de/`, keeping initial launch navigation focused on core landing sections

#### Scenario: First project use-case is published

- **WHEN** at least one `draft: false` entry is committed to the `projects` collection and built
- **THEN** the navigation bar automatically includes the localized *"Projects"* / *"Projekte"* link without requiring manual edits to `Navbar.astro`

### Requirement: Cross-Locale Entry Linking

Language switching on collection detail pages MUST respect translation availability:

- When a detail entry declares `translationSlug` matching a published entry in the target locale, the header language switcher and `<link rel="alternate" hreflang="...">` tags MUST point directly to that translated detail URL.
- When an entry exists in only one locale (`translationSlug` absent or target draft/missing), the header language switcher MUST fall back gracefully to the target locale's collection index route (e.g., `/de/blog` or `/blog`) rather than producing a `404` link, and MUST omit the missing counterpart's `hreflang` alternate tag.

#### Scenario: Switching language on an untranslated blog post

- **WHEN** a visitor reads an English-only blog post at `/blog/local-llm-benchmarks` (with no German counterpart) and clicks `DE` in the language switcher
- **THEN** the browser navigates cleanly to `/de/blog` instead of a non-existent `404` URL

## Security Requirements

<!-- Governing: ADR-0018 (Security-by-Default), SPEC-0016 REQ "Mandatory Security Section in Web Specs" -->

### Authentication

All endpoints MUST require authentication by default. Public static content routes added by this capability are explicitly designated below:

| Endpoint | Auth | Justification |
|----------|------|---------------|
| `GET /projects` , `GET /de/projects` | Public | Public portfolio / use-case index pages — intended for unauthenticated prospective clients and search engines |
| `GET /projects/[slug]` , `GET /de/projects/[slug]` | Public | Public case-study articles — intended for unauthenticated readers |
| `GET /blog` , `GET /de/blog` | Public | Public company blog index pages — intended for unauthenticated readers and search engines |
| `GET /blog/[slug]` , `GET /de/blog/[slug]` | Public | Public blog articles — intended for unauthenticated readers |

### Rate Limiting

Per [SPEC-0001](../company-website/spec.md) § "Security Requirements > Rate Limiting" — static HTML routes are served via GitHub Pages CDN with platform-level rate limiting; no mutable endpoints are introduced by this capability.

### Security Headers

Per [SPEC-0001](../company-website/spec.md) § "Security Requirements > Security Headers" — all collection pages inherit `BaseLayout.astro`, enforcing identical `<meta name="referrer">` and `<meta http-equiv="Content-Security-Policy">` policies. Markdown/MDX content is authored exclusively by repository maintainers via Git commits; raw untrusted user-generated HTML MUST NOT be rendered.

### Request Body Size Limits

Not applicable to read-only `GET` static content routes (no request bodies accepted). Any embedded consultation CTA links to the existing contact section or Google Calendar per [SPEC-0001](../company-website/spec.md).

### CSRF Protection

Per [SPEC-0001](../company-website/spec.md) § "Security Requirements > CSRF Protection" — no state-changing endpoints or session cookies are introduced by static content collections.

### Redirect Validation

Per [SPEC-0001](../company-website/spec.md) § "Security Requirements > Redirect Validation" — cross-locale switcher URLs are resolved strictly at build time from validated Content Collection slugs (`translationSlug`), preventing runtime open redirects.

## Accessibility Requirements

This spec involves user-facing UI. The following are MANDATORY for every UI component this spec produces, per WCAG 2.1 AA:

- **WCAG 2.1 AA compliance** — the minimum conformance target
- **ARIA landmarks** — `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` on page-structure elements
- **`aria-label` on icon-only controls** — every button or link with no visible text label
- **`aria-live` regions for dynamic content** — `polite` for routine updates, `assertive` for critical status changes (HTMX swaps, auto-refresh panels, real-time status)
- **Keyboard navigation** — logical tab order, Enter/Space activation, Escape to dismiss, arrow keys within composite widgets
- **Focus management in modals and dialogs** — trap focus while open, move focus to the first focusable element on open, return it to the trigger on close

The full checklist behind each line is the SDD plugin's `references/accessibility-requirements.md`; this section is the normative summary and is not expanded inline.
