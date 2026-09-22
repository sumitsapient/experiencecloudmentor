---
title: "Why the Same Browser Doesn't Always Mean the Same Customer in AEP"
slug: "identity-stitching-shared-devices-aep"
description: "John logs in, then Jane, then John again — same browser, same ECID. Here's how Adobe Experience Platform's identity graph avoids collapsing them into one person."
author: "Gaurav Agarwal"
publishDate: 2026-09-19
tags: ["AEP", "RTCDP", "AJO"]
featured: false
---

John logs in on a shared laptop. Later, Jane logs in on the same browser. Then John logs back in. Same laptop, same browser, same ECID (Experience Cloud ID) the whole time. So whose profile does Adobe Experience Platform associate that browser with? This is a classic shared-device identity problem, and it's one of the trickiest things to reason about when you're building an identity strategy in AEP.

## Think of it like a hotel room key

An ECID behaves a bit like a hotel room key card — it identifies the room (the browser), not the guest. Whoever checks in last is the one the key is currently associated with. But a well-run hotel still keeps separate guest records behind the scenes; it doesn't merge every guest who ever used Room 111 into a single "Room 111 customer." AEP's identity graph needs to do the same thing: track the device-level identifier without letting it drag unrelated people into the same profile.

## What actually happens without the right controls

When John first authenticates on the shared browser, AEP can establish a link:

**John's CRMID ↔ ECID 111**

Then Jane authenticates on the same browser:

**Jane's CRMID ↔ ECID 111**

Without the right identity controls, the same ECID connecting to two different person identifiers can contribute to *graph collapse* — the system starts to treat data that actually belongs to two different people as if it belongs to one. That's a serious problem for personalization: John might start seeing Jane's product recommendations, or worse, a journey triggered by Jane's behavior might target John instead.

## How AEP prevents it: identity graph linking rules

This is where **Identity Graph Linking Rules** become important. By defining a person identifier — such as CRMID — as unique per graph, and by configuring namespace priorities, AEP's Identity Optimization Algorithm can recognize the shared-device scenario and stop John and Jane from collapsing into the same identity graph. Each person identifier stays authoritative for their own graph, and the device-level identifier (ECID) is treated as exactly what it is: a hint about a device, not a guarantee about a person.

## The last-authenticated-user rule

Here's the interesting part: the shared ECID ends up associated with the *last authenticated user*. So in a sequence like John → Jane → John, the shared ECID ultimately becomes associated with John again. AEP removes the older conflicting association while authenticated events remain correctly tied to the person identifier that generated them. Anonymous events tied to the ECID — think pre-login browsing activity — can follow the last authenticated user, since there's no stronger signal available to tell them apart.

## Why this matters for personalization

This is why identity stitching isn't simply "same browser equals same customer." A good identity strategy has to understand people, devices, namespaces, identity priority, and shared-device behavior together — not any one of them in isolation. Get this wrong, and every downstream system that depends on the identity graph — audience segmentation in RTCDP, journey triggers in AJO, even basic reporting — inherits the mistake. Your personalization is only ever as accurate as the identity graph behind it.

## Where to start

If you're building or maintaining an identity strategy on Adobe Experience Platform, this concept — along with namespaces, identity priority, and profile merge policies — is core material in our [RTCDP course](/courses/rtcdp). Once profiles are stitched correctly, the [AJO course](/courses/ajo) covers how to safely act on them without misfiring on the wrong person.

Have a specific identity-resolution scenario you're wrestling with? [Reach out](/contact) — happy to walk through it.
