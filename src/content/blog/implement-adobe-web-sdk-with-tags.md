---
title: "Implement Adobe Web SDK with Tags"
slug: "implement-adobe-web-sdk-with-tags"
description: "A practical guide to implementing Adobe Experience Platform Web SDK with Tags, including datastreams, XDM mapping, consent, testing, and rollout."
author: "Gaurav Agarwal"
publishDate: 2026-09-18
tags: ["AEP", "Web SDK", "Tags"]
featured: false
faqs:
  - question: "What is Adobe Experience Platform Web SDK?"
    answer: "Adobe Experience Platform Web SDK is a browser library that sends data to Adobe Experience Platform Edge Network for supported Adobe applications. It provides a unified collection approach through the alloy.js library."
  - question: "Do I need Adobe Tags to use Web SDK?"
    answer: "No. Web SDK can be implemented directly with JavaScript, but Adobe Tags provides extension configuration, rule management, environments, publishing workflows, and reusable data elements that many teams prefer."
  - question: "Can Web SDK send both XDM and non-XDM data?"
    answer: "Yes. The sendEvent command can include an xdm object and a data object. Use xdm for fields modeled by the selected schema and data for solution-specific or unmapped values supported by the receiving service."
---

To implement Adobe Experience Platform Web SDK with Tags, configure a datastream, install the Adobe Experience Platform Web SDK extension in a Tags property, map your site data into XDM, and send events through rules. The implementation is successful only when identities, consent, environment separation, and downstream datasets are verified, not merely when a network request returns successfully.

Web SDK uses the `alloy.js` library and sends data to Adobe Experience Platform Edge Network. A datastream then determines which Adobe services receive that data. This consolidates collection, but it does not remove the need for a deliberate data contract.

## Prepare the data design first

List the interactions and attributes required by analytics, personalization, audiences, and journeys. Define their names, types, allowed values, and business meaning. Map them to standard XDM fields where suitable and use a governed custom field group only when the standard model does not fit.

Decide which identifiers are available before and after authentication. ECID commonly supports anonymous browser interactions. Authenticated identifiers should use the correct identity namespace and authentication state. Never send an email, account number, or other value under a namespace merely because the mapping is convenient.

Create or select an ExperienceEvent schema and dataset for the intended sandbox. If the data should contribute to Real-Time Customer Profile, enable the schema and dataset deliberately after checking identity design and event volume.

## Configure the datastream

Create separate datastreams or environment configurations for development, staging, and production. Select the relevant AEP sandbox, event schema, and services. Record the datastream ID for the Tags extension.

A datastream is routing configuration, not a schema mapper. It can direct an event to Adobe Experience Platform, Analytics, Target, or other supported services, but the payload still needs correct XDM and solution-specific fields. The [Edge Network explainer](/blog/adobe-experience-platform-edge-network-explained) provides more context on this collection path.

When a global site has regional data boundaries, route data according to approved architecture and service configuration. Do not infer that edge collection eliminates residency, consent, or contractual requirements. Coordinate datastream and sandbox ownership with regional governance teams.

## Install and configure the Tags extension

In the Tags property, install the Adobe Experience Platform Web SDK extension. Configure the organization and datastream values for each Tags environment. Set identity migration options only after reviewing any existing Experience Cloud ID implementation.

Choose how consent should behave before the first event. A default consent setting must reflect the site's consent model, and consent updates should be sent when the visitor makes or changes a choice. Do not rely on a tag-manager rule order as the only privacy control; test what requests occur before and after each consent state.

Create data elements for reusable values such as page name, language, country context, authentication state, and product details. Keep the site data layer stable and business-oriented. Rules should map that contract to XDM rather than scraping presentation text or relying on fragile CSS selectors.

## Send the first event

Create a rule for the initial page interaction. Add a Web SDK action that sends an event and provide an XDM object matching the configured schema. Include an event type appropriate to the interaction and a web page details structure with consistent naming.

For commerce and other interactions, create focused rules that reuse data elements. Avoid sending every available data-layer property on every event. Smaller, intentional payloads are easier to govern and troubleshoot.

If personalization is enabled, decide whether the page event should request propositions and how rendering is handled. Prevent visible content changes and duplicate display notifications by following one tested rendering pattern across templates.

## Test beyond the browser request

Use the Tags development library and browser debugging tools to confirm that the extension loads once, consent behaves correctly, and each interaction sends one expected event. Inspect the request payload, datastream ID, XDM paths, identity map, response, and any validation messages.

Then validate downstream. Confirm records arrive in the intended dataset, fields have the expected types, identities appear under the right namespaces, and timestamps and event types are usable. A `200` response proves the edge accepted a request; it does not prove the data landed in the right place or can support an audience.

Test navigation patterns, single-page application route changes, repeated clicks, authentication transitions, opt-out, and slow network conditions. Compare key metrics with the existing implementation during a controlled rollout before removing legacy libraries.

## Publish and operate

Promote the Tags library through development, staging, and production with approvals appropriate to the organization. Keep environment-specific IDs out of copied rule logic. After release, monitor ingestion, schema errors, event volume, and important field completeness.

For multilingual or multi-domain sites, use the same governed event vocabulary where business meaning is shared. Language and market should be explicit data values, not separate ad hoc implementations. Split properties or datastreams when ownership, regulation, or release cadence requires it, not simply because URLs differ.

The [RTCDP course](/courses/rtcdp/) covers how collected events become profiles and audiences. For help reviewing an XDM contract, consent sequence, or migration plan before production, [contact us](/contact/).