---
title: "AJO Journey Entry and Re-entry Rules"
slug: "ajo-journey-entry-and-re-entry-rules"
description: "Configure Adobe Journey Optimizer journey entry, re-entry, identity, timeout, and duplicate-event controls without creating repeated customer messages."
author: "Gaurav Agarwal"
publishDate: 2026-09-05
tags: ["AJO", "Journeys", "Architecture"]
featured: false
faqs:
  - question: "Can a profile enter the same AJO journey more than once?"
    answer: "Yes, when re-entry is enabled and the configured waiting period and journey conditions allow it. The exact behavior also depends on whether the journey is unitary, audience-based, or triggered by a business event."
  - question: "How do I prevent duplicate journey entries?"
    answer: "Use a stable identity, define event deduplication upstream, configure re-entry and its waiting period deliberately, and add business eligibility checks where repeated source events are possible."
  - question: "Does changing a live journey change profiles already inside it?"
    answer: "Journey versioning and publication state determine how changes are applied. Treat each published version as an operational release and test how new entrants and profiles already progressing through the journey are handled."
---

An AJO entry rule should describe one business moment for one resolvable identity, while re-entry should describe when repeating that moment is genuinely useful. Leaving either decision implicit is how duplicate events become duplicate messages and long-running journeys block customers from valid future experiences.

Choose the journey type, entry event, identity, re-entry policy, and exit behavior together. They form one control system.

## Match the entry type to the business trigger

Use a unitary event journey when one person performs an action such as abandoning a cart, submitting an application, or changing a preference. The event must carry an identity that AJO can resolve and the fields needed for immediate conditions or personalization.

Use audience qualification when entry should follow a profile becoming a member of an audience. Confirm whether the audience is evaluated in batch, streaming, or at the edge; the journey cannot react faster than its qualification path. The [audience evaluation methods guide](/blog/rtcdp-audience-evaluation-methods-batch-streaming-edge/) explains those timing differences.

A business event represents a broader occurrence, such as a flight disruption or venue closure, that may affect many profiles. Do not model a person-level action as a business event simply to simplify payload handling.

## Define the identity contract

Write down the identity namespace and source field before configuring the journey. The same email address represented in different namespaces is not automatically the same entry key. Event producers, schemas, datastreams, and journey configuration must agree.

Prefer a durable person identifier where the use case requires continuity across devices. Device identities may be appropriate for anonymous experiences but can create separate journey instances before identity stitching occurs. If profiles are unexpectedly split or combined, solve the identity design rather than adding journey conditions that hide it.

Include a source event identifier and event timestamp. AJO entry controls are not a replacement for producer-side idempotency. Retries, queue replay, and duplicate mobile events should be detectable before they cause communication.

## Decide whether re-entry represents value

Enable re-entry when the business moment can validly recur: a new order, a new service case, or a fresh abandonment after the previous one has ended. Disable it for one-time onboarding, a single contractual notice, or a lifecycle milestone that should happen once.

The re-entry waiting period should reflect the customer promise, not a convenient technical default. A retail reminder might permit another entry after a short interval, while a renewal sequence may need months. Add channel pressure and suppression rules outside the journey where they must apply across campaigns.

Consider concurrent instances. If a customer can have two active orders, a profile-level journey may need event attributes or correlation identifiers to keep the contexts distinct. Otherwise, a second order can be ignored, merged conceptually with the first, or produce confusing personalization.

## Control completion and timeouts

A profile remains in a journey while it waits, evaluates conditions, or attempts actions. Define explicit exits for conversion, cancellation, loss of consent, and other states that make further communication inappropriate. Journey timeout provides a final boundary but should not be the primary business exit.

Review maximum wait durations and the total journey duration. A profile still inside an old instance may be ineligible to re-enter, depending on configuration. Long waits also increase the chance that profile attributes, permissions, and regional status change before the next action.

Recheck consent immediately before channel actions where appropriate. Entry-time permission does not guarantee send-time permission.

## Test entry as a state machine

Build test cases for first entry, duplicate event, second valid event, re-entry before and after the waiting period, conversion during a wait, consent withdrawal, timeout, and an unresolvable identity. Include events arriving out of order and near timezone boundaries.

For each case, record the event ID, profile identity, journey version, entry timestamp, current step, and exit reason. When a journey does not start, the [AJO journey troubleshooting guide](/blog/ajo-journey-not-triggering-troubleshooting/) provides a boundary-by-boundary diagnostic path.

Global teams should agree on whether cooldowns are elapsed durations or market calendar periods. “Once per day” can mean one rolling 24-hour window, one UTC day, or one local day. Encode the chosen rule consistently and document ownership for regional exceptions.

Learn the complete orchestration workflow in the [AJO course](/courses/ajo/). For help reviewing entry controls and duplicate-message risk, [contact us](/contact/).
