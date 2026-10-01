---
title: "AJO Journey Not Triggering: Troubleshooting Guide"
slug: "ajo-journey-not-triggering-troubleshooting"
description: "Troubleshoot Adobe Journey Optimizer journeys that do not start by tracing events, identity, audiences, entry rules, versions, and profile eligibility."
author: "Gaurav Agarwal"
publishDate: 2026-09-08
tags: ["AJO", "Journeys", "Troubleshooting"]
featured: false
faqs:
  - question: "Why is my AJO journey not triggering after an event?"
    answer: "The event may not have reached the configured event definition, its identity may not resolve, the journey may not be live, or re-entry and qualification rules may block the profile. Trace one event ID through each boundary."
  - question: "Can an AJO test event trigger a published journey?"
    answer: "Use the supported test-mode workflow and payload for the journey rather than assuming any synthetic event will enter production. Confirm the event definition, identity namespace, and test profile behavior."
  - question: "Why did one profile enter an AJO journey but another did not?"
    answer: "Compare identity, event payload, audience membership, consent, profile attributes, active journey instances, re-entry timing, and event arrival time. A profile-level comparison is more useful than aggregate counts."
---

When an AJO journey does not trigger, trace one expected entry from source to journey instead of editing the journey first. Capture the profile identity, source event ID or audience qualification time, journey ID and version, expected entry time, and the evidence that the business condition occurred.

The fault will normally sit at one boundary: the source did not send, Experience Platform did not ingest, identity did not resolve, qualification did not occur, or the live journey rejected entry.

## Confirm the journey can accept entries

Verify that the intended journey version is published and within its operating window. Check that it has not been stopped, closed to new entrances, completed, or replaced by a newer version. Draft and test versions do not behave like the published version.

Review the entry type. A unitary event journey listens for its configured event, an audience journey depends on qualification or scheduled audience read, and a business-event journey follows a different pattern. Sending a person-level event cannot trigger a journey configured to read an audience.

Check re-entry settings and journey timeout. A profile already inside the journey may be blocked, as may a profile that exited too recently for the configured waiting period. The [entry and re-entry guide](/blog/ajo-journey-entry-and-re-entry-rules/) covers these controls in detail.

## Trace a unitary event

Start at the event producer. Confirm it sent the event once, received the expected ingestion response, and used the schema and datastream intended for this environment. Record the event ID and timestamp rather than relying on a screenshot of the source action.

Compare the actual payload with the event definition. Check event type, field paths, data types, required values, identity map, namespace, primary flag where applicable, and timestamp format. A payload can be valid JSON yet fail the journey contract.

Inspect whether the event reached the expected dataset or monitoring view. Account for processing time, but do not keep resending while investigating; repeated test events can create several journey instances once the original issue is resolved.

If collection uses Web SDK, verify the event in the browser and datastream path using the [Web SDK debugging guide](/blog/web-sdk-debugging-adobe-experience-platform-debugger/).

## Verify identity and profile context

The journey needs the identity specified by its event configuration. Confirm the payload uses the exact namespace and value expected. Case changes, whitespace, hashing differences, or using email in a custom namespace can prevent resolution.

Then inspect the profile under the merge policy relevant to the journey. Verify attributes used by entry filters and early conditions. If the profile is absent or stale, use the [profile ingestion troubleshooting guide](/blog/aep-profile-not-appearing-after-ingestion/) before changing journey logic.

Do not assume an event will instantly update every profile attribute used by the next condition. Understand whether the condition reads event context or a persisted profile value and test that timing explicitly.

## Trace audience-based entry

For audience journeys, confirm the profile qualified for the correct audience and note when. Check its merge policy, evaluation method, schedule, and whether entry occurs on qualification, a scheduled read, or another configured behavior.

A profile already in the audience before the journey begins may be treated differently from one that newly qualifies. Read the journey configuration rather than inferring behavior from the current audience count. The [audience population mismatch guide](/blog/aep-audience-population-mismatch/) helps distinguish estimated, qualified, and activated populations.

Test the audience rule against the profile’s actual events and attributes, including lookback windows and timezone boundaries. An analytics report showing an action does not prove that the merged profile meets the audience definition.

## Check conditions, caps, and exits

If entry occurred but no message followed, the problem is downstream of triggering. Inspect journey step status, condition branches, wait expiration, action errors, consent, channel suppression, and exit criteria. Separate “did not enter” from “entered but did not reach the action.”

Global implementations should compare environment, sandbox, datastream, namespace, and timezone across regional teams. A US test succeeding does not validate an EU source using another consent policy or an India implementation sending a different identity namespace.

Create a small diagnostic table with expected value, observed value, owner, and timestamp for every boundary. That evidence supports a durable fix and avoids speculative republishing.

The [AJO course](/courses/ajo/) covers journey setup and diagnostics end to end. For help isolating a production entry failure, [contact us](/contact/).
