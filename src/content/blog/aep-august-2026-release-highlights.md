---
title: "AEP August 2026 Release: 7 Updates Worth Knowing About"
slug: "aep-august-2026-release-highlights"
description: "A breakdown of the most useful August 2026 Adobe Experience Platform release updates — dataset-level access control, on-demand audience runs, batch ingestion limits, and more."
author: "Gaurav Agarwal"
publishDate: 2026-09-04
tags: ["AEP", "RTCDP", "Product Updates"]
featured: false
---

Adobe Experience Platform just got some serious upgrades. The August 2026 AEP release isn't just a collection of minor feature updates — there are genuinely useful changes here for anyone working with AEP, Real-Time CDP, audiences, activation, governance, or data engineering.

## Think of it like a platform-wide tune-up, not a single new feature

Releases like this rarely revolve around one headline feature. Instead, they touch governance, performance, ingestion limits, and integrations all at once — which means the impact depends on which part of the platform you actually work in day to day. Here's what caught our attention.

## The updates that matter

**1. Dataset-level access control.** You can now apply access labels to an entire dataset, controlling which users and applications can read or write its data — a meaningful step toward simpler, stronger data governance for enterprise implementations.

**2. "Run Now" for audiences.** Instead of waiting for a scheduled evaluation, you can trigger evaluation for a specific audience on demand. Less waiting, more control.

**3. Activate audiences on demand.** AEP can now trigger an immediate resend of an audience's full current membership to supported streaming destinations — useful when a downstream system needs the latest audience state right away rather than waiting for the next qualification event.

**4. Batch segmentation gets more transparent.** Segmentation jobs can now show the percentage of the audience evaluated, making processing progress and activation planning far easier to reason about.

**5. Bigger batch ingestion limits.** Batch ingestion now supports up to 25,000 files per batch and 1 TB for regular batches — a welcome improvement for large-scale ingestion workloads.

**6. More Sources reach General Availability.** Braze, Capillary, Didomi, Shopify Streaming, Talon.One, and several others have moved from Beta to GA. Self-Serve Sources using the Streaming SDK are also now GA.

**7. Security keeps getting stronger.** Several source connectors now support TLS 1.3, and Amazon S3 assumed-role authentication adds External ID support using the Adobe Organization ID — alongside additional AEP health checks, B2B segmentation enhancements, destination improvements, mTLS certificate changes, and smarter B2B audience exports.

## A simple example

Say your team runs a flash sale and needs a segment refreshed immediately instead of waiting for its nightly schedule. Before this release, that meant waiting for the next scheduled evaluation window. With "Run Now" and on-demand activation, you can trigger the evaluation, then immediately resend the audience's full membership to your streaming destinations — turning what used to be a next-day fix into something you can do in the middle of the campaign.

## The bigger takeaway

AEP is steadily becoming less about simply collecting and activating customer data, and more about giving enterprises better control, observability, governance, security, and activation flexibility around that data. If you're learning AEP or RTCDP, don't just memorize where a feature sits in the UI. Ask what problem it solves, when you'd actually use it in a real implementation, and how it changes your architecture or activation strategy. That's where learning a platform turns into understanding one.

## Where to start

We fold release-driven changes like these into the governance and activation modules of our [RTCDP course](/courses/rtcdp), so you're learning the platform as it's actually used today, not a static snapshot of it.

Want to know how a specific update affects an implementation you're working on? [Get in touch](/contact) and we'll dig into it together.
