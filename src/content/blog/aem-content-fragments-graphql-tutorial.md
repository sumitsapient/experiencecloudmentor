---
title: "AEM Content Fragments and GraphQL Tutorial"
slug: "aem-content-fragments-graphql-tutorial"
description: "Model structured AEM Content Fragments, create and test persisted GraphQL queries, handle references, publish dependencies, and consume responses safely."
author: "Sumit Yadav"
publishDate: 2026-08-11
tags: ["AEM", "Content Fragments", "GraphQL"]
featured: false
faqs:
  - question: "What is the difference between an AEM Content Fragment and an Experience Fragment?"
    answer: "A Content Fragment stores channel-neutral structured content based on a model. An Experience Fragment stores a presentation-oriented experience with components and layout for reuse across channels or pages."
  - question: "Why should production applications use persisted GraphQL queries?"
    answer: "Persisted queries provide a controlled, cacheable endpoint and prevent clients from sending arbitrary query documents on every request. They also make publication and operational governance clearer."
  - question: "Do referenced Content Fragments publish automatically?"
    answer: "Do not assume every dependency is live. Validate the publication workflow for the fragment, its model, referenced fragments, and assets, especially when a query works on author but returns incomplete data on publish."
---

AEM Content Fragments store structured, presentation-neutral content. GraphQL lets an application request the fields and references it needs. A maintainable implementation begins with a durable content model, not with a query tailored to one screen.

This tutorial models an article, queries it through an approved endpoint, persists the query for production, and covers the publication issues that commonly surprise teams.

## 1. Design the Content Fragment Model

Create an `Article` model in the appropriate configuration scope. A useful starting contract includes:

- `title`: single-line text and required;
- `slug`: single-line text with uniqueness enforced by process or validation;
- `summary`: multi-line text;
- `body`: rich text or fragment reference, depending on channel needs;
- `heroImage`: content reference restricted to suitable assets;
- `author`: fragment reference to an Author model;
- `publishDate`: date and time;
- `topics`: enumeration or tags according to governance.

Use field names as API contracts. Renaming a label is harmless; renaming the underlying property can break every consumer. Avoid a universal model containing fields for all markets and channels. Prefer references and focused models that can evolve independently.

For global content, decide whether variations represent languages, markets, campaigns, or some combination. Keep the rule consistent. A variation called `uk` is ambiguous if it sometimes means English language and sometimes means UK legal content.

## 2. Create representative fragments

Enable the model and create fragments under a governed DAM path. Populate complete and intentionally incomplete examples. Add an author reference and image so the query exercises nested fields rather than only scalars.

Permissions should let editors manage the intended content area without granting broad repository access. Folder organization affects governance and publication, but clients should rely on stable identifiers or modeled fields rather than parsing business meaning from a path.

## 3. Explore a GraphQL query

Use AEM's GraphQL explorer in a development environment to inspect generated model types and field names. A list query might request:

```graphql
query ArticlesBySlug($slug: String!) {
  articleList(filter: { slug: { _expressions: [{ value: $slug }] } }) {
    items {
      title
      slug
      summary
      publishDate
      heroImage { _path }
      author { ... on AuthorModel { name biography } }
    }
  }
}
```

Generated names depend on the model, so use schema completion rather than assuming this exact query will match another project. Request only fields the view needs and cap broad lists through pagination. Deep reference graphs increase response cost and make cache invalidation harder.

## 4. Create a persisted query

Once the query is stable, save it as a persisted query in the approved configuration. Production clients call the persisted endpoint with variables instead of posting arbitrary GraphQL documents. The resulting GET request is easier to cache through Dispatcher and the CDN.

Treat the persisted query as application code: give it a stable name, review changes, test response compatibility, and publish it through the supported process. Removing or changing fields can break deployed clients, so introduce additive changes before retiring old contracts.

Do not expose an unrestricted GraphQL endpoint merely for developer convenience. Configure Dispatcher filters for only the supported persisted-query paths and parameters. The [Dispatcher guide](/blog/aem-dispatcher-configuration-caching-invalidation/) explains the request and cache rules involved.

## 5. Consume and validate the response

The client should handle an empty item list, null optional fields, unpublished references, network failures, and unknown enum values. Generate types from the schema where the frontend toolchain supports it, but retain runtime checks at system boundaries.

Build asset URLs using the supported delivery mechanism for the environment. Do not concatenate repository hosts into frontend code. Keep credentials server-side when the content is protected; public persisted queries should return only content intended for public delivery.

## 6. Publish every dependency

Before testing on publish, release the model and configuration as required, then publish the fragments, referenced fragments, assets, and persisted query. Verify using the publish endpoint rather than assuming that an author response proves delivery works.

When content is missing, compare author and publish responses, check reference publication, confirm permissions, and inspect cache state. A stale empty response can remain cached after the underlying fragment is fixed unless publication invalidates the relevant endpoint.

## Model for consumers, not pages

Content Fragments are most valuable when websites, apps, email, and other channels can share the underlying meaning. Keep presentation classes and page-grid assumptions out of the model. When authors need true in-context control of a rendered headless experience, pair structured content with the [Universal Editor](/blog/aem-universal-editor-tutorial/).

The [AEM Developer and Architect course](/courses/aem-developer/) covers modeling, APIs, and delivery architecture. For headless design support, [contact us](/contact/).