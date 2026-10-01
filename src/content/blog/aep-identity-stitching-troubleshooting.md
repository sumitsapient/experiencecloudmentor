---
title: "AEP Identity Stitching Troubleshooting"
slug: "aep-identity-stitching-troubleshooting"
description: "Troubleshoot split profiles, graph collapse, missing identity links, and unsafe namespace mappings in Adobe Experience Platform."
author: "Gaurav Agarwal"
publishDate: 2026-08-26
tags: ["AEP", "RTCDP", "Identity Service", "Troubleshooting"]
featured: false
faqs:
  - question: "Why are two AEP profiles not stitching together?"
    answer: "The records may not share a correctly namespaced identity, one dataset may not participate in Profile, the link may not have been ingested, or the identity values may differ because of formatting or hashing."
  - question: "What is identity graph collapse in AEP?"
    answer: "Graph collapse occurs when false or overly broad identity links connect records belonging to different people. Shared devices, placeholder IDs, recycled contact values, and entity IDs modeled as people are common causes."
  - question: "Should email be the primary identity for every AEP dataset?"
    answer: "No. Email can change, be shared, or be absent, and its formatting and hashing must be consistent. Choose an identity appropriate to each record's grain and use a stable person identifier when the source genuinely provides one."
---

Identity stitching problems usually fall into two categories: records that should connect but remain split, and records that should stay separate but collapse into one graph. Diagnose them by tracing the exact identity pairs that a source submitted. Names, addresses, and other similar attributes do not create AEP identity links unless your implementation explicitly maps them as identities.

Start with one known person and one known counterexample. Use redacted values in operational notes and avoid copying raw personal data into tickets.

## Draw the expected graph

Before opening the platform, write the expected relationships as namespace-value pairs: CRM ID `C1` connects to hashed email `H1`; authenticated web event ECID `E1` connects to `C1`; account ID `A1` remains an entity and must not connect every account member as one person.

Then compare that expectation with the identities carried by each stored record. The [Identity Service and identity graph guide](/blog/aep-identity-service-identity-graph-explained/) covers namespaces, primary identities, and the distinction between a graph and a profile.

If the expected model itself is ambiguous, stop ingestion expansion. Platform configuration cannot decide whether a household, account, device, subscription, and person are equivalent business entities.

## When profiles remain split

Confirm both records contain at least one shared identity in the same namespace. Matching strings in different namespaces do not connect. Check whitespace, case normalization, leading zeros, prefixes, encoding, and whether one system hashes a value while another sends it raw.

Verify the identity fields are defined on the target schemas and populated at the mapped XDM paths. Confirm the relevant datasets are enabled for Profile when the use case requires profile assembly. Inspect the actual ingested record; a correct source payload can still be mapped incorrectly.

For authentication links, make sure the event contains both the device identity and authenticated person identity at the moment the relationship is known. Sending CRM ID on a later unrelated record does not prove which earlier device belonged to that person.

Allow identity processing to complete, then query using each namespace. If records still remain separate, retain the ingestion request or batch IDs and the expected pair for escalation.

## When unrelated profiles collapse

Look for identities reused across people: shared browser ECIDs, family email addresses, recycled phone numbers, test credentials, kiosk devices, and placeholder values such as `unknown`. Remove invalid identity mappings at the source; do not merely exclude the resulting merged profile from an audience.

Check whether account, contract, order, or household identifiers were marked as person identities. Those values can legitimately appear on multiple people and create large graphs. Model the relationship according to its real entity grain instead of using identity stitching as a join engine.

The [shared-device identity article](/blog/identity-stitching-shared-devices-aep/) explains how Identity Graph Linking Rules and namespace priority help prevent two authenticated people from collapsing through one browser. Test those rules with representative sequences before relying on them in production.

## Inspect namespace design and linking rules

Every namespace needs an owner, source, format, uniqueness claim, persistence expectation, and allowed uses. A generic custom namespace reused by several systems is dangerous when their ID generators overlap. If CRM identifiers are unique only within a region or brand, qualify the namespace or create an enterprise translation rather than pretending the values are globally unique.

Review which namespace represents a unique person and how namespace priority handles conflicting links. Linking rules reduce risk but do not repair malformed source data. Monitor unusual graph sizes and sudden changes after onboarding a dataset.

Do not delete or recreate namespaces casually. Namespace and identity changes can affect existing graphs, profiles, audiences, and activations. Plan correction with Adobe guidance, downstream owners, and a tested migration path.

## Distinguish identity from merge behavior

If identities connect correctly but an attribute has the wrong value, inspect profile fragments and merge policy. Identity Service determines relationships; merge policy determines how profile attributes are combined. The [profile merge policies guide](/blog/aep-profile-merge-policies-explained/) helps separate those concerns.

Likewise, a connected identity does not grant permission to use all associated data. Apply consent and governance controls to activation independently of graph construction.

## Test global edge cases

Global organizations must verify whether identifiers are truly unique across brands and regions. EU and Germany programs may limit which identifiers can be collected or activated; the UK, US, Canada, Australia, UAE, Singapore, and India may have different consent, residency, and retention requirements depending on the use case.

Use one global namespace only when the issuing system guarantees global uniqueness and governance approves the processing. Otherwise, use source-qualified identities and deliberate translation. Test shared devices, reassigned contacts, customer migration between regions, account mergers, deletion requests, and records created offline.

The [RTCDP course](/courses/rtcdp/) teaches identity design alongside schemas, Profile, and audiences. For help reviewing a split or collapsed graph, [contact us](/contact/).