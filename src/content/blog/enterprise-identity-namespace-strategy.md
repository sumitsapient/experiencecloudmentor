---
title: "Designing an Enterprise Identity Namespace Strategy"
slug: "enterprise-identity-namespace-strategy"
description: "Design stable, governed AEP identity namespaces across systems, brands, and regions without creating collisions or unsafe profile stitching."
author: "Gaurav Agarwal"
publishDate: 2026-09-17
tags: ["AEP", "RTCDP", "Identity Service", "Architecture"]
featured: false
faqs:
  - question: "When should AEP use a custom identity namespace?"
    answer: "Use a custom namespace when an identifier has a distinct business meaning not accurately represented by a standard namespace. Document its issuer, format, uniqueness scope, and owner."
  - question: "Can two source systems share one identity namespace?"
    answer: "Only when they use the same identifier contract and values are unique across both systems. Similar-looking IDs are not enough; overlapping generators can merge unrelated people."
  - question: "Should an account ID be an AEP person identity?"
    answer: "Usually not. An account can represent several people, so treating it as a person identity can collapse profiles. Model account relationships at their proper entity grain."
---

An enterprise identity namespace strategy is a contract for what an identifier means, who issues it, where it is unique, how it changes, and what it may connect. Create that contract before mapping identities into AEP. Namespace names alone do not prevent graph collapse.

The goal is not to maximize stitching. It is to make justified links while keeping people, devices, households, accounts, and transactions distinct.

## Inventory identifiers by meaning

For every source, record the field, business entity, issuer, format, uniqueness scope, persistence, authentication strength, reuse risk, normalization, and regions where it is available. Include CRM IDs, loyalty IDs, hashed emails, phone numbers, ECIDs, mobile IDs, account IDs, and partner IDs.

Classify each as person, contact point, device, household, account, or transaction. Remove placeholders and operational keys that have no stable customer meaning. The same label, such as `customerId`, may represent unrelated values in two systems.

## Decide namespace boundaries

Use a standard namespace when its semantics and format match. Create a custom namespace for a genuinely distinct identifier. Two systems may share a namespace only if they participate in the same issuing contract and guarantee uniqueness across their combined scope.

If identifiers are unique only within a brand, tenant, or region, qualify them. Options include separate namespaces or an authoritative enterprise translation, depending on the target operating model. Do not concatenate arbitrary context into IDs without documenting normalization and migration behavior.

One global CRM namespace is useful when the enterprise master system truly guarantees global uniqueness. It is dangerous when Germany and Canada can both issue customer `12345` independently.

## Choose identities at the correct grain

Select a primary identity appropriate to each schema's record grain. A CRM profile may use an enterprise person ID; anonymous web events commonly use ECID until authentication supplies a person link. Primary does not mean universally superior.

Do not mark order, booking, contract, or household IDs as person identities to simulate joins. Shared emails and phone numbers also need caution because they can be reassigned or used by several people.

The [identity graph guide](/blog/aep-identity-service-identity-graph-explained/) explains how namespaces become graph relationships. The [identity troubleshooting guide](/blog/aep-identity-stitching-troubleshooting/) covers split and collapsed outcomes.

## Define linking and conflict behavior

Document which events establish a trusted relationship, such as authenticated traffic carrying both ECID and CRM ID. Set namespace priorities and unique-person constraints using Identity Graph Linking Rules where appropriate. Test shared browsers, kiosks, family contacts, duplicate accounts, merged CRM records, and reassigned phone numbers.

Specify what happens when two person identifiers conflict. The response should be deterministic and monitored, not left to operators to infer from audience anomalies. Track unusual graph sizes and changes after each source onboarding.

## Govern lifecycle and access

Assign an owner to each namespace and require review before reuse. Version the registry, including deprecated identifiers and replacement paths. A namespace change can affect historical graphs, Profile, audiences, and destinations, so migration needs impact analysis and controlled testing.

Identity is not consent. EU and Germany, UK, US, Canada, Australia, UAE, Singapore, and India teams may have different permissions and retention rules for the same identifier. Collect only what the approved use case needs, attach provenance, and enforce regional policy independently of technical connectivity.

## Validate before scaling

In a non-production sandbox, ingest representative records and draw expected graphs. Confirm lookup by each namespace, profile fragments, merge behavior, audience eligibility, and deletion handling. Add one source at a time so a false link has a clear origin.

Publish the namespace registry alongside schema and source contracts. Integration teams should not invent namespaces during mapping, and regional teams should have a review route when the global contract does not fit.

The [RTCDP course](/courses/rtcdp/) connects namespace design to XDM, Profile, audiences, and activation. For help reviewing an enterprise identity contract, [contact us](/contact/).