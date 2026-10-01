---
title: "AEM as a Cloud Service Architecture Explained"
slug: "aem-as-a-cloud-service-architecture"
description: "Understand AEM as a Cloud Service architecture, including author, publish, preview, Dispatcher, CDN, autoscaling, deployments, and cloud-native constraints."
author: "Sumit Yadav"
publishDate: 2026-08-08
tags: ["AEM", "AEM as a Cloud Service", "Architecture"]
featured: false
faqs:
  - question: "Is AEM as a Cloud Service a SaaS product?"
    answer: "Adobe operates and continuously updates the service, but customers still develop and deploy project code, configuration, and content models. It is best understood as a cloud-native managed service rather than a CMS with no implementation work."
  - question: "Can applications write directly to the AEM publish tier?"
    answer: "Publish instances should be treated as replaceable, read-oriented infrastructure. Persistent content changes should originate through supported authoring and distribution mechanisms rather than relying on local publish storage."
  - question: "Do AEM Cloud Service projects still need Dispatcher?"
    answer: "Yes. Dispatcher remains important for caching and request filtering, while Adobe's CDN adds another delivery layer in front of it. Projects need deliberate rules for both caching behavior and security."
---

AEM as a Cloud Service is Adobe's cloud-native way to run AEM Sites and Assets. Its architecture keeps the familiar author, publish, Sling, OSGi, and Dispatcher concepts, but changes how environments scale, deploy, update, and recover. The most important design principle is simple: application instances are replaceable, content persistence is managed separately, and production changes move through automated pipelines.

## The request path at a glance

A typical public page request follows this route:

1. The visitor reaches Adobe's content delivery network (CDN).
2. The CDN returns a cached response when one is available.
3. A cache miss passes through Dispatcher, which applies request filters and checks its cache.
4. If Dispatcher also misses, an AEM publish instance renders or returns the content.
5. Cacheable responses travel back through Dispatcher and the CDN to the visitor.

This layered model matters because most public requests should never require dynamic rendering. Good cache headers, predictable URLs, and correct invalidation reduce load while improving performance for users far from the origin. For a global site serving the US, Germany, India, or Australia, edge delivery can shorten the network path, but it cannot compensate for pages that are unnecessarily uncacheable.

## Author, preview, and publish tiers

The **author tier** is where editors create pages, manage assets, run workflows, and prepare content. Author instances are not public delivery servers. Integrations that modify content should use supported APIs and service credentials rather than assumptions about a fixed machine.

The **preview tier** lets teams validate content in an environment that behaves more like publish without exposing changes to the public site. It is useful for release checks, stakeholder approval, and integrations that need a publish-style view before launch.

The **publish tier** serves approved content. Multiple publish instances can run behind the delivery layer, and the platform can add capacity in response to demand. Code must therefore avoid local state, sticky-instance assumptions, and scheduled work that unintentionally runs on every instance.

## Persistence and distribution

In older AEM installations, teams often thought in terms of a long-lived server and its local repository. Cloud Service separates the runtime from the underlying persistence more strongly. Instances can be replaced during scaling, maintenance, or deployment, while the service preserves content through its managed persistence architecture.

Content moves from author to publish through the cloud distribution service rather than the classic replication-agent topology used in many AEM 6.5 installations. That changes troubleshooting: teams should inspect publication status, distribution queues, permissions, and logs instead of looking only for a traditional replication agent.

Binary assets are also handled using cloud storage patterns designed to avoid routing every upload and download through application memory. This is one reason custom code should use supported AEM APIs instead of depending on repository or filesystem internals.

## Dispatcher and CDN responsibilities

Dispatcher still has two jobs: cache eligible responses and reject requests that the public tier should not accept. The CDN adds edge caching, TLS handling, and traffic protection in front of it. These are complementary layers, not alternatives.

Treat cache behavior as part of application design. Define which URLs are public, which query parameters affect a response, which headers are safe to cache, and how page publication invalidates stale content. A broad rule that disables caching for convenience usually becomes a production performance problem. A broad allow rule can become a security problem. Our [AEM Dispatcher configuration guide](/blog/aem-dispatcher-configuration-caching-invalidation) covers these decisions in detail.

## Deployments and continuous updates

Project code and configuration move through Cloud Manager pipelines. A production pipeline builds the project, runs quality checks, and deploys using a rolling strategy intended to avoid downtime. Because old and new instances may briefly coexist, releases should be backward-compatible across that transition. Avoid migrations that require every instance and every content item to change at exactly the same moment.

Adobe also applies platform updates continuously. Teams cannot indefinitely pin the service to an old AEM release, so automated tests and regular pipeline execution are operational necessities. Cloud Manager environment variables and secrets should hold environment-specific values; they do not belong in source-controlled OSGi configuration.

## What changes for developers and architects

Cloud-native AEM rewards stateless code and explicit contracts. In practice:

- Store durable business state in an appropriate external system or supported repository location, not a local filesystem.
- Expect multiple instances and avoid in-memory coordination between requests.
- Use asynchronous, retryable integration patterns for external services.
- Keep Dispatcher configuration in the project and test it before production.
- Use logs and supported observability tools because direct server access is intentionally limited.
- Design content and code changes so they can be deployed independently where possible.

The architecture also changes capacity planning. Teams still need performance testing, but they plan around cache efficiency, scaling behavior, external dependency limits, and content operations rather than purchasing a fixed number of permanent servers.

## When this architecture is the right fit

AEM as a Cloud Service is the normal choice for organizations that need AEM's structured authoring, DAM integration, governance, and extensibility without operating the underlying platform. It is especially relevant to multi-team and multi-region programs that need consistent deployment controls.

It is not the only Adobe delivery model. A performance-led website with document-based authoring may be better suited to Edge Delivery Services. Read [AEM vs Edge Delivery Services](/blog/aem-vs-edge-delivery-services) before treating that as a purely technical choice.

To build the underlying skills, see the [AEM Developer and Architect course](/courses/aem-developer/). For help evaluating an architecture or migration, [contact us](/contact/).