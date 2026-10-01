---
title: "Adobe Target Activity Not Displaying: Troubleshooting"
slug: "adobe-target-activity-not-displaying-troubleshooting"
description: "Troubleshoot Adobe Target activities that do not display by tracing activity state, requests, qualification, propositions, rendering, and collisions."
author: "Gaurav Agarwal"
publishDate: 2026-08-03
tags: ["Adobe Target", "Troubleshooting", "Personalization"]
featured: false
faqs:
  - question: "Why is my Adobe Target activity not showing?"
    answer: "Check activity approval and dates, URL or scope rules, audience qualification, workspace and property access, delivery requests, response propositions, rendering, and competing activities in that order."
  - question: "Why can I see a Target activity in QA mode but not normally?"
    answer: "QA mode can force activity or experience context that ordinary delivery still evaluates. Verify live audience qualification, allocation, identity, activity status, and whether QA parameters or cookies remain active."
  - question: "Can consent prevent an Adobe Target activity from displaying?"
    answer: "Yes. If the implementation does not request personalization until the required consent state is available, denied or unresolved consent can intentionally prevent the delivery request."
---

When an Adobe Target activity does not display, identify the last successful boundary: active configuration, browser request, Target qualification, returned experience, or page rendering. This distinction turns “Target is broken” into a testable finding.

Use one browser session and record the URL, time, visitor identity state, activity and experience, request ID, and expected content. Clear only the state necessary for the test; indiscriminate cookie deletion can hide continuity problems.

## Verify the activity can deliver

Confirm the activity is approved or active, its start and end dates include the test time, and traffic allocation is nonzero. Check the activity workspace, property restrictions, environment, and host. A valid activity in one workspace may not be eligible for a property-bound request from another site.

Review page delivery or URL rules using the exact live URL, including protocol, hostname, path, query behavior, and single-page application route. Preview URLs and production URLs often differ in a meaningful way.

Check whether another activity or exclusion rule competes for the same location. Do not assume priority without reviewing the applicable collision settings and audience overlap.

## Prove a delivery request was sent

Inspect browser network activity. For at.js, locate the relevant Target delivery request. For Web SDK, inspect the Edge request, personalization options, decision scopes, and response propositions using the [Web SDK debugging guide](/blog/web-sdk-debugging-adobe-experience-platform-debugger/).

If no request exists, inspect library loading, tag rule conditions, consent gating, JavaScript errors, content security policy, ad blockers, and route-change logic. Verify that the page uses the expected organization, datastream or client code, and property token.

A request sent after the target component has been removed or after another application render can succeed without producing visible content. Record timing as well as payload.

## Check audience qualification

Compare the actual request and profile values with every audience rule. Verify parameter names, capitalization, data types, referrer and URL assumptions, geographic interpretation, device conditions, and profile attributes. For reusable calculations, follow the [profile scripts and attributes guide](/blog/adobe-target-profile-scripts-and-attributes/).

Test a control visitor that should qualify and one that should not. Existing profile state can influence results, so distinguish a new visitor from a known authenticated profile. Audience qualification shown by QA tooling does not prove the same visitor qualifies outside QA mode.

For Analytics audiences or shared audiences, account for provisioning and qualification timing. Do not expect every upstream segment to behave as a request-time rule.

## Inspect the response and rendering

If the response contains no expected proposition or offer, focus on activity matching, audience, allocation, and collision. If it contains the correct content, focus on the page.

Automatic rendering can fail when selectors no longer match, the component renders later, or a framework replaces the modified DOM. Manual rendering can fail when the application ignores a scope, rejects a schema, uses stale state, or never applies the returned content.

Check the console for errors, observe DOM changes, and confirm that CSS does not hide the experience. Ensure prehiding is removed on success, error, and timeout. The default experience should remain usable when personalization fails.

## Validate measurement after display

Seeing content is not the final check. Confirm display notifications, clicks, conversions, and reporting use the intended activity and experience. A manual Web SDK implementation may return and render a proposition without recording that it was displayed.

Single-page applications need route-specific tests for forward navigation, back navigation, component remount, and repeated views. Prevent stale experiences from surviving into an ineligible route.

Global sites should test consent states, locales, market domains, translated paths, and regional tag configurations. Share a diagnostic record across teams so a local configuration difference is visible rather than “fixed” by cloning the activity.

After restoring delivery, reproduce the failure in a controlled environment and add a regression case. Record whether the defect belonged to activity configuration, audience data, identity, collection, Edge delivery, or frontend rendering. This classification directs monitoring and prevents the same symptom from producing a different workaround in each region.

Retest the default experience as well as every changed experience, because a fix for one branch can alter selector timing, prehiding, or measurement elsewhere.

The [Adobe Target course](/courses/adobe-target/) covers activity setup, audiences, delivery, and reporting. For Web SDK architecture, read [Adobe Target activities with Web SDK](/blog/adobe-target-activities-with-web-sdk/), or [contact us](/contact/) for help with a persistent delivery issue.
