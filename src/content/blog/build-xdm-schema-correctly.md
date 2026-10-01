---
title: "Build an XDM Schema Correctly"
slug: "build-xdm-schema-correctly"
description: "Build an Adobe Experience Platform XDM schema correctly by choosing the right class, record grain, field groups, identities, governance, and validation process."
author: "Gaurav Agarwal"
publishDate: 2026-09-12
tags: ["AEP", "XDM", "Data Modeling"]
featured: false
faqs:
  - question: "What is an XDM schema in Adobe Experience Platform?"
    answer: "An XDM schema is the governed structure and meaning for data ingested into Adobe Experience Platform. It combines a class with standard or custom field groups and defines field types, identities, relationships, and profile behavior."
  - question: "Can an XDM schema be changed after data is ingested?"
    answer: "Only compatible, additive changes are generally safe after use. Removing fields, changing types, or redefining meaning can break datasets and consumers, so teams should validate the model before production ingestion."
  - question: "Should every XDM schema be enabled for Profile?"
    answer: "No. Enable Profile only when records should contribute attributes or events to Real-Time Customer Profile and the schema has a sound primary identity. Analytical, staging, and operational datasets may belong only in the Data Lake."
---

To build an XDM schema correctly, define what one record represents, choose the XDM class that matches that grain, add only relevant field groups, model identities explicitly, and validate sample payloads before production ingestion. Start from business meaning rather than copying the source system's table structure.

An XDM schema is a durable contract shared by ingestion, Profile, audiences, destinations, analytics, and governance. Early shortcuts therefore become expensive downstream.

## Define the record grain

Write one sentence that completes: "One record in this schema represents..." A customer master record, loyalty account, web interaction, order, and consent update are different grains. Combining them in one schema creates repeating fields, unclear identities, and update behavior that no consumer can interpret consistently.

Also define expected update behavior. Profile records describe the latest known state or an attribute fragment. Experience events describe something that happened at a point in time and should normally be appended rather than overwritten.

If a source file contains several grains, split or transform it before ingestion. XDM should represent useful domain entities, not preserve an inconvenient export format.

## Choose the right class

Use **XDM Individual Profile** for person-related attributes such as loyalty tier or preferred language. Use **XDM ExperienceEvent** for timestamped interactions such as page views, purchases, and message engagement. Select another standard class when it genuinely matches a non-person entity.

The class establishes foundational fields and behavior. Do not choose Individual Profile merely because data may eventually be associated with a person. An order event remains an event even when it contains a customer identity.

## Reuse standard field groups

Search standard field groups for the concepts you need. Standard commerce, web, identity, and consent structures improve interoperability with Adobe applications and reduce custom mapping. Add a field group only when the schema uses it; a broad "include everything" approach makes the contract difficult to navigate and govern.

Create a custom field group for organization-specific concepts that have no accurate standard representation. Place custom fields under the organization's tenant namespace and use clear names and descriptions. Do not force a business value into a similar-sounding standard field with different semantics.

## Model types and arrays carefully

Select data types based on meaning and future operations. Dates should be dates, numeric measures should be numeric, and booleans should not arrive as changing strings such as `yes`, `true`, and `1`. Enumerations can control values when the vocabulary is stable and governed.

Arrays are appropriate for genuinely repeating values but complicate updates, segmentation, and mappings. If each child item has its own lifecycle or identity, it may belong in a separate schema. Use objects to group related fields, not simply to reproduce every source nesting level.

## Design identities before Profile

Mark fields as identities only when their values participate in identity resolution. Select the correct namespace and choose a primary identity that represents the record's subject at its grain. An order ID, household account, or shared email should not become a person identity for convenience.

Profile enablement should follow identity review. Once both schema and dataset are enabled, records can affect identity graphs, merged profiles, and audiences. The [Identity Service and identity graph guide](/blog/aep-identity-service-identity-graph-explained) explains those consequences.

## Add governance context

Identify sensitive, personal, contractual, and consent-related fields during design. Apply data usage labels and establish policies appropriate to their use. A technically valid XDM field is not automatically approved for every destination.

For a global model, standardize concepts that truly share meaning, such as ISO country codes or a governed product taxonomy. Preserve source and market context where interpretation, consent, currency, or retention differs. Avoid separate schemas for every language when the structure is identical, but do not flatten regional distinctions needed for lawful processing.

## Validate with real payloads

Create representative examples containing nulls, optional fields, long values, arrays, authenticated and anonymous identities, and market-specific variations. Validate mappings and ingest a small development sample. Confirm records in the dataset, inspect failed batches or streaming errors, and query the result.

Then test the intended consumer. If the schema supports Profile, inspect profile fragments and identity graphs. If it supports audiences, verify fields are understandable in the audience builder. For analytics, confirm the event grain and measures produce sensible results.

Document field definitions, source mappings, owners, allowed values, and change procedures. After ingestion begins, favor additive evolution. A new optional field is usually manageable; changing an existing field's type or meaning can require a new schema and migration.

The [Data Distiller guide](/blog/aep-data-distiller-explained) shows how modeled datasets can be transformed after ingestion, while the [RTCDP course](/courses/rtcdp/) covers XDM in the full platform flow. For help reviewing a schema before it becomes a long-lived contract, [contact us](/contact/).