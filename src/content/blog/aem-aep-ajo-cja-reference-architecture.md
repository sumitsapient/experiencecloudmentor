---
title: "Reference Architecture for AEM, AEP, AJO, and CJA"
slug: "aem-aep-ajo-cja-reference-architecture"
description: "Design an Adobe reference architecture connecting AEM, AEP, AJO, and CJA with clear data flows, identity, consent, governance, and global operations."
author: "Gaurav Agarwal"
publishDate: 2026-08-07
tags: ["AEM", "AEP", "AJO", "CJA", "Architecture"]
featured: false
faqs:
  - question: "Do AEM, AEP, AJO, and CJA require one shared data model?"
    answer: "They need governed contracts and consistent business meaning, not one physical model copied everywhere. AEM content, AEP XDM, AJO journey inputs, and CJA reporting views serve different purposes and should be mapped deliberately."
  - question: "Should every AEM interaction be sent to AEP?"
    answer: "No. Collect events that support defined personalization, journey, analytics, or operational use cases. Unnecessary collection increases cost, governance effort, noise, and privacy risk."
  - question: "How should a global implementation handle regional differences?"
    answer: "Keep shared identity, taxonomy, consent semantics, and observability standards while documenting regional data collection, residency, retention, channels, localization, access, and activation constraints."
---

A practical AEM, AEP, AJO, and Customer Journey Analytics architecture gives each product a clear responsibility: AEM manages digital content and experiences, AEP collects and governs customer data, AJO makes journey and channel decisions, and CJA provides analysis across connected datasets. The architecture succeeds when identity, consent, content, events, and measurement remain traceable across those boundaries.

Do not start by connecting every available product. Start with customer and operator use cases, then add only the flows needed to support them.

## Assign system responsibilities

AEM Sites or Edge Delivery Services can deliver web experiences, while AEM Assets and structured content may support reusable media and content. AEM should not become a shadow customer database merely because authors need personalization fields.

AEP receives approved behavioral and enterprise data through batch, streaming, source connectors, or the Edge Network. XDM schemas define those records, Identity Service relates identifiers, and Real-Time Customer Profile assembles eligible profile fragments. RTCDP capabilities can build and activate audiences where included in the solution.

AJO consumes profile context, events, audiences, and content inputs to orchestrate journeys and messages. CJA connects selected AEP datasets for analysis through connections and data views. It should use reporting definitions designed for analysts rather than inheriting every raw implementation detail.

## Define the web and edge flow

For a common web pattern, an AEM page loads governed client-side data collection. Adobe Experience Platform Web SDK sends approved events to a datastream, which routes data to configured services. The event should have a documented identity state, consent state, schema, and purpose.

Personalization may occur at the edge or through other decisioning patterns, but the page must define timeout and fallback behavior. A slow decision should not leave a blank component or shift the layout. Cache strategy must separate public content from customer-specific responses so personalized output is never shared incorrectly.

Use the [Web SDK implementation guide](/blog/implement-adobe-web-sdk-with-tags/) and [datastream tutorial](/blog/configure-aep-datastream-step-by-step/) to make this boundary testable.

## Treat identity and consent as architecture

Inventory anonymous device identifiers, authenticated customer IDs, loyalty IDs, email-derived identifiers, account IDs, and regional source keys. Define namespaces, uniqueness, lifecycle, and permitted usage. Authentication can connect an anonymous device to a person, but shared devices and recycled contact values require safeguards.

Consent is not a single boolean. Model the purposes and channels the organization can reliably collect and enforce. Document how withdrawal moves from the collection point into AEP and downstream activation, how long propagation may take, and what fails closed. Identity linkage never grants permission by itself.

The [Identity Service guide](/blog/aep-identity-service-identity-graph-explained/) covers graph behavior, while the [consent and governance architecture](/blog/aep-consent-data-governance-architecture/) addresses policy design.

## Connect content to journeys

AJO messages and AEM-managed content need explicit contracts. Decide whether a journey references published content, copies content at authoring time, or receives content through an integration. Define versioning, localization, approvals, expiration, fallback, and publication dependencies.

Content authors should know where a fragment is used before changing it. Journey operators should know what happens if an asset is unpublished or a regional variation is absent. Avoid coupling a production journey to an author-only endpoint or an unstable content path.

## Design CJA for decisions

CJA connections select datasets and define data availability. Data views then create business-facing components, attribution settings, session behavior, filters, and derived metrics. Separate implementation names from analyst language and establish owners for shared metrics.

Reconcile expected differences between Profile audiences and CJA reporting. Profile, audience evaluation, and CJA can apply different datasets, windows, identities, and processing rules. A count mismatch is not automatically a defect; it is a prompt to compare definitions.

## Build for global and regional operation

Create a common architecture catalogue covering schemas, identities, consent meanings, event names, content contracts, metrics, alerts, and owners. Then record permitted regional variations. The EU, UK, India, Singapore, Australia, UAE, Canada, US, and other markets may have different legal assessments, data availability, channels, languages, and support models.

Do not create country-specific data flows merely for search visibility or organizational neatness. Create them only when residency, source systems, latency, regulation, or operating ownership requires separation. Validate cross-border transfers and retention with qualified internal teams.

## Operate the complete path

Monitor collection failures, schema errors, ingestion delay, identity anomalies, audience qualification, journey entry, message suppression, content availability, and reporting freshness. Give every alert an owner and recovery procedure. Use correlation identifiers where possible so support teams can trace one test profile without exposing unnecessary personal data.

Release changes through sandboxes and environments with contract tests. A schema rename, consent mapping change, or content model update can affect several products even when each deployment passes independently.

The right reference architecture is a set of owned contracts, not a diagram frozen after launch. The [AEM Developer and Architect course](/courses/aem-developer/) and [RTCDP course](/courses/rtcdp/) cover the principal implementation layers. For an architecture review, [contact us](/contact/).