---
title: "What Happens When a Customer Asks AEP to Delete Their Data?"
slug: "adobe-experience-platform-privacy-service-explained"
description: "A practical look at how Adobe Experience Platform Privacy Service orchestrates access and deletion requests across RTCDP, AJO, Analytics, Target, and more."
author: "Gaurav Agarwal"
publishDate: 2026-09-15
tags: ["AEP", "Privacy Service", "GDPR", "RTCDP"]
featured: false
---

You built a 360° view of the customer. But what happens when that customer says "show me the data you have about me" — or, even more importantly, "delete my personal data"? This is where **Adobe Experience Platform Privacy Service** becomes extremely important, and it's a part of the platform that's easy to overlook when you're focused on personalization.

## Think of it like a single request that fans out

Modern enterprises rarely keep customer data in one place. The same individual may have data spread across Adobe Experience Platform, AJO, Analytics, Target, Campaign, Marketo Engage, and other supported Adobe solutions. Now imagine trying to manually track down and process one person's data across that entire ecosystem, product by product. Privacy Service exists so nobody has to do that by hand — a single request fans out to every connected product automatically.

## What Privacy Service actually does

Privacy Service helps orchestrate that whole process. A privacy request can:

- **Identify the data subject** using supported identity namespaces (email, CRMID, ECID, and others).
- **Specify which Adobe products are in scope** for the request — you don't have to process every product every time.
- **Initiate privacy jobs** for actions like access (returning what data exists) or deletion (removing it).

The flow looks roughly like this: a customer submits a privacy request → the system identifies the data subject using their known identities → Privacy Service orchestrates that request → the relevant Adobe products act on it and report back.

## Why this can't be an afterthought

This becomes especially important under regulations like GDPR, CCPA, and other global privacy laws, where individuals have real rights over their personal data — including the right of access and, under applicable circumstances, the right to deletion. For organizations running large MarTech ecosystems, consistently and correctly fulfilling these requests at scale is a serious governance challenge, not a checkbox exercise.

The more powerful your customer profile becomes — the more sources feed into it, the more products act on it — the more important your privacy architecture becomes too. A rich, unified profile that can't be reliably queried or purged on request is a liability, not just a feature.

## A simple example

Say a customer emails support asking for their data to be deleted under GDPR. Without Privacy Service, someone on your team would need to manually check AEP, RTCDP segments, AJO journey history, Analytics reports, Target activities, and any other connected product — one by one — hoping nothing gets missed. With Privacy Service, that same request is submitted once, the data subject is identified across all their known identities, and the deletion job is orchestrated across every in-scope product automatically, with a record of what happened.

## Where to start

Privacy and governance come up constantly in real RTCDP implementations, which is why we cover identity resolution alongside privacy fundamentals in our [RTCDP course](/courses/rtcdp) — understanding how to collect and unify data means nothing if you can't also govern, protect, and delete it when required.

Not sure how privacy requests fit into your current AEP setup? [Get in touch](/contact) and we can talk through it.
