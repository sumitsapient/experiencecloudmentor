---
title: "Adobe Target Activities with Web SDK"
slug: "adobe-target-activities-with-web-sdk"
description: "Implement Adobe Target activities with Experience Platform Web SDK using datastreams, decision scopes, propositions, rendering, and notifications."
author: "Gaurav Agarwal"
publishDate: 2026-08-02
tags: ["Adobe Target", "Web SDK", "Personalization"]
featured: false
faqs:
  - question: "Can Adobe Target run through Experience Platform Web SDK?"
    answer: "Yes. A datastream can enable Adobe Target, and Web SDK can request and render personalization while sending the identities, parameters, and notification events required by the implementation."
  - question: "What replaces an mbox in a Web SDK Target implementation?"
    answer: "Web SDK requests use decision scopes and page-wide personalization patterns. Existing Target concepts still matter, but the request and response travel through Edge Network propositions rather than a direct at.js request."
  - question: "Why does a Target activity work with at.js but not Web SDK?"
    answer: "Check datastream Target enablement, identity migration, decision scopes, parameters, response handling, rendering mode, and display notifications. The two libraries do not have identical request contracts."
---

Adobe Target activities can run through Experience Platform Web SDK when the datastream, identity, personalization request, proposition rendering, and display notifications are designed as one flow. Enabling Target in a datastream is necessary, but it does not by itself reproduce every behavior of an at.js implementation.

Map each activity to the page or application decision point that requests it, then verify the full request and response in the browser.

## Configure the Edge path first

Create or identify the datastream used by the site and enable Adobe Target with the appropriate property token and environment settings where required. Keep development, staging, and production mappings explicit. A development site pointing to a production datastream can create misleading qualification and reporting.

Configure Web SDK with the intended datastream ID and organization ID. The [Web SDK implementation guide](/blog/implement-adobe-web-sdk-with-tags/) covers the collection foundation, while the [datastream guide](/blog/configure-aep-datastream-step-by-step/) explains service routing.

Decide how legacy visitor identity will transition. If the site previously used at.js, preserve the supported identity continuity during migration and test returning as well as new visitors.

## Request the correct personalization

For page-wide personalization, make the initial request early enough to avoid visible content replacement and include the required personalization options. For named locations or application components, request the decision scopes that correspond to the activity design.

Pass Target parameters, profile parameters, and contextual values through the supported Web SDK request structure. Standardize names and data types. A numeric value sent as a formatted string can change audience evaluation, and a parameter attached to a later event cannot qualify an earlier decision.

Single-page applications need an explicit view strategy. Define when a route change sends a view, when propositions are requested, and how repeat rendering is prevented. Avoid tying personalization only to full page loads.

## Choose automatic or manual rendering

Automatic rendering is useful for supported visual experiences where Web SDK can apply the returned proposition. Manual rendering gives the application control over component content, loading states, and frameworks but also makes the application responsible for interpreting propositions safely.

For manual rendering, validate scope, schema, and content before applying it. Keep a deterministic default experience and avoid injecting untrusted markup. Ensure personalization does not break accessibility, layout stability, or application state.

Use prehiding carefully. It can reduce flicker, but an overly broad or slow prehide can leave the page blank when a request fails. Limit the affected area and define timeout behavior.

## Record display and interaction notifications

Target reporting depends on knowing that a proposition was displayed, not merely returned. Automatic rendering can manage supported notification behavior; manual implementations must send the appropriate display event with proposition metadata after the experience is actually shown.

Do not count hidden, discarded, or off-route content as displayed. For clicks and conversions, define whether Target metrics come from proposition interactions, Web SDK events, Analytics integration, or another approved source. Test attribution before launching.

Activity QA should cover qualification, experience allocation, default content, response token requirements, display notification, conversion, and reporting. Debug one known visitor and preserve request IDs so browser evidence can be compared with Target configuration.

## Plan migration and regional rollout

Do not load at.js and Web SDK personalization against the same surface without a deliberate coexistence design. Duplicate requests can produce competing experiences and unclear reporting. Migrate by page, scope, or application boundary with ownership and rollback criteria.

For global sites, align locale, market, consent, and property boundaries. Targeting based on language should use the site’s agreed locale rather than inferred country alone. Confirm that consent choices control personalization and data collection as required in each implementation.

## Operate the implementation after launch

Monitor Edge request failures, proposition volume, rendering errors, prehide timeouts, and notification gaps using the organization’s own baselines. Assign ownership across tag management, application code, Target configuration, and datastream services so incidents do not bounce between teams.

Record SDK, datastream, activity, and application releases on a shared timeline. This history helps distinguish an activity edit from a collection or frontend deployment.

Include a tested rollback path for both tag configuration and application rendering code.

Use the [Experience Platform Debugger troubleshooting guide](/blog/web-sdk-debugging-adobe-experience-platform-debugger/) when requests or propositions are missing. For Target-specific implementation and activity design, see the [Adobe Target course](/courses/adobe-target/). [Contact us](/contact/) for a migration or activity review.