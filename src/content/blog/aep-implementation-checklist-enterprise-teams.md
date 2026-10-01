---
title: "AEP Implementation Checklist for Enterprise Teams"
slug: "aep-implementation-checklist-enterprise-teams"
description: "A stage-by-stage Adobe Experience Platform implementation checklist for enterprise architecture, data, identity, governance, activation, and operations."
author: "Gaurav Agarwal"
publishDate: 2026-08-27
tags: ["AEP", "RTCDP", "Implementation", "Architecture"]
featured: false
faqs:
  - question: "What should an AEP implementation start with?"
    answer: "Start with measurable use cases, data and identity contracts, consent requirements, and owners. Do not begin by connecting every source or reproducing the source model in XDM."
  - question: "When should an enterprise enable datasets for Profile?"
    answer: "Enable Profile only after validating record grain, identities, expected volume, merge behavior, consent, and a downstream use case. Not every dataset belongs in Profile."
  - question: "What makes an AEP implementation production-ready?"
    answer: "Production readiness requires tested data quality, identity, governance, activation, monitoring, support ownership, recovery procedures, and evidence that the use case produces the intended outcome."
---

An enterprise AEP implementation is ready when a small number of governed use cases work end to end and can be operated reliably. Connecting many sources is not the milestone. Use this checklist as release evidence, assigning every item an owner and an observable acceptance result.

## 1. Outcomes and scope

- Define prioritized use cases, audiences, channels, expected decisions, and measurable outcomes.
- Identify what is explicitly out of scope for the first release.
- Name business, architecture, data, privacy, security, and operations owners.
- Map regions, brands, timelines, dependencies, and licensing assumptions.
- Establish baseline measures without inventing projected uplift.

Use cases should determine required data. If a field has no approved decision or reporting purpose, question why it is entering the platform.

## 2. Architecture and environments

- Document source, ingestion, AEP services, destinations, and failure boundaries.
- Define development, validation, and production sandboxes with access rules.
- Decide promotion, versioning, secrets, naming, and rollback practices.
- Confirm network, authentication, API, storage, and regional constraints.
- Create capacity assumptions and a process for revisiting them.

The [global sandbox strategy](/blog/aep-sandbox-strategy-global-organizations/) helps avoid both shared-production risk and excessive regional duplication.

## 3. XDM and data quality

- Define each dataset's grain and owning source.
- Reuse standard field groups where their meaning fits; govern custom fields.
- Validate types, enums, timestamps, null handling, arrays, and required fields.
- Create source-to-XDM mappings and sample payloads under version control.
- Establish rejection thresholds, reconciliation, lineage, retention, and deletion.

Test edge cases from every source variation. The [dataset and dataflow troubleshooting guide](/blog/aep-dataset-schema-dataflow-troubleshooting/) provides a diagnostic sequence that can become an operational runbook.

## 4. Identity and Profile

- Inventory person, device, account, household, and transaction identifiers.
- Define namespace ownership, uniqueness, normalization, and persistence.
- Select primary identities appropriate to record grain.
- Test authenticated, anonymous, shared-device, duplicate, and recycled-ID cases.
- Approve linking rules and merge policies before enabling Profile broadly.
- Estimate and monitor profile volume and graph behavior.

Use the [enterprise identity namespace strategy](/blog/enterprise-identity-namespace-strategy/) and never model an account or order as a person merely to make records join.

## 5. Consent, governance, and privacy

- Document legal basis and permitted purposes with privacy counsel.
- Model consent status, source, timestamp, policy version, and conflicts.
- Classify data and configure labels, marketing actions, and policies.
- Test allowed and blocked activations, withdrawal, access, and deletion.
- Minimize destination fields and define downstream responsibilities.
- Set audit evidence and policy-review cadence.

For global delivery, assess EU and Germany, UK, US, Canada, Australia, UAE, Singapore, and India requirements only where data or activation reaches those markets. One policy taxonomy with approved regional rules is easier to operate than undocumented country clones.

## 6. Audiences and activation

- Define audience logic in plain language with inclusion and exclusion examples.
- Select batch, streaming, or edge evaluation based on actual latency need.
- Validate merge policy, lookback windows, timezone, and expected identities.
- Confirm destination mapping, consent enforcement, schedules, and rejection handling.
- Reconcile qualified, eligible, exported, accepted, and addressable counts.
- Prevent test profiles from entering live customer communication.

## 7. Production readiness

- Create dashboards and alerts for ingestion, Profile, audiences, destinations, and capacity.
- Write runbooks with IDs and evidence needed for escalation.
- Assign support coverage, severity definitions, handoffs, and vendor contacts.
- Rehearse credential expiry, source failure, bad mapping, consent withdrawal, and destination outage.
- Complete security, privacy, accessibility, and change approvals.
- Run a controlled launch, verify downstream behavior, and hold a post-launch review.

Keep the checklist alive after launch. New schemas, sources, destinations, regions, and identity rules should pass the relevant gates instead of inheriting approval from the initial implementation.

The [RTCDP course](/courses/rtcdp/) develops the architecture and operational skills behind these checks. For help turning this list into implementation acceptance criteria, [contact us](/contact/).