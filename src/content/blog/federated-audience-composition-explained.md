---
title: "Federated Audience Composition: Building AEP Audiences Without Moving Your Warehouse Data"
slug: "federated-audience-composition-explained"
description: "How Adobe Experience Platform's Federated Audience Composition lets you build and activate audiences from your enterprise data warehouse without ingesting everything into AEP first."
author: "Gaurav Agarwal"
publishDate: 2026-09-14
tags: ["AEP", "RTCDP", "Federated Audience Composition"]
featured: false
---

What if you could build audiences from your enterprise data without first moving all of it into Adobe Experience Platform? That's the idea behind **Federated Audience Composition** in AEP, and it changes one of the most expensive assumptions in traditional CDP implementations: that you have to copy your data before you can use it.

## Think of it like querying a library instead of buying every book

Traditionally, activating warehouse data for marketing meant a long chain of steps: extract it, transform it, ingest it into AEP, store it, segment it, and only then activate it. That's a lot of data movement for data that's often already sitting in a well-governed enterprise data warehouse. Federated Audience Composition is more like being able to query a library's catalog directly instead of buying and shelving a copy of every book you might ever want to reference.

## What it actually lets you do

With Federated Audience Composition, organizations can:

- **Work with data where it already resides** — no need to duplicate it into AEP first.
- **Use that warehouse data to build and enrich audiences** directly.
- **Bring the resulting audiences into the Adobe ecosystem for activation** — email, push, personalization, the same destinations you'd normally activate to.

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

Federated Audience Composition builds directly on the audience and segmentation concepts we cover in our [RTCDP course](/courses/rtcdp) — understanding how AEP builds and activates audiences makes it much easier to see where a federated approach fits into your existing data architecture.

Curious whether your warehouse setup is a good fit for this approach? [Reach out](/contact) and we can talk through your specific case.
