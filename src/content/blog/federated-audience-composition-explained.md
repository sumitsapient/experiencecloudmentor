---
title: "Federated Audience Composition in AEP: A Practical Guide"
slug: "federated-audience-composition-explained"
description: "Learn what Federated Audience Composition is, how it works in Adobe Experience Platform, and when to use it for warehouse-based audience activation."
author: "Gaurav Agarwal"
publishDate: 2026-09-14
modifiedDate: 2026-10-01
tags: ["AEP", "RTCDP"]
featured: false
ogImage: "/blog/federated-audience-composition-og.png"
sources: [{ title: "Adobe Experience League: Federated Audience Composition documentation", url: "https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/home" }]
faqs:
  - question: "What is Federated Audience Composition in AEP?"
    answer: "Federated Audience Composition lets teams build audiences from data in a connected enterprise data warehouse without first ingesting the complete underlying dataset into Adobe Experience Platform."
  - question: "Does Federated Audience Composition copy warehouse data into AEP?"
    answer: "It queries data in the connected warehouse and brings the composed audience result into the Adobe ecosystem for activation rather than copying every source record into AEP."
  - question: "Does federation replace normal AEP data ingestion?"
    answer: "No. Standard ingestion is still appropriate when data must contribute to Real-Time Customer Profile, event-driven experiences, or other platform services. Many architectures use both approaches."
---

**Federated Audience Composition is an Adobe Experience Platform capability that lets teams build audiences from data in an enterprise data warehouse without first copying all of that data into AEP.** AEP queries the connected warehouse, composes the audience, and makes the resulting audience available for activation through Adobe applications.

This changes one of the most expensive assumptions in traditional CDP implementations: that you have to copy your data before you can use it.

## What is Federated Audience Composition?

Federated Audience Composition connects AEP to supported enterprise data warehouses so marketers can use warehouse attributes to build and enrich audiences. The underlying warehouse data remains in place; only the audience results needed for activation enter the Adobe ecosystem.

## Think of it like querying a library instead of buying every book

Traditionally, activating warehouse data for marketing meant a long chain of steps: extract it, transform it, ingest it into AEP, store it, segment it, and only then activate it. That's a lot of data movement for data that's often already sitting in a well-governed enterprise data warehouse. Federated Audience Composition is more like being able to query a library's catalog directly instead of buying and shelving a copy of every book you might ever want to reference.

## What it actually lets you do

With Federated Audience Composition, organizations can:

- **Work with data where it already resides** — no need to duplicate it into AEP first.
- **Use that warehouse data to build and enrich audiences** directly.
- **Bring the resulting audiences into the Adobe ecosystem for activation** — email, push, personalization, the same destinations you'd normally activate to.

## How the workflow fits together

At a high level, a federated audience workflow has five steps:

1. **Connect the warehouse.** Configure a supported warehouse connection and the credentials AEP needs to query it.
2. **Map the relevant data.** Identify the warehouse tables, fields, and identities needed for audience composition.
3. **Build the audience.** Define audience rules using warehouse attributes rather than copying every source record into AEP.
4. **Run the composition.** AEP executes the query against the connected warehouse and materializes the qualifying audience.
5. **Activate the result.** Use the composed audience in the Adobe applications and destinations supported by your RTCDP architecture.

![Federated Audience Composition workflow from an enterprise warehouse through audience composition and activation, with only the audience result moving into Adobe destinations](/blog/federated-audience-workflow.png)

Federation changes where the audience calculation happens; it does not remove the need for identity design, governance, consent enforcement, or destination configuration.

## When should you use it?

Federated Audience Composition is a strong fit when valuable attributes already live in a governed warehouse, copying the full dataset would add cost or delay, and scheduled audience activation meets the use case. Examples include lifetime-value bands, propensity scores, subscription status, and product-usage attributes maintained by analytics or data teams.

Standard AEP ingestion remains a better fit when the data must contribute continuously to the Real-Time Customer Profile, power event-driven experiences, or be available to multiple platform services beyond audience composition. Many organizations will use both patterns rather than treating federation as a complete replacement for ingestion.

## The benefits, in plain terms

- Less unnecessary data movement
- Reduced data duplication
- Access to valuable data that would otherwise stay locked in the warehouse
- More flexible audience creation, since you're not limited to only what's already been ingested
- A tighter connection between enterprise data and marketing activation

## A simple example

Say your finance and product teams maintain a detailed customer lifetime value model in your enterprise warehouse, refreshed nightly, that never gets exported anywhere else. Traditionally, using that model for marketing would mean building a pipeline to copy it into AEP — engineering time, storage cost, and a sync process to maintain. With Federated Audience Composition, you can compose an audience directly against that warehouse table, bring just the resulting audience into AEP, and activate it through RTCDP to your usual destinations — without ever duplicating the underlying model.

## The takeaway

You don't always need to move the data to make the data useful. That single idea reframes how you should think about warehouse integration in a modern MarTech stack — not as an all-or-nothing ingestion project, but as a set of targeted queries that bring only what you need into the activation layer.

## Where to start

Federated Audience Composition builds directly on the audience and segmentation concepts we cover in our [RTCDP course](/courses/rtcdp/) — understanding how AEP builds and activates audiences makes it much easier to see where a federated approach fits into your existing data architecture.

Curious whether your warehouse setup is a good fit for this approach? [Reach out](/contact/) and we can talk through your specific case.
