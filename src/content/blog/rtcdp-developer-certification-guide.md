---
title: "How to Pass the Adobe Real-Time CDP Developer Certification"
slug: "rtcdp-developer-certification-guide"
description: "What the Real-Time CDP Developer Expert exam actually tests, how the modules are weighted, and a realistic study plan to pass it."
author: "Gaurav Agarwal"
publishDate: 2026-09-22
tags: ["RTCDP", "Certification", "AEP"]
featured: false
---

The Real-Time CDP Developer certification (currently the Real-Time CDP Developer Expert exam, listed as AD0-E605 on Adobe's certification portal — exam codes shift over time, so always check the current version before you book) trips people up for a very specific reason: it's designed for developers with 1–3 years of hands-on RTCDP experience, and it shows. Documentation alone doesn't cut it.

## Think of it like an exam about plumbing, not decoration

A lot of RTCDP learning content focuses on the audience-builder UI — the visible, "decorative" layer. This exam is much more interested in the plumbing underneath: how data is modeled, how identities resolve, how a profile actually gets assembled behind the scenes. If your hands-on experience is mostly point-and-click audience building, that's the gap to close first.

## How the exam is actually weighted

Based on the current published exam guide, the domains break down roughly as follows:

- **Data Architecture (~19%)** — translating relational (RDBMS) data models into Adobe's schema/XDM approach, modeling the Real-Time Customer Profile correctly, and designing identity strategy and relationships between namespaces.
- **Segmentation (~18%)** — the different ways to build audiences within RTCDP, and the segmentation types (streaming vs. batch) and how each actually operates.
- **Real-Time Customer Profile (~15%)** — including the distinction between edge and hub profile, which trips up a surprising number of otherwise-strong candidates.
- **Data Ingestion (~13%)** — how data actually gets into the platform, across batch and streaming sources.
- The remaining questions cover governance, destinations and data export formats, Edge Network, Adobe I/O, and Query Service.

A passing score is 48 out of 68 questions — which means you have real room for a few weak spots, but not for skipping entire domains.

## A study plan that matches the weighting

**Start with identity and data architecture.** Since it's the single largest domain, spend real time on identity graphs, namespace priority, and how RDBMS thinking needs to change when you move to XDM and the Real-Time Customer Profile.

**Get hands-on with both segmentation types.** Don't just read about streaming vs. batch segmentation — build both, and notice where the operational differences actually show up (latency, how they're evaluated, what triggers them).

**Don't skip edge vs. hub profile.** It's a smaller domain by percentage, but it's conceptually dense and disproportionately easy to get wrong under exam conditions if you've only worked with one deployment pattern.

**Round out with governance and destinations.** These get less study time than they deserve because they feel like "configuration," not "development" — but they're squarely in scope.

## The mistake that costs people the most

Treating RTCDP as "the audience-builder tool" rather than a full data platform. The exam is written by people who know the difference, and it's built to expose exactly that gap.

## Where to start

Our [RTCDP course](/courses/rtcdp) is built around the platform's actual architecture — identity resolution, schema design, both segmentation types, and activation — not just the UI layer, which maps directly onto how this exam is weighted.

Studying for this exam and want to sanity-check where your gaps are? [Reach out](/contact) — happy to help.
