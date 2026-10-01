---
title: "AEP Developer Interview Questions and Answer Frameworks"
slug: "aep-developer-interview-questions"
description: "Prepare for AEP developer interviews with scenario-based questions on XDM, ingestion, identity, Profile, audiences, governance, APIs, and operations."
author: "Gaurav Agarwal"
publishDate: 2026-08-24
tags: ["AEP", "Careers", "Interview Questions"]
featured: false
faqs:
  - question: "What should an AEP developer study for interviews?"
    answer: "Study connected behavior across XDM, ingestion, identity, Profile, merge policies, audiences, governance, destinations, APIs, sandboxes, monitoring, and failure recovery. Practice explaining tradeoffs with testable scenarios."
  - question: "Do AEP interviews differ by country?"
    answer: "The platform fundamentals are consistent, but employers may emphasize consulting, data engineering, activation, support, communication, or certification differently. Use the job description and interview briefing as the source of truth."
  - question: "How should I answer when I have not used an AEP feature?"
    answer: "Say so clearly. Explain the related concepts you do know, outline how you would verify the design in documentation and a sandbox, and identify risks and evidence you would inspect. Never invent project experience."
---

Strong AEP developer interviews test whether you can trace data from source to activation and diagnose what happens between those points. Prepare to explain not only what a feature does, but why you would choose it, what can fail, and how you would verify the result.

The questions below are answer frameworks, not scripts. Use examples from work you actually performed, and distinguish hands-on experience from study or observation.

## XDM and data architecture

**How would you model CRM customers, loyalty accounts, and transactions?** A strong answer starts with record versus time-series behavior, record grain, identities, relationships, reusable field groups, and source semantics. It avoids placing every source field into one oversized schema.

**When would you extend a standard field group?** Explain reuse, governance, naming, compatibility, and why the field has stable business meaning. Mention downstream mappings and the difficulty of correcting a poor production schema.

**How do you migrate a relational model into AEP?** Do not promise a table-for-table copy. Identify use cases, grains, keys, events, profile eligibility, query needs, and activation latency. The [XDM schema guide](/blog/build-xdm-schema-correctly/) is useful preparation.

## Ingestion and dataflows

**When would you use batch, streaming, or Edge Network collection?** Compare source capability, latency, volume, correction behavior, ordering, monitoring, and cost. “Real time” is not automatically better if the business acts once per day.

**A dataflow reports success, but expected profiles are absent. What do you check?** Trace source delivery, mapping, schema validation, dataset enablement, identity fields, primary identity, namespace values, Profile ingestion delay, merge policy, and the profile lookup key. Separate ingestion success from profile availability.

**How do you make ingestion idempotent?** Discuss source record identity, replay behavior, event identifiers, file naming, duplicate handling, checkpoints, and reconciliation. The exact solution depends on connector and data type.

## Identity and Profile

**What is the difference between an identity graph and a profile?** The graph stores relationships among identities. Profile combines eligible fragments using identity relationships and merge policy behavior. Confusing them leads to weak troubleshooting.

**How would you prevent graph collapse?** Cover namespace meaning, uniqueness constraints, identity priorities, shared devices, synthetic IDs, test data, source validation, Identity Graph Linking Rules where applicable, and graph monitoring.

**What does a merge policy decide?** Explain dataset precedence or timestamp ordering and identity stitching behavior in the context of profile views and audience evaluation. Give an example where two sources disagree.

## Audiences, governance, and activation

**Why can an audience count differ from a CJA segment or source query?** Compare datasets, identity, lookback windows, event timing, merge policy, evaluation method, exclusions, and processing freshness. Start with definitions before assuming data loss.

**How do batch, streaming, and edge evaluation differ?** Discuss eligibility constraints, latency, supported expressions, use cases, and how qualification reaches a destination. Use the [audience evaluation guide](/blog/rtcdp-audience-evaluation-methods-batch-streaming-edge/) for deeper review.

**How would you enforce data usage restrictions?** Include labels, policies, marketing actions, consent, destination governance, least-privilege access, auditability, and negative testing. Governance is not complete because a policy exists; demonstrate that disallowed activation is blocked.

## APIs and production engineering

**How would you automate AEP configuration?** Discuss supported APIs, service credentials, environment-specific configuration, secret handling, rate limits, retries, idempotency, promotion, and drift detection. Avoid implying that every UI artifact has identical API lifecycle support.

**What belongs in monitoring?** Include source arrival, dataflow errors, rejected records, ingestion delay, profile anomalies, audience changes, destination failures, credentials, and business reconciliation. Every alert needs severity, owner, and response.

**How would you investigate a production incident safely?** Start with scope and recent changes, use approved test profiles and correlation data, minimize access to personal information, preserve evidence, communicate impact, and define rollback or containment.

## Architecture scenarios for senior candidates

Expect broader prompts such as designing AEP for several brands, selecting sandbox boundaries, onboarding a new region, or separating account and person identities. State assumptions, draw the data path, identify ownership, and name evidence that could change your design.

For a multi-region scenario, cover source location, data movement, consent, retention, access, destination endpoints, timezones, support, and local operating autonomy. Do not make legal conclusions from geography alone; identify where privacy, security, and counsel review is required.

## Global hiring context

AEP roles can be titled developer, data engineer, platform engineer, consultant, architect, or martech specialist. In India and global delivery centers, an employer may emphasize implementation breadth and client handoffs. Product teams in the US, Canada, UK, EU, Australia, Singapore, or UAE may emphasize platform ownership, regional compliance collaboration, or on-call operations. These are possible patterns, not rules.

Ask which AEP applications, source systems, APIs, cloud services, and production responsibilities are in scope. Confirm whether certification is required or preferred, whether the role includes travel or cross-timezone support, and how hands-on work is evaluated.

Prepare by building a small end-to-end flow and documenting its failure modes. The [RTCDP course](/courses/rtcdp/) covers the platform foundation. For focused interview preparation, [contact us](/contact/).