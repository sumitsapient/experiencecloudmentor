---
title: "Adobe Experience Platform Edge Network: How It Works"
slug: "adobe-experience-platform-edge-network-explained"
description: "Learn how the Adobe Experience Platform Edge Network uses datastreams and XDM to collect and route experience data to Adobe applications in real time."
author: "Gaurav Agarwal"
publishDate: 2026-09-06
modifiedDate: 2026-10-01
tags: ["AEP", "RTCDP"]
featured: false
ogImage: "/blog/aep-edge-network-og.png"
sources: [{ title: "Adobe Experience League: Web SDK and Experience Platform Edge Network overview", url: "https://experienceleague.adobe.com/en/docs/experience-platform/edge/home" }]
faqs:
  - question: "What is the Adobe Experience Platform Edge Network?"
    answer: "It is a globally distributed data-collection and decisioning layer that receives experience events and routes them to configured Adobe applications."
  - question: "What does a datastream do in the AEP Edge Network?"
    answer: "A datastream is the routing configuration that determines which Adobe services receive an event collected through the Edge Network."
  - question: "Is the AEP Edge Network the same as a CDN?"
    answer: "No. Both use distributed edge locations, but a CDN primarily delivers content while the AEP Edge Network collects experience data and supports real-time routing and decisioning."
---

**The Adobe Experience Platform Edge Network is a globally distributed data-collection and decisioning layer.** It receives experience events close to the user, standardizes them with XDM, and uses a datastream to route them to configured Adobe applications such as RTCDP, AJO, Analytics, and CJA.

The simplest mental model is a CDN for customer experience data and decisioning rather than static content.

## Think of it like a CDN, but for experience data

A traditional CDN brings content closer to users through geographically distributed edge locations, cutting down the distance every request has to travel. The Adobe Experience Platform Edge Network applies that same "edge" concept to experience data. Instead of every interaction having to travel through a separate, product-specific integration, applications send data to a single Edge endpoint, where Adobe processes and routes it to whichever configured services need it.

## How the pieces fit together

Behind the scenes, the flow looks roughly like this:

**Browser/App → Edge Network → Datastream → AEP / RTCDP / AJO / Analytics / CJA**

The **datastream** acts as the routing configuration — it determines which Adobe services should receive a given incoming event. And because that same event can use a shared data model (**XDM**, the Experience Data Model), you don't need completely separate instrumentation for every Adobe product it eventually reaches.

![Adobe Experience Platform Edge Network data flow from a browser or app through an SDK, Edge Network, and datastream routing to RTCDP, AJO, Analytics, and CJA](/blog/aep-edge-network-flow.png)

## Why this architecture matters

Without a shared edge layer, every product integration tends to become its own bespoke pipeline: its own tagging, its own data format, its own maintenance burden. The Edge Network collapses that into one collection point with one data model, and lets configuration — not more code — decide where the data goes next. That's what makes it genuinely "edge" rather than just a rebranded ingestion endpoint: collect closer to the interaction, standardize the data once, and intelligently route it to the systems that need it.

## A simple example

A customer views a product page on your site. Your page sends a single XDM-formatted event to the Edge Network. Based on the datastream configuration, that one event might simultaneously update the customer's profile in RTCDP, feed a real-time trigger in AJO, and land in Analytics and CJA for reporting — all from one call, with no separate integration work needed for each downstream product.

## Where to start

Understanding this architecture is far more valuable than just knowing where to click in the UI, and it's foundational to how AEP, RTCDP, and AJO actually work together. We cover datastreams, XDM, and the Edge Network as part of the data foundations in our [RTCDP course](/courses/rtcdp), before moving into audience building and activation.

Have questions about how this fits into your existing tagging or CDP setup? [Reach out](/contact) — happy to walk through it.
