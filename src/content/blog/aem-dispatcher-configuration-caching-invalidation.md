---
title: "AEM Dispatcher Configuration, Caching, Invalidation, and Troubleshooting"
slug: "aem-dispatcher-configuration-caching-invalidation"
description: "Configure and troubleshoot AEM Dispatcher filters, cache rules, invalidation, headers, statfiles, query parameters, and common cache misses."
author: "Sumit Yadav"
publishDate: 2026-08-12
tags: ["AEM", "Dispatcher", "Performance"]
featured: false
faqs:
  - question: "Why is an AEM page not being cached by Dispatcher?"
    answer: "Check that the request is allowed, the response is cacheable, the URL matches cache rules, no disqualifying query string or authorization behavior is present, and the web server can write to the cache directory. Dispatcher logs should identify the decision."
  - question: "Does publishing a page delete its Dispatcher cache file?"
    answer: "Invalidation behavior depends on configuration. A flush request may remove files directly or update statfiles so cached files beneath a path are considered stale and re-fetched on the next request."
  - question: "Should Dispatcher cache authenticated content?"
    answer: "Not by default. Caching personalized or permission-dependent responses can expose one user's content to another. Only enable an authenticated caching design after proving the cache key and authorization behavior are safe."
---

AEM Dispatcher is both a caching module and a request filter in front of AEM publish. A sound configuration denies unexpected requests, caches public responses aggressively, and invalidates changed content predictably. Most Dispatcher incidents come from treating only one of those responsibilities seriously.

## Start with the request contract

Inventory the public surface before writing rules: page extensions, asset paths, API endpoints, selectors, suffixes, query parameters, and HTTP methods. Then use deny-by-default filters and add narrow allowances for the traffic the application actually needs.

Do not allow broad URL patterns simply because a component fails. Capture the failing request and decide whether its method, path, selector, extension, and suffix are valid. Administrative paths, repository consoles, internal endpoints, and authoring services should not be publicly reachable through Dispatcher.

## What Dispatcher can cache

Dispatcher normally maps a cacheable URL to a file beneath its document root. A request must pass filters and cache rules, and its response must be suitable for reuse. Common reasons for a miss include:

- a query string that is not configured for caching;
- an authorization header or authenticated session;
- a non-GET request;
- a URL or extension excluded by `/rules`;
- response headers that prevent caching;
- an unwritable cache directory;
- a request that Dispatcher sends directly to a render instance by design.

Use the Dispatcher log at an appropriate debug level in a non-production investigation. It is more reliable than guessing from browser headers alone. Also distinguish a CDN hit, Dispatcher hit, and AEM render; in [AEM as a Cloud Service](/blog/aem-as-a-cloud-service-architecture/), two cache layers may affect the observation.

## Cache rules and headers

Allow cache entries for stable public pages and assets. Exclude dynamic endpoints, user-specific responses, and operational URLs. Cache only the query parameters that have a defined representation. Analytics parameters such as campaign tracking often should not create distinct cache entries, while a parameter that changes language or search results may require a different design.

Use `/headers` to retain response headers needed when serving a cached file, such as content type, cache control, or content disposition. Review the exact supported configuration for the deployed Dispatcher version. An application can render the right headers on the first request but lose them on cached responses if they are not preserved.

At the CDN layer, set explicit cache-control behavior for each response class. Avoid applying one lifetime to HTML, immutable fingerprinted assets, and APIs. Long-lived browser caching is excellent for versioned assets and risky for an HTML URL that must change immediately after publication.

## Invalidation and statfiles

Publication must make stale content ineligible for delivery. Dispatcher can remove cached files or use `.stat` timestamps: when a relevant statfile is newer than a cached file, Dispatcher treats that file as stale and retrieves a fresh response.

The `/statfileslevel` setting controls how granular those markers are in the content tree. A low level may invalidate a large section and create a surge of render requests. A very granular strategy can leave dependent pages stale if publication invalidates only the changed resource.

Dependency is the hard part. Updating a Content Fragment, navigation item, or shared teaser may affect pages at unrelated paths. Plan explicit invalidation or short cache lifetimes for shared content, and test those scenarios rather than only publishing a page to itself.

## A disciplined troubleshooting sequence

For a stale or uncached page, use this order:

1. Request a unique URL and confirm which delivery layer responds.
2. Inspect CDN and browser cache headers.
3. Check Dispatcher logs for filter, cache, and render decisions.
4. Inspect the cache file and relevant `.stat` timestamps where the environment permits it.
5. Confirm the flush or distribution event reached the correct publish farm.
6. Compare the requested URL with `/filter`, `/cache`, query parameter, and header rules.
7. Fetch publish directly only through an approved diagnostic path to separate rendering from caching.

If a 404 is cached, publishing content may not fix it until the negative response expires or is invalidated. If only one region sees old content, the CDN edge may be stale while Dispatcher is current. If every request reaches publish, verify cache eligibility before tuning AEM code.

## Configuration and release practices

Keep web server and Dispatcher configuration in source control. Validate syntax and run the project's Dispatcher tools in CI. Use separate farms only when routing, authentication, or cache behavior truly differs, and keep environment-specific host values out of duplicated rule sets.

Security tests should verify denied methods and paths. Performance tests should include a cold cache, warm cache, and post-invalidation traffic. For global traffic, confirm that cache keys do not accidentally mix locale or market variants and that host-based routing maps each domain to the intended content root.

Learn the full delivery stack in the [AEM Developer and Architect course](/courses/aem-developer/). If a caching problem crosses CDN, Dispatcher, and application code, [contact us](/contact/).