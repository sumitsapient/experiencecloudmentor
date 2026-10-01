---
title: "AEM Universal Editor Tutorial: Setup and Component Instrumentation"
slug: "aem-universal-editor-tutorial"
description: "A practical AEM Universal Editor tutorial covering service setup, page instrumentation, component definitions, editable properties, preview, and debugging."
author: "Sumit Yadav"
publishDate: 2026-08-18
tags: ["AEM", "Universal Editor", "EDS"]
featured: false
faqs:
  - question: "What can the AEM Universal Editor edit?"
    answer: "It can edit appropriately instrumented experiences whose content is stored in a supported backend. Common uses include AEM-backed Edge Delivery Services projects and headless applications using structured AEM content."
  - question: "Why does a component appear but remain uneditable?"
    answer: "The page may be missing connection metadata, the element may lack the correct resource and property instrumentation, the component definition may not match, or authentication and CORS may block the editor service."
  - question: "Does Universal Editor replace component development?"
    answer: "No. Developers still implement rendering and interaction. Universal Editor adds a consistent editing layer by connecting rendered elements to content resources and defining which components and fields authors may use."
---

The AEM Universal Editor lets authors edit a rendered web experience in context, even when the frontend is not rendered by traditional AEM Sites components. A working setup has three parts: an application that renders the page, an AEM content source, and instrumentation that tells the editor which content resource and property each rendered element represents.

This tutorial focuses on the implementation sequence. Exact service URLs and configuration vary by program, so use the values provided for your AEM environment rather than copying placeholders into production.

## 1. Decide what AEM owns

Start with the content contract. Identify which values authors can change, which components they can insert, and which layout decisions remain in code. For a hero, AEM might own the heading, copy, image, and call-to-action link, while the application owns responsive layout and interaction.

Avoid instrumenting every DOM element. Map author-controlled fields to stable content properties. A clear model produces a clearer editor and makes the frontend less dependent on incidental markup.

## 2. Connect the rendered page

The page must load inside the Universal Editor and declare the connection to its content source. Add the required editor service metadata in the document head and ensure the application can be reached over HTTPS from the editor. The connection identifies the AEM service and the content location used by the page.

For local development, use the supported local proxy or tunnel pattern for your project. Confirm these basics before component work:

- the editor can load the page without frame or content-security-policy errors;
- the browser session can authenticate to AEM;
- requests to the content service pass CORS checks;
- preview URLs resolve assets and internal links correctly.

Browser developer tools usually reveal connection failures faster than changing component definitions at random.

## 3. Instrument the content resource

Universal Editor data attributes connect rendered markup to AEM. At a component boundary, provide the resource identifier and resource type. At an editable field, identify the corresponding content property and its semantic type.

A simplified rendering might look like this:

```html
<section
  data-aue-resource="urn:aemconnection:/content/example/hero"
  data-aue-type="component"
  data-aue-label="Hero"
>
  <h1 data-aue-prop="title" data-aue-type="text">A faster launch</h1>
  <p data-aue-prop="description" data-aue-type="richtext">
    Content managed in AEM and rendered by the application.
  </p>
</section>
```

Treat this as the shape of the solution, not a universal resource path. Resource identifiers and supported property types must match the integration and content model. Render attributes from known configuration; do not let arbitrary author input create resource identifiers.

## 4. Define available components and fields

Instrumentation makes existing content selectable. Component definitions tell the editor what authors may add and which fields appear in the properties panel. Define a component identifier, title, plugins or insertion behavior, and field schema that matches the stored content.

Keep field names aligned across the definition, content model, and rendering code. If the model stores `headline` while the markup points to `title`, selection may work while updates fail or write to the wrong property. Use explicit validation for required links, image references, and enumerated styles.

Organize components into meaningful groups. Authors should see choices such as "Content" and "Navigation," not an unfiltered catalog of implementation variants. Use policies or filters to restrict which components can be inserted into each container.

## 5. Add editable containers

To support component insertion and ordering, instrument the parent as a container and render its child resources in content order. Each child still needs its own resource identity. The application must tolerate an empty container and newly inserted content without requiring a code release.

This is an important boundary: the editor changes the content tree, while the frontend decides how each recognized resource type renders. Provide a safe fallback for an unknown type so a model change does not crash the entire page.

## 6. Preview and publish end to end

Test more than inline text editing. Change rich text, replace an asset, edit a link, insert and reorder a component, remove optional content, and publish the result. Then verify that the delivery cache refreshes and that the live URL receives the intended content.

For an EDS implementation, keep preview and live content states distinct and verify both. The [EDS architecture guide](/blog/aem-edge-delivery-services-architecture/) explains how content and Git-based code move independently.

## Troubleshooting checklist

When editing fails, isolate the layer:

1. If the page does not load, check HTTPS, CSP, frame policy, authentication, and routing.
2. If nothing is selectable, check page connection metadata and resource instrumentation.
3. If selection works but fields do not, compare property attributes with component definitions.
4. If edits save but do not appear, inspect the content response, application caching, and rendering mapping.
5. If preview works but live does not, verify publication and cache invalidation.

Use stable resource paths and test with an author account that has realistic permissions. Administrator access can conceal permission defects that later block editors.

Learn the delivery implementation in the [Edge Delivery Services course](/courses/eds/) and the broader content model in the [AEM Developer and Architect course](/courses/aem-developer/). For implementation support, [contact us](/contact/).