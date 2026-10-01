---
title: "Customer Journey Analytics Connection and Data View Design"
slug: "customer-journey-analytics-connection-data-view-design"
description: "Design CJA connections and data views with deliberate datasets, identity, retention, sessions, attribution, components, and regional governance."
author: "Gaurav Agarwal"
publishDate: 2026-09-16
tags: ["CJA", "AEP", "Data Modeling"]
featured: false
faqs:
  - question: "What is the difference between a CJA connection and a data view?"
    answer: "A connection defines the Experience Platform datasets and core data configuration available to CJA. A data view defines the reporting interpretation, including components, sessions, attribution, persistence, and derived behavior."
  - question: "How many CJA data views should an organization create?"
    answer: "Create separate data views when users need materially different governed definitions, access, calendars, session rules, or analytical purposes. Avoid one view per report or country when shared definitions are sufficient."
  - question: "Can a CJA connection include datasets with different schemas?"
    answer: "It can combine compatible event, profile, and lookup data according to supported connection behavior, but teams must understand keys, record grain, identity coverage, field meaning, and overlap before using them together."
---

Design a Customer Journey Analytics connection as the governed data boundary and a data view as the governed reporting interpretation. Put datasets, identity, retention, and ingestion expectations in the connection design. Put components, sessions, attribution, persistence, and analyst-facing definitions in the data view.

Starting with a dashboard and working backward usually creates duplicated components and unexplained totals. Start with business questions and record grain.

## Define the analytical contract

List the decisions users need to make, the entities involved, and the acceptable freshness. A cross-channel journey question may require web events, orders, service contacts, and customer attributes. For each source, document one row’s meaning, keys, event time, ingestion time, update behavior, and owner.

Do not add a dataset because it might be useful later. Every source increases field ambiguity, access scope, quality monitoring, and cost. Begin with a coherent set and expand through change control.

Separate event, profile, and lookup semantics. A customer profile update is not a customer action, and a product lookup row is not a product view.

## Choose identity before adding datasets

Define the person ID or other entity key used by the connection and measure its coverage in each source. Decide how anonymous records, authenticated events, shared accounts, and missing IDs should behave. The identity choice affects people counts, pathing, attribution, and joins throughout the data view.

Use a stable, governed identifier rather than an easily changed contact value where possible. If stitching is part of the design, document its prerequisites, lookback implications, and expected impact on historical analysis.

Global designs must respect legal entity and regional data boundaries. Do not combine datasets across markets solely to produce one executive dashboard. Use approved access, consent, governance labels, and data residency architecture.

## Configure the connection deliberately

Select only the datasets required for the defined scope. Check schema compatibility, duplicate collection paths, backfill periods, retention, and whether the same events arrive through more than one source. Duplicated records can produce plausible but wrong totals.

Set retention according to analytical need and policy. More history is not automatically better when source definitions changed several times. Record major instrumentation and schema transitions so analysts can interpret breaks.

Monitor ingestion latency, failed batches, streaming quality, identity coverage, and unexpected volume by dataset. A connection is an operating data product, not a one-time configuration.

## Build data views around governed definitions

Give each data view a clear audience and purpose. Configure timezone and calendar first because they influence daily, weekly, and regional comparisons. Then define sessions, including timeout and restart conditions appropriate to the journey rather than copying web visit defaults blindly.

Curate dimensions and metrics with readable names, descriptions, formats, include/exclude rules, and ownership. Hide raw fields that should not be used directly. Use derived fields and component settings for explainable reporting logic, but move enterprise source-of-truth calculations upstream when they must be identical outside CJA.

Define attribution and persistence per metric use case. Marketing acquisition, content influence, and service resolution may need different models. Label them clearly rather than publishing several components called “Revenue.”

## Validate from records to reports

Create known test journeys spanning datasets and identities. Reconcile source records, connection ingestion, person association, data-view components, sessions, attribution, and workspace output in that order. Include late events, corrections, missing IDs, repeated orders, and timezone boundaries.

When comparing with Adobe Analytics, expect differences until definitions align. The [Adobe Analytics versus CJA guide](/blog/adobe-analytics-vs-customer-journey-analytics/) explains the major architectural reasons.

Set release criteria for data views: owner approval, component dictionary, access review, test evidence, freshness monitoring, and analyst communication. Version material definition changes and preserve enough context to explain historical reports.

## Manage change without fragmenting reporting

Use a request process for new datasets and components that captures the business question, proposed definition, consumers, privacy classification, and overlap with existing fields. Prefer extending a governed data view when definitions remain compatible. Create another view when access, calendar, session, or analytical rules are materially different.

Publish deprecation dates for replaced components and identify workspaces that still use them. A clean component catalog reduces accidental use of raw fields and makes regional comparisons defensible.

For related platform foundations, review the [AEP implementation checklist](/blog/aep-implementation-checklist-enterprise-teams/) and [identity namespace strategy](/blog/enterprise-identity-namespace-strategy/). For help reviewing a CJA model for global teams, [contact us](/contact/).
