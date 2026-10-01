---
title: "RTCDP Audience Evaluation Methods: Batch, Streaming, and Edge"
slug: "rtcdp-audience-evaluation-methods-batch-streaming-edge"
description: "Compare batch, streaming, and edge audience evaluation in Adobe RTCDP, including latency, rule eligibility, architecture, and activation tradeoffs."
author: "Gaurav Agarwal"
publishDate: 2026-09-24
tags: ["AEP", "RTCDP", "Audiences"]
featured: false
faqs:
  - question: "What are the audience evaluation methods in Adobe RTCDP?"
    answer: "Adobe RTCDP supports batch, streaming, and edge evaluation. Batch runs on a schedule across profile data, streaming responds to eligible profile changes, and edge evaluates eligible audiences at the Edge Network for immediate digital decisions."
  - question: "Can every audience be evaluated at the edge?"
    answer: "No. Edge and streaming evaluation support specific rule patterns and data availability. Complex history, broad aggregates, and some relationship logic may require batch evaluation. The audience builder indicates eligibility."
  - question: "Does faster audience evaluation guarantee faster activation?"
    answer: "No. Evaluation and activation are separate stages. Destination export schedules, connector behavior, identity availability, consent checks, and the destination's own processing all contribute to end-to-end latency."
---

Adobe Real-Time CDP offers three audience evaluation methods because not every use case needs the same latency or supports the same rules. Batch evaluation scans profile data on a schedule, streaming evaluation reacts to eligible profile changes, and edge evaluation qualifies eligible audiences during interactions on the Adobe Experience Platform Edge Network.

Choose the slowest method that still meets the business requirement. That principle usually produces simpler rules, clearer operations, and fewer false expectations than labeling every audience "real time."

## Batch evaluation

Batch evaluation is designed for broad, scheduled computation across profiles. It supports rich audience logic, including historical behavior and conditions that are not eligible for streaming or edge processing. Membership is recalculated during a scheduled segmentation job and then made available for activation.

Good batch use cases include weekly loyalty groups, customers whose rolling purchase total crosses a threshold, or suppression based on a broad history window. A campaign planned for tomorrow rarely benefits from subsecond qualification today.

Batch is also easier to reconcile. Teams can compare job completion, audience counts, and export runs against a known schedule. Its limitation is latency: a profile change after a job may not affect membership until a later run.

## Streaming evaluation

Streaming evaluation updates membership as eligible profile data changes. It is useful when a recent event or attribute update should influence activation promptly, such as a product view followed by no purchase or a newly updated loyalty status.

Streaming does not mean every expression can continuously evaluate. Rules must meet Adobe's eligibility requirements. Complex time windows, large historical aggregations, and unsupported functions may force batch evaluation. Build the business rule first, then check the evaluation method shown in the audience builder rather than simplifying important logic solely to obtain a faster label.

Streaming qualification also depends on the event reaching AEP, mapping to the correct XDM fields, joining the intended profile, and passing consent and policy checks. A fast evaluator cannot compensate for delayed ingestion or faulty identity stitching.

## Edge evaluation

Edge evaluation supports immediate qualification at the Edge Network, close to web and mobile interactions. It is appropriate for eligible same-session personalization, where the current event or readily available edge profile data should affect the next decision.

For example, a visitor who views a category several times in the current experience might qualify for a relevant content treatment. The decision can occur without waiting for a central batch cycle. The [AEP Edge Network explainer](/blog/adobe-experience-platform-edge-network-explained) describes the collection and routing layer behind these interactions.

Edge audiences have the strictest rule constraints because decisions must be made quickly with data available at the edge. They are not a shortcut for every profile use case. If qualification needs months of transaction history or an attribute that is not available in the edge profile, calculate it upstream or use another evaluation method.

## Evaluation is not activation

Audience membership and destination delivery are separate. A streaming audience can still feed a destination that exports files daily. An edge audience may support immediate on-site personalization but not make an external advertising platform update at the same speed.

Map the full path for each use case:

1. Source data is collected and ingested.
2. Identity and Profile incorporate the data.
3. The audience evaluates membership.
4. Governance and consent controls are applied.
5. A destination receives and processes the update.

State the latency target for that complete path. This avoids promising "real time" based on only one fast component.

## Select the right method

Begin with the moment when action remains valuable. Same-page personalization may justify edge evaluation. A reminder expected within minutes may suit streaming. A morning campaign or analytical cohort may be best served by batch.

Then confirm data and rule eligibility. Ask whether required attributes exist at the evaluation location, identities are available, history windows are supported, and the destination can consume updates at the intended cadence. Test entry and exit, including late events and profile updates that should remove membership.

## Global deployment considerations

An international program may use different evaluation methods for the same conceptual audience. A market with edge personalization and appropriate consent signals can evaluate during a digital interaction, while another market activates a governed batch audience through an approved regional destination.

Do not create separate audiences only to insert country names. Split implementations when consent, data residency, channel availability, taxonomy, or destination contracts genuinely differ. Keep shared definitions and measurement conventions so regional outcomes remain understandable.

The [RTCDP course](/courses/rtcdp/) connects audience rules to XDM, Profile, identity, and destinations. If a latency requirement is unclear or an audience is unexpectedly ineligible for streaming or edge evaluation, [contact us](/contact/) for an architecture review.