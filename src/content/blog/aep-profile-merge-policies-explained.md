---
title: "AEP Profile Merge Policies Explained"
slug: "aep-profile-merge-policies-explained"
description: "Learn how AEP profile merge policies combine dataset fragments, resolve attribute conflicts, and affect audiences without changing the underlying data."
author: "Gaurav Agarwal"
publishDate: 2026-08-28
tags: ["AEP", "RTCDP", "Real-Time Customer Profile"]
featured: false
faqs:
  - question: "What is a merge policy in AEP?"
    answer: "A merge policy is the rule AEP uses to combine profile fragments from multiple datasets into a unified profile view. It controls identity stitching and how conflicting attribute values are prioritized."
  - question: "Does changing a merge policy overwrite profile data?"
    answer: "No. A merge policy changes how stored fragments are assembled when Profile is accessed or an audience is evaluated. It does not rewrite the source datasets or permanently delete the lower-priority values."
  - question: "Can an AEP sandbox have more than one merge policy?"
    answer: "Yes. A sandbox can contain multiple merge policies for different use cases, but only one can be the default. Keeping the set small and clearly governed makes audience behavior easier to understand."
---

An AEP profile merge policy tells Real-Time Customer Profile which identity links to use and which attribute value should win when multiple profile fragments disagree. It creates a unified view at read and evaluation time; it does not copy everything into a new master customer row or modify the source datasets.

That distinction is the key to using merge policies correctly. A policy is a controlled view of profile data, not a data-cleansing tool. If two systems send unreliable values, changing precedence may hide one symptom but will not repair either source.

## Why profile fragments need merging

Each profile-enabled dataset contributes fragments. A CRM dataset might provide name, email, and loyalty tier. A commerce dataset might provide lifetime value and preferred store. A service dataset might carry contact preferences. When those fragments share identities that belong to one graph, AEP can assemble them into a unified profile.

Conflicts are inevitable. CRM may say the preferred language is English while a recent digital preference center says French. A merge policy determines which value appears in the assembled profile and therefore which value an audience or destination can use.

The policy has two major decisions:

- **Identity stitching:** whether to use the private graph associated with the organization or perform no identity stitching.
- **Attribute merging:** whether dataset precedence or timestamp ordering resolves conflicting attributes.

Most customer use cases use the private identity graph. A no-stitching policy is useful only when fragments must remain isolated by their primary identity rather than connected through graph relationships.

## Dataset precedence

Dataset precedence uses an explicit ranking. When the same attribute has different values in multiple fragments, the value from the higher-priority dataset wins. This works well when systems have clear authority: a consent platform may outrank CRM for communication preferences, while CRM outranks an imported legacy list for customer status.

The advantage is predictability. Teams can explain why a value won without comparing record timestamps. The tradeoff is maintenance. New datasets must be placed intentionally, and a high-priority dataset with stale or sparsely populated values can produce surprising results.

Precedence should reflect field authority, yet the policy ranks datasets rather than individual fields. If ownership differs by attribute, consider improving source design or splitting records into datasets with clearer responsibilities instead of building an elaborate ranking that is correct only sometimes.

## Timestamp ordering

Timestamp ordering generally favors the most recently updated fragment when attributes conflict. It suits data where recency is the intended authority, such as a preference that customers can update through several channels.

This approach depends on trustworthy timestamps and ingestion behavior. A delayed historical load can appear newer at the dataset level even when its business value is old. Before choosing timestamp ordering, test backfills, replayed files, late events, and source clock assumptions. "Latest" needs a precise operational meaning.

## Merge policies and audiences

Audiences evaluate the profile view produced by their assigned merge policy. Two audiences with identical rules can produce different membership if they use policies that resolve an attribute differently. Destinations then receive the consequences of that choice.

For example, an audience requiring `preferredLanguage = fr` may include a customer under a recency-based policy but exclude the same customer under a CRM-first policy. The audience rule is not inconsistent; its input view differs.

Document the merge policy with every production audience. Before changing an existing policy, assess downstream audiences and activations rather than treating the change as administrative configuration. For a broader view of how Profile supports RTCDP and AJO, see [AEP, RTCDP, AJO, and CJA explained](/blog/aep-rtcdp-ajo-explained).

## Identity quality comes first

A merge policy cannot separate people incorrectly connected in an identity graph. If a shared email, device, or account ID collapses two people into one graph, the policy may faithfully merge the wrong fragments. Fix identity namespaces and graph-linking behavior before tuning attribute precedence.

Likewise, a policy cannot make an account-level record person-level. Confirm the grain of each schema and primary identity. The existing [shared-device identity example](/blog/identity-stitching-shared-devices-aep) illustrates why graph design changes the fragments available to merge.

## Design for regional and global programs

Global deployments often combine central datasets with regional sources. Do not automatically place a global dataset above every local system. A regional preference center may be authoritative for consent or language in its market, while a central CRM remains authoritative for loyalty status.

Merge policies do not replace data usage labels, consent enforcement, regional sandboxes, or residency controls. They decide how permitted profile fragments are viewed. Keep those governance layers explicit, and use separate policies only when a real business use case requires a different profile view.

Start with one well-understood default policy, representative test profiles, and a documented precedence rationale. Compare assembled attributes and audience membership before rollout. The [RTCDP course](/courses/rtcdp/) covers Profile, identity, and segmentation together. For help reviewing merge behavior before it affects activation, [contact us](/contact/).