---
title: "AJO Email Delivery and Suppression Troubleshooting"
slug: "ajo-email-delivery-suppression-troubleshooting"
description: "Diagnose Adobe Journey Optimizer email delivery, consent, suppression, address, configuration, and reporting issues from action to inbox."
author: "Gaurav Agarwal"
publishDate: 2026-09-02
tags: ["AJO", "Email", "Troubleshooting"]
featured: false
faqs:
  - question: "Why was an AJO email not sent to a profile?"
    answer: "The profile may not have reached the action, may lack an eligible address or consent, may be suppressed, or may fail channel configuration and execution checks. Identify the last successful stage before investigating the inbox."
  - question: "What is the AJO suppression list?"
    answer: "It protects sending reputation and recipients by preventing delivery to addresses associated with qualifying hard bounces, spam complaints, or other suppression reasons. Review the recorded reason before considering remediation."
  - question: "Does an AJO delivery success mean the email reached the inbox?"
    answer: "No. Platform execution, message handoff, recipient-server acceptance, and inbox placement are separate stages. A message can be accepted and still be filtered, quarantined, or routed to spam."
---

Troubleshoot AJO email as a delivery funnel: journey or campaign eligibility, action execution, addressability, consent, suppression, provider handoff, recipient-server response, and inbox placement. The first missing stage owns the investigation.

Do not begin by resending or removing suppression. First capture the profile ID, email address in a protected support workflow, journey or campaign version, message ID, action time, and the status or reason shown in reporting.

## Prove the profile reached the email action

For a journey, inspect whether the profile entered and reached the email node. Conditions, waits, exits, re-entry controls, and action errors can stop progression before email delivery begins. Use the [journey not triggering guide](/blog/ajo-journey-not-triggering-troubleshooting/) when there is no entry evidence.

For a campaign, confirm its audience, schedule, execution status, and the profile’s membership at the relevant evaluation time. Distinguish total audience size from profiles addressable on the email channel.

Check that the intended published message version was used. A proof, test-mode send, and live execution may use different profiles, addresses, or settings.

## Verify address and channel configuration

Confirm the profile has a valid email identity in the namespace and field selected by the channel configuration. Multiple addresses require a clear priority and eligibility rule. An address present somewhere in the profile is not necessarily the execution address.

Review the channel configuration, subdomain, IP pool where applicable, sender name, from address, reply-to address, and execution type. Validate domain delegation and authentication through the organization’s approved operational process. Do not change DNS or sender settings during an incident without the messaging and security owners.

Check the content for unresolved required personalization, invalid links, or configuration errors. For expression issues, follow the [AJO Handlebars personalization guide](/blog/ajo-email-personalization-handlebars/).

## Check consent and suppression separately

Consent determines whether communication is permitted for the purpose and channel. Suppression protects recipients and sending reputation based on delivery history and policy. Passing one does not imply passing the other.

Inspect the applicable consent field, policy, effective time, and source. In a global program, the relevant rule may differ by contractual market, purpose, brand, and message category. Do not bypass a regional consent requirement to complete a test; use an authorized test profile.

If the address is suppressed, record the reason and timestamp. Hard bounces, repeated soft bounces, complaints, and manually managed entries require different responses. An address should only be removed through the supported process when the root cause is understood and the organization has evidence that sending is appropriate.

## Read delivery statuses as a sequence

Execution reporting may show that the message was prepared or handed off, while delivery feedback records whether the recipient server accepted or rejected it. Examine reason codes and timestamps. Group failures by domain, configuration, region, and response rather than treating every profile as an isolated case.

A hard bounce usually indicates a persistent address or domain failure. A soft bounce may reflect a temporary mailbox, rate, or server condition. Deferrals can resolve later. Spam complaints are a customer and reputation signal, not merely a technical error.

If the recipient server accepted the message but the user cannot find it, investigate inbox placement. Ask the recipient to check spam and quarantine, but also review authentication alignment, reputation, content, sending patterns, and enterprise mail gateway rules. Opens are not definitive proof because privacy features and image blocking affect tracking.

## Diagnose regional patterns

Compare failure rates by recipient domain and market without inventing a universal benchmark. A problem limited to one corporate domain may be a gateway policy; a problem across providers may point to configuration, reputation, or content. Coordinate with local teams because mailbox providers and legal requirements vary.

Use seed addresses and authorized test profiles across representative providers and regions. Keep tests small and identifiable. Validate language variants, encoded characters, localized links, and daylight-saving behavior in scheduled sends.

Document the final cause at the stage where it occurred: eligibility, identity, consent, suppression, configuration, handoff, rejection, or placement. This makes the fix reusable and prevents unsafe workarounds.

After resolution, add the failure signature and evidence path to the operating runbook. Include the responsible team and escalation boundary so the next incident begins with diagnosis rather than repeated test sends.

The [AJO course](/courses/ajo/) connects channel setup with journey execution and governance. For structured help with a delivery incident, [contact us](/contact/).
