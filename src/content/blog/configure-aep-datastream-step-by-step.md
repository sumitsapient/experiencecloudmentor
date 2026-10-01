---
title: "Configure an AEP Datastream Step by Step"
slug: "configure-aep-datastream-step-by-step"
description: "Configure an Adobe Experience Platform datastream step by step, from sandbox and schema selection through service routing, testing, and production governance."
author: "Gaurav Agarwal"
publishDate: 2026-09-13
tags: ["AEP", "Datastreams", "Edge Network"]
featured: false
faqs:
  - question: "What is an AEP datastream?"
    answer: "An AEP datastream is server-side configuration on Adobe Experience Platform Edge Network that routes collected data to enabled Adobe services. It connects an Edge Network implementation with datasets and products such as Experience Platform, Analytics, and Target."
  - question: "Should development and production use the same datastream?"
    answer: "No. Use separate datastream configurations for development, staging, and production so tests cannot contaminate production datasets or activate production services. Map each client-side environment to the corresponding datastream ID."
  - question: "Does a datastream transform data into XDM?"
    answer: "Not by itself. The client can send XDM directly, and datastream data preparation can map supported non-XDM data into XDM. The schema and mapping still need to be designed, configured, and tested explicitly."
---

An AEP datastream is the Edge Network configuration that decides where data collected by Web SDK, Mobile SDK, or the Edge Network Server API is sent. To configure one, choose the correct sandbox and event schema, create an environment-specific datastream, enable only the required Adobe services, and test both the edge response and downstream data.

The datastream ID becomes part of the collection configuration, but most routing logic remains server-side. That allows service changes without rewriting every page or app, provided the payload contract remains compatible.

## 1. Confirm prerequisites

Before opening the datastream interface, identify the implementation environment, Adobe applications that need the event, and the XDM schema that represents it. For Experience Platform ingestion, prepare an ExperienceEvent schema and target dataset in the intended sandbox.

Confirm permissions for Data Collection, schemas, datasets, and any service being enabled. Define identity fields, consent behavior, and the event types the client will send. A datastream cannot rescue an ambiguous payload after collection.

Use separate development, staging, and production datasets. Sending test events into a production profile-enabled dataset can pollute identity graphs and audiences even when the event is easy to recognize later.

## 2. Create the datastream

In Data Collection, open **Datastreams** and create a new datastream. Give it a name that identifies the site or app and environment without embedding temporary project terminology. Add a concise description and select the correct mapping schema.

Save the configuration and record its generated ID. The ID is what Web SDK or another Edge Network client uses to select this routing configuration. Create equivalent datastreams for other environments rather than reusing one and repeatedly changing its destinations.

## 3. Add Adobe Experience Platform

Add the Adobe Experience Platform service when events should enter AEP. Select the target sandbox and event dataset. If the implementation uses edge segmentation or personalization, configure the relevant Profile and edge options supported by the service.

Check that the dataset's schema matches the payload schema. Also verify whether the dataset should be enabled for Profile. Profile enablement is an architecture decision with identity and volume consequences, not a default checkbox for all collected data.

The [AEP Identity Service explainer](/blog/aep-identity-service-identity-graph-explained) is useful before profile-enabling events that carry several identifiers.

## 4. Add other services deliberately

A datastream can route events to supported services such as Adobe Analytics, Adobe Target, and Adobe Journey Optimizer. Enable only products required by the implementation. For Analytics, provide the correct report suite configuration. For Target or personalization, review property tokens and decisioning settings as applicable.

One event may serve several products, but "collect once" does not mean every field automatically has the same meaning everywhere. Document how XDM and data-object fields map to each service. Preserve required context while avoiding duplicate collection through legacy and Web SDK paths.

## 5. Configure data preparation when needed

Datastream data preparation can map incoming fields to XDM at the edge. It is useful for Server API payloads or transitions where the sender cannot immediately produce the final XDM structure. Define mappings against representative input and handle types, required fields, arrays, and null values carefully.

Prefer direct, governed XDM from clients where practical. A large hidden mapping layer makes troubleshooting harder because the browser payload no longer shows exactly what reaches AEP. When mappings are necessary, version and test them as part of the data contract.

## 6. Connect the client environment

Configure the development Web SDK or Mobile SDK environment with the development datastream ID. In Adobe Tags, use extension environment settings instead of hard-coding IDs in custom rules. This keeps promotion from development to production predictable.

Send a minimal event first: a known event type, timestamp, page or screen details, and expected identity context. Once that path works, add commerce, authentication, and personalization interactions incrementally.

## 7. Validate end to end

Use browser or application debugging tools to inspect the outgoing request and edge response. Confirm the organization, datastream ID, consent state, XDM paths, and identity map. Then verify data arrives in the selected dataset with correct types and timestamps.

If Analytics or personalization is enabled, validate those destinations separately. A successful AEP dataset record does not prove every service mapping is correct. Test rejected consent, authenticated and anonymous states, duplicate events, and environment promotion as well as the happy path.

## Operate datastreams globally

For international deployments, standardize naming, event semantics, and environment separation while allowing genuine regional controls. Consent defaults, approved services, datasets, and routing may differ because of legal, contractual, or residency requirements. Document those differences rather than cloning configurations with no ownership model.

The [Edge Network overview](/blog/adobe-experience-platform-edge-network-explained) explains where datastreams sit in the wider architecture, and the [RTCDP course](/courses/rtcdp/) follows the data into Profile and audiences. For a review of datastream routing or environment design, [contact us](/contact/).