---
title: "AEP Identity Service and Identity Graph Explained"
slug: "aep-identity-service-identity-graph-explained"
description: "Understand how Adobe Experience Platform Identity Service builds identity graphs, connects namespaces, and supports reliable profiles without unsafe stitching."
author: "Gaurav Agarwal"
publishDate: 2026-08-25
tags: ["AEP", "RTCDP", "Identity Service"]
featured: false
faqs:
  - question: "What does AEP Identity Service do?"
    answer: "AEP Identity Service detects identity values in ingested data and records relationships between them in an identity graph. Those relationships help Experience Platform connect data associated with the same person or entity."
  - question: "Is an identity graph the same as a Real-Time Customer Profile?"
    answer: "No. The identity graph stores links between identifiers, while Real-Time Customer Profile combines attributes and events from profile-enabled datasets. Profile uses identity relationships, but the graph and profile are separate platform capabilities."
  - question: "Can two people be merged accidentally in AEP?"
    answer: "Yes, if identity fields, namespaces, or source mappings create false links. Unique namespace constraints and Identity Graph Linking Rules can reduce this risk, but teams must still test shared-device and recycled-identifier scenarios."
---

AEP Identity Service records the relationships between identifiers that appear in Adobe Experience Platform data. When a dataset contains a CRM ID, loyalty ID, hashed email, ECID, or another identity, the service can connect those values in an identity graph. Real-Time Customer Profile then uses those connections to bring the right attributes and events together.

The important distinction is that Identity Service does not decide that two records belong together because their names or addresses look similar. It uses identity fields and namespaces deliberately configured in XDM. Good identity resolution therefore begins with data modeling and governance, not with a switch labeled "stitch profiles."

## Identity namespaces give values meaning

An identity value is useful only when its namespace is known. The value `12345` could be a CRM customer, a loyalty account, a branch, or an order. A namespace supplies that context. Two identical strings in different namespaces are different identities, while the same identity in the same namespace can connect records across datasets.

A practical namespace design usually separates:

- Person identifiers, such as a stable CRM ID.
- Contact identifiers, such as a hashed email or phone number.
- Device identifiers, such as ECID.
- Account or household identifiers that must not be mistaken for a person.

Use standard namespaces where they accurately represent the source value. Create a custom namespace when the identifier has a distinct business meaning. Avoid a generic namespace reused by unrelated systems merely because their values happen to share a format.

## How an identity graph is formed

Suppose a web event arrives with ECID `E1` and CRM ID `C1` after authentication. If both fields are marked as identities, AEP can record a link between them. A later CRM record containing `C1` and hashed email `H1` adds another relationship. The resulting graph connects `E1`, `C1`, and `H1`.

That graph is a set of linked identifiers, not a row containing every customer attribute. Profile fragments still come from profile-enabled datasets. The graph helps AEP determine which fragments may belong to the same profile, while a merge policy determines how their attributes are combined when a profile is viewed or evaluated.

This separation explains why enabling a dataset for Profile is not enough. If the schema does not identify the right fields, or mappings put values into the wrong namespace, Profile cannot reliably connect the fragments.

## Choose a primary identity carefully

An XDM schema can contain multiple identity fields, with one designated as primary. In an individual profile record, the primary identity represents the record's main subject. For an ExperienceEvent, it identifies the event's primary actor or context.

Primary does not mean "the most important identifier everywhere." It is a schema-level modeling choice. Select an identity consistently available at that record's grain. A CRM profile schema may use CRM ID, while anonymous digital events commonly use ECID until authentication supplies a stronger person signal.

Do not mark account, booking, or order identifiers as person identities to make records easier to find. That shortcut can connect multiple people who share the same entity and contaminate personalization downstream.

## Prevent graph collapse

Graph collapse occurs when false links pull unrelated people into one identity graph. Shared browsers are a common cause: two people can authenticate against the same ECID. Reassigned phone numbers, household emails, test accounts, and malformed source values create similar risks.

Identity Graph Linking Rules let teams define namespace priorities and enforce that a unique person namespace appears only once in a graph. These controls help the identity optimization process handle conflicting links. The detailed [shared-device identity stitching example](/blog/identity-stitching-shared-devices-aep) shows why a browser identifier should not be treated as permanent proof of a person.

Monitor graph behavior before and after onboarding a source. Test known identities, inspect unexpected graph sizes, and confirm how anonymous activity behaves when users authenticate, sign out, or share devices. Identity errors propagate into audiences and activation, so prevention is cheaper than correcting an already connected ecosystem.

## Plan identity for global deployments

Global programs need shared conventions without assuming every region can use the same identifiers. Email availability, consent, retention, and permitted activation can differ among countries. A global CRM namespace can work when the source truly guarantees global uniqueness; otherwise, a regional or source-qualified namespace may be safer.

Document where each identity originates, whether it is unique, how long it persists, and where it may be processed. Apply data governance labels and consent controls independently of identity stitching. A connected graph indicates a technical relationship, not permission to activate every connected attribute in every market.

## A practical implementation sequence

Start with use cases and source grains. Inventory identifiers, remove ambiguous candidates, and define namespace ownership. Model identities in XDM, map a small source, then validate graph outcomes using representative authenticated, anonymous, shared-device, and duplicate-record scenarios. Only after those checks should additional datasets and destinations depend on the design.

Identity Service becomes easier to reason about when it is treated as an explicit data contract. The [RTCDP course](/courses/rtcdp/) covers identity, XDM, Profile, and audiences as one connected architecture. For help reviewing namespaces or a graph-linking design for a regional or global rollout, [contact us](/contact/).