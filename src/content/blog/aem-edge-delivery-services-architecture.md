---
title: "AEM Edge Delivery Services Architecture Explained"
slug: "aem-edge-delivery-services-architecture"
description: "Learn how Edge Delivery Services works from authoring and content source to code, blocks, preview, publishing, caching, and global delivery."
author: "Sumit Yadav"
publishDate: 2026-08-13
tags: ["AEM", "EDS", "Architecture"]
featured: false
faqs:
  - question: "Does Edge Delivery Services require AEM authoring?"
    answer: "No. Teams can use document-based authoring with supported document sources, or use AEM authoring with the Universal Editor. The right model depends on governance, content structure, and author needs."
  - question: "Are EDS blocks the same as traditional AEM components?"
    answer: "Both create reusable page features, but blocks are implemented with browser-native HTML, CSS, and JavaScript and operate on normalized markup. They do not use the traditional Sling component rendering lifecycle."
  - question: "Can EDS support global websites?"
    answer: "Yes. Its edge delivery model suits distributed audiences, but teams must still design localization, regional content ownership, URL structures, consent, and release governance explicitly."
---

Edge Delivery Services (EDS) is a web delivery architecture focused on fast pages, rapid publishing, and lightweight development. Content comes from an authoring source, project code comes from a Git repository, and the service combines them into optimized pages delivered through an edge network. Unlike traditional AEM Sites, a public request does not invoke Sling to render a component tree on a publish server.

## The architecture in one request

When a visitor requests an EDS page, the service resolves the URL to published content, returns normalized HTML through its caching layer, and loads the site's CSS and JavaScript. Client-side code decorates the document, converts authored structures into blocks, and progressively enhances the page.

This creates a useful separation:

- **Content** defines the page's meaning and authored structure.
- **Code** defines styles, block behavior, and enhancement.
- **Configuration** connects hosts, repositories, content sources, and publishing behavior.
- **The edge delivery layer** serves cacheable output close to visitors.

Authors can update content without rebuilding the application bundle. Developers can update code without copying content into a frontend repository.

## Authoring choices

Document-based authoring lets editors work in familiar documents and spreadsheets. Headings, lists, tables, links, and block-shaped tables become structured web content during delivery. It works well when marketing teams prioritize low-friction editing and the content model can remain relatively simple.

AEM authoring with the Universal Editor is the alternative when teams need AEM governance, structured content, asset management, and in-context editing. The delivery architecture is still EDS, but content is managed through AEM rather than a document repository. The [Universal Editor tutorial](/blog/aem-universal-editor-tutorial/) explains the instrumentation involved.

Choose authoring based on the people and governance model, not only developer preference. A global organization may use centrally governed templates while allowing regional teams in Canada, the UAE, or Singapore to own local pages. That requires clear inheritance, translation, and publishing rules regardless of the editor.

## Blocks and page decoration

Blocks are EDS's main reusable building unit. An author creates a recognizable content structure; JavaScript receives the corresponding DOM element and decorates it into the intended feature. A block normally has its own JavaScript and CSS files, keeping behavior local and loadable only when needed.

Good blocks start with semantic content that remains understandable before enhancement. JavaScript should add interaction rather than manufacture the entire page. This improves resilience, accessibility, and performance. Shared page work belongs in global scripts and styles; feature-specific behavior belongs with the block.

EDS projects commonly distinguish:

- plain content such as headings, paragraphs, images, and links;
- sections that group content and accept metadata-driven styles;
- blocks for recognizable features such as cards or accordions;
- metadata that controls page-level values such as title or template behavior.

## Preview, publish, and code flow

Content typically moves through preview and live states. Preview lets authors and developers inspect a change at a preview URL before publishing it. Publishing promotes the content to the live delivery path and refreshes the relevant cached representation.

Code follows a Git-based workflow. A branch or pull request can be tested against preview content, while production uses the configured main branch. This enables small, reviewable releases and makes rollback a source-control operation. Teams should still test code and content combinations because either side can change independently.

## Caching and performance

EDS is designed around cacheable, edge-served documents and efficient browser execution. Strong results still depend on implementation choices. Oversized images, third-party tags, render-blocking fonts, and JavaScript-heavy blocks can erase architectural advantages.

Measure real pages rather than relying on a platform promise. Set budgets for image weight, JavaScript, fonts, and third-party scripts. Monitor Core Web Vitals by template and market, since a consent tool or regional tag configuration can make the UK version behave differently from the US version.

## Integrations and dynamic features

EDS does not prohibit dynamic experiences. Forms, commerce, personalization, search, and authenticated services can be integrated through APIs and browser-side code. The architectural question is where the dynamic responsibility belongs.

Keep the initial page cacheable where possible. Load user-specific data after the stable shell, protect credentials behind server-side services, and define failure states when an API is slow. Do not expose secrets in client code or turn every page request into an origin call.

## EDS compared with traditional AEM

Traditional AEM offers a Java runtime, Sling rendering, deep component customization, and mature workflows. EDS offers a simpler delivery path and a web-native development model. Neither is universally better. [AEM vs Edge Delivery Services](/blog/aem-vs-edge-delivery-services/) compares them by project requirement.

Use the [Edge Delivery Services course](/courses/eds/) for hands-on implementation and the [AEM Developer and Architect course](/courses/aem-developer/) for the wider platform. For architecture guidance, [contact us](/contact/).