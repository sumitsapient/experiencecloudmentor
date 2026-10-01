---
title: "How to Build an AEM Component with Sling Models"
slug: "build-aem-component-sling-models"
description: "Build an AEM component step by step with a dialog, HTL, Sling Model, resource type, tests, policies, and common troubleshooting checks."
author: "Sumit Yadav"
publishDate: 2026-09-11
tags: ["AEM", "Sling Models", "Development"]
featured: false
faqs:
  - question: "Should business logic be written in HTL or a Sling Model?"
    answer: "Keep HTL focused on safe presentation. Put data adaptation, defaults, formatting decisions, and service calls in a Sling Model or service where they can be tested and reused."
  - question: "Why does a Sling Model return null in HTL?"
    answer: "Common causes include an incorrect adaptable, a resource type mismatch, missing model package registration, required injections that are absent, or using the wrong request or resource context."
  - question: "Can one Sling Model support multiple components?"
    answer: "Yes, but share a model only when the components have the same content contract and behavior. A broad model tied to unrelated resource types becomes difficult to evolve safely."
---

An AEM component needs a clear content contract, an authoring dialog, server-side adaptation, and accessible output. The cleanest pattern is to store author input as resource properties, adapt the component resource to a Sling Model, and render that model with HTL.

This example builds a simple promotional card with a title, description, and link. Package names and paths are illustrative; place them in the corresponding modules of your AEM Maven project.

## 1. Define the component

Create the component below `/apps/<project>/components/promo-card` with a `cq:Component` definition. Set a useful title, component group, and `sling:resourceSuperType` only when the component genuinely inherits behavior from a Core Component or project component.

Do not use inheritance merely to reuse markup. A resource supertype establishes a behavioral contract and can expose dialogs, policies, and scripts from the parent.

The dialog should persist stable names such as:

- `./title` for the heading;
- `./description` for body copy;
- `./link` for the destination;
- `./linkLabel` for meaningful link text.

Use Granite UI validation for required fields, but repeat important validation in the model because content can arrive through APIs or migrations as well as the dialog.

## 2. Implement the Sling Model

Use constructor or field injection consistently with the project's existing style. A resource-adaptable model for this component can look like:

```java
@Model(
    adaptables = Resource.class,
    adapters = PromoCard.class,
    resourceType = PromoCardModel.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class PromoCardModel implements PromoCard {
    static final String RESOURCE_TYPE = "example/components/promo-card";

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String link;

    @ValueMapValue
    private String linkLabel;

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getLink() { return link; }
    public String getLinkLabel() { return linkLabel; }
}
```

The interface is optional but useful when consumers and tests should depend on a stable API. Register the model package through the project's established bnd configuration. In AEM as a Cloud Service, this code reaches environments through a [Cloud Manager pipeline](/blog/aem-cloud-manager-cicd-pipeline/), not by installing a bundle manually in production.

Optional injection should not hide required content. Decide whether absence is valid for each field and expose a convenience method such as `isEmpty()` when the component needs a clear placeholder state.

## 3. Render with HTL

Adapt the current resource and keep conditions in the template readable:

```html
<sly data-sly-use.card="com.example.core.models.PromoCard"></sly>
<article class="cmp-promo-card" data-sly-test="${card.title}">
  <h2 class="cmp-promo-card__title">${card.title}</h2>
  <p data-sly-test="${card.description}">${card.description}</p>
  <a data-sly-test="${card.link && card.linkLabel}"
     href="${card.link @ context='uri'}">${card.linkLabel}</a>
</article>
```

HTL applies contextual escaping, but developers still need the correct context and a link-handling strategy. For production components, use the project's link service or Core Component patterns to map internal URLs, preserve external links, and expose validity consistently.

Add an author placeholder when the component is empty. Authors need a selectable component in edit mode even when no title exists; public visitors should not receive empty structural markup.

## 4. Add styling and policy configuration

Place component-specific frontend code in the project's client library structure and load it through the site clientlib or established frontend pipeline. Avoid inline style and script output from authored values.

Use template policies for design choices such as allowed styles rather than adding a dialog field for every visual variation. Policies let template owners control options while authors select from approved variants.

## 5. Test the contract

With AEM Mocks, load representative JSON content, set the current resource, adapt it to the model, and assert required, optional, and empty states. Add tests for link handling or service failures when the model has dependencies.

Then test author behavior: insert the component, reopen its dialog, clear optional fields, copy it, publish it, and inspect the final HTML. Verify keyboard access, heading order, link purpose, and responsive behavior.

Run an automated accessibility check as a baseline, then verify focus, zoom, and screen-reader output manually. Component tests should cover both populated and empty authoring states.

## Common failures

If HTL cannot adapt the model, compare the component's actual `sling:resourceType` with the model constant and verify bundle activation and model registration. If values are null, inspect the stored property names in CRXDE on a development environment. If a dialog saves but output remains stale, check Dispatcher caching and publication rather than changing the model first.

The [AEM Developer and Architect course](/courses/aem-developer/) covers components from dialog through deployment. For help with component architecture, [contact us](/contact/).