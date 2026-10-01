---
title: "Web SDK Debugging with Adobe Experience Platform Debugger"
slug: "web-sdk-debugging-adobe-experience-platform-debugger"
description: "Debug Adobe Experience Platform Web SDK using Experience Platform Debugger, browser network tools, datastream validation, and request IDs."
author: "Gaurav Agarwal"
publishDate: 2026-09-26
tags: ["Web SDK", "AEP", "Troubleshooting"]
featured: false
faqs:
  - question: "What can Adobe Experience Platform Debugger inspect?"
    answer: "It can help identify Adobe technologies on a page, inspect implementation configuration, review events and requests, and support debugging workflows alongside browser developer tools. Available views depend on the implementation and extension version."
  - question: "How do I know which datastream Web SDK is using?"
    answer: "Inspect the Web SDK configuration and Edge request details, then compare the datastream ID and environment with the intended deployment. Do not infer it only from the site hostname."
  - question: "Why is a Web SDK request successful but data missing downstream?"
    answer: "Edge acceptance is only one boundary. Check payload paths and types, identity and consent, datastream service enablement, dataset mapping, governance, and product-specific processing using the request ID."
---

Debug Web SDK by preserving one request and following it from browser command to Edge response and configured downstream services. Adobe Experience Platform Debugger accelerates inspection, but browser network tools, the datastream configuration, and product monitoring provide the evidence needed to locate the failing boundary.

Before testing, record the page URL, environment, time, expected event, consent state, identity state, and intended datastream.

## Confirm the implementation loaded

Use Experience Platform Debugger to identify the Adobe technologies present and inspect Web SDK configuration. Verify the organization and datastream identifiers against the environment inventory. Development, staging, and production should not depend on engineers recognizing IDs from memory.

Check the browser console for initialization and command errors. A tag container can load while the Web SDK extension, rule, or custom initialization fails. Also inspect content security policy, blocked scripts, privacy extensions, and consent manager timing.

If Adobe Tags is used, understand which property version and environment library the page loaded. A recently published change may not be present on the host being tested.

## Capture the Edge request

Open browser network tools before reproducing the action. Preserve the log for navigation and filter for Adobe Edge requests. Inspect the request payload, response, status, timing, and request identifiers. Debugger views can make fields easier to read, while the raw network record remains useful for escalation.

Confirm the event type, XDM paths, `data` payload, identity map, timestamps, personalization options, and consent command sequence. Compare observed values to the schema and implementation contract. A `200` response does not prove that every downstream service accepted every field.

Avoid repeatedly clicking during capture. Generate one uniquely identifiable action so duplicate rules and retries are visible.

## Validate identity and consent

Inspect ECID and authenticated identities before and after login. Check namespaces, values, primary designation where relevant, and whether identity changes occur before the event that depends on them. Shared devices and logout need explicit tests.

Review default consent and update commands. Determine whether events are sent, queued, or discarded while consent is unresolved or denied. Test only states authorized for the environment; do not bypass a production consent experience for convenience.

For regional deployments, compare consent category mapping and tag rules across domains. The technical event name may be shared while the permitted processing differs by market.

## Follow datastream routing

Open the datastream referenced by the request and verify its environment-specific configuration. Confirm which services are enabled, such as Adobe Analytics, Adobe Target, and Experience Platform, and inspect their identifiers and dataset settings.

Use [Configure an AEP Datastream Step by Step](/blog/configure-aep-datastream-step-by-step/) as the baseline. A request can reach Edge correctly while being routed to the wrong report suite, dataset, or Target property.

If data is missing from AEP, inspect schema compatibility, dataset enablement, ingestion monitoring, and profile settings. If Target personalization is missing, check decision scopes and propositions using [Adobe Target activities with Web SDK](/blog/adobe-target-activities-with-web-sdk/).

## Separate collection from application behavior

For automatic personalization, verify the response and resulting DOM change. For manual propositions, confirm the application consumes the correct scope and sends display notifications. For analytics, compare the event payload with processing rules and expected dimensions rather than assuming a network event equals a report row.

Single-page applications require tests for initial load and route changes. Watch for duplicate events, stale page names, events sent before route state settles, and personalization applied after a user navigates away.

Export or securely record the minimum evidence needed: timestamp, request ID, datastream ID, event type, non-sensitive payload excerpt, response status, and failing downstream boundary. Redact identities and customer data before sharing logs.

## Turn evidence into regression tests

Once the cause is known, add a repeatable check at the owning boundary. Cover tag changes with environment QA, application events with browser assertions, schemas with payload validation, and routing with deployment checklists. Mark test events clearly and exclude them from business reporting where the approved design supports it.

Maintain an environment inventory containing site, tag property, SDK version, organization, datastream, sandbox, dataset, report suite, and Target property. This removes guesswork during regional incidents.

The [Adobe Target course](/courses/adobe-target/) covers Web SDK delivery in the Target context, and the [AJO course](/courses/ajo/) covers Edge-triggered journey use cases. For implementation diagnostics across Adobe services, [contact us](/contact/).