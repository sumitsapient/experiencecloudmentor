---
title: "AEP Profile Not Appearing After Ingestion: Troubleshooting Guide"
slug: "aep-profile-not-appearing-after-ingestion"
description: "Diagnose why an ingested record does not appear in AEP Real-Time Customer Profile, from dataset settings and identities to merge policies and processing latency."
author: "Gaurav Agarwal"
publishDate: 2026-08-29
tags: ["AEP", "Real-Time Customer Profile", "Troubleshooting"]
featured: false
faqs:
  - question: "Why is data in an AEP dataset but not in Real-Time Customer Profile?"
    answer: "The schema or dataset may not be enabled for Profile, the record may lack a valid identity, processing may still be underway, or you may be viewing it with the wrong namespace or merge policy."
  - question: "Does enabling an AEP dataset for Profile add all old records automatically?"
    answer: "Do not assume it does. Confirm when Profile was enabled, how the existing batches were processed, and whether the data must be reingested under your implementation plan."
  - question: "How should I look up a missing profile in AEP?"
    answer: "Use the exact identity value and namespace carried by a known record. Verify the source record first, then inspect profile fragments and merge-policy output rather than searching by a display attribute such as name."
---

If an AEP record was ingested but no profile appears, verify four things in order: the record exists in the intended dataset, the schema and dataset are enabled for Profile, the record carries a correctly namespaced identity, and the profile is being viewed with the expected merge policy. Ingestion success alone does not prove profile ingestion.

Use one synthetic or approved test identity with a known timestamp. Following a single record across boundaries is more reliable than comparing dashboard totals that may update at different times.

## Prove that the record landed

Start with the dataflow run or batch ID. Confirm that records were received and ingested, then query the target dataset for the exact test value. Check that you are in the correct sandbox and dataset; similarly named development and production resources are a common source of false alarms.

Inspect the stored XDM paths, not just the source payload. A mapping may place the value under an unexpected object or coerce it to another type. The [dataset, schema, and dataflow troubleshooting guide](/blog/aep-dataset-schema-dataflow-troubleshooting/) covers this ingestion boundary in detail.

If the record is absent, stop there and fix ingestion. Profile diagnostics cannot compensate for data that never reached the dataset.

## Confirm Profile enablement

Both the schema and dataset must support the Real-Time Customer Profile use case. Confirm the schema uses an appropriate XDM class and includes an identity field. Then verify the specific dataset is enabled for Profile.

Record when each setting was enabled. Do not toggle Profile off and on as an experiment in production: enablement has downstream consequences and may be irreversible through ordinary UI operations. If older data was loaded before enablement, determine through documentation and controlled testing whether reingestion is required.

Profile-enable only data that belongs in the customer profile. Lookup tables, operational logs, and high-volume records without a personalization use case can add cost and complexity. Model account and household entities carefully so they are not silently treated as people.

## Validate the identity value and namespace

Inspect the exact identity field on the stored record. It must be populated, mapped to the intended namespace, and represented consistently across sources. `12345` in a CRM ID namespace is not the same identity as `12345` in a loyalty namespace.

Look for whitespace, casing changes, hashing differences, placeholder values, and numbers that lost leading zeros. Avoid shared defaults such as `unknown`; repeated placeholder identities can connect unrelated data. If a source sends an identity map, validate its namespace codes and primary indicators as well as the values.

Search using the namespace actually present on the record. A profile may exist under ECID while an operator searches by CRM ID that was never included. The [Identity Service and identity graph guide](/blog/aep-identity-service-identity-graph-explained/) explains how identifiers connect profile fragments.

## Separate fragments from the merged profile

A profile is assembled from fragments contributed by profile-enabled datasets. Inspect the available fragments for the test identity. If the expected fragment exists but an attribute is absent from the merged view, the issue is likely merge behavior rather than ingestion.

Confirm which merge policy the profile viewer, audience, or API request uses. Dataset-precedence policies and timestamp-ordered policies can produce different attribute values. A newer null, an incorrectly mapped timestamp, or a higher-priority dataset may hide the value you expected without deleting the underlying fragment.

Review the [profile merge policies guide](/blog/aep-profile-merge-policies-explained/) before changing policy precedence. A policy adjustment affects every audience and activation that uses it, so test with conflicting records and document the result.

## Allow for processing without guessing

Dataset ingestion, profile ingestion, identity graph updates, and audience evaluation are separate operations. Check monitoring and service status before calling normal processing time a failure. Record observed times for a controlled event so your team has an evidence-based operational expectation.

Do not promise a universal latency figure. Batch size, ingestion method, service health, evaluation method, and architecture all matter. Escalate with sandbox, dataset, batch or request ID, identity namespace, redacted identity, ingestion time, and the last boundary you proved.

## Account for consent and regional design

A technically assembled profile is not automatically eligible for every use. Consent, governance labels, policies, and destination rules can suppress activation even when the profile exists. EU and Germany teams may require explicit purpose and minimization controls; UK, US, Canada, Australia, UAE, Singapore, and India programs should apply the obligations relevant to their data and use case.

Keep identity and consent evidence attributable to source and region. Do not create country-specific duplicate profiles merely to solve access control. Prefer governed datasets, labels, policies, and approved regional architecture.

Once the profile is visible, verify audience membership separately with the [audience population mismatch guide](/blog/aep-audience-population-mismatch/). The [RTCDP course](/courses/rtcdp/) teaches this full path from XDM through activation. For help tracing a missing profile, [contact us](/contact/).