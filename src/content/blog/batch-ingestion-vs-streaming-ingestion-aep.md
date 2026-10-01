---
title: "Batch Ingestion vs Streaming Ingestion in AEP"
slug: "batch-ingestion-vs-streaming-ingestion-aep"
description: "Compare batch and streaming ingestion in Adobe Experience Platform by latency, volume, error handling, identity, cost, and global operating requirements."
author: "Gaurav Agarwal"
publishDate: 2026-09-10
tags: ["AEP", "Data Ingestion", "RTCDP"]
featured: false
faqs:
  - question: "What is the difference between batch and streaming ingestion in AEP?"
    answer: "Batch ingestion loads files or grouped records on a schedule, while streaming ingestion sends records continuously through supported APIs, SDKs, or connectors. Both write to AEP datasets and must conform to XDM."
  - question: "Is streaming ingestion always better for Real-Time CDP?"
    answer: "No. Streaming is valuable when a use case requires fresh data and downstream processing can act quickly. Batch is often better for historical loads, large scheduled extracts, reconciliation, and sources that do not emit reliable events."
  - question: "Can one AEP implementation use both batch and streaming ingestion?"
    answer: "Yes. Most mature implementations use both. For example, behavioral events may stream while customer master data and historical transactions arrive in scheduled batches. Shared schema and identity rules keep the paths consistent."
---

Batch ingestion loads grouped records or files into Adobe Experience Platform, while streaming ingestion sends records continuously as events or updates occur. Neither method is universally better. Choose based on the required end-to-end latency, source capabilities, volume pattern, recovery model, and downstream use case.

A sensible AEP architecture commonly uses both: streaming for time-sensitive digital interactions and batch for historical, reference, or scheduled enterprise data.

## How batch ingestion works

Batch ingestion typically receives files from cloud storage, SFTP, source connectors, or APIs. A file or collection of records is processed as a batch and receives a status that can be monitored. Teams can reconcile expected files, record counts, and failures against a source extract.

Batch works well for:

- Initial historical loads and backfills.
- Daily CRM or loyalty snapshots.
- Large transaction extracts produced on a schedule.
- Sources that cannot publish trustworthy events.
- Workflows requiring file-level approval and reconciliation.

Its primary tradeoff is freshness. Data waits for source extraction, transfer, processing, and any scheduled downstream audience or destination jobs. That is acceptable when the business action is daily or weekly, but not when a current interaction should affect the next experience.

## How streaming ingestion works

Streaming ingestion accepts records through supported streaming connections, Edge Network collection, SDKs, APIs, or source connectors. Data can reach datasets and eligible platform services soon after the source event.

It suits web and mobile behavior, point-of-sale events, authentication changes, or other signals whose value declines quickly. The [Edge Network overview](/blog/adobe-experience-platform-edge-network-explained) explains one common route for digital collection.

Streaming shifts operational responsibility. Producers need stable schemas, retry logic where applicable, duplicate handling, monitoring, and a clear response to partial outages. A low-latency path that silently drops malformed records is not more useful than a slower, reconciled batch.

## Compare the decision factors

**Latency:** Start with when data must influence a decision, then include ingestion, Profile updates, audience evaluation, and destination delivery. Streaming ingestion alone does not make an external destination real time.

**Volume pattern:** Batch handles large periodic extracts naturally. Streaming handles continuous events, but traffic peaks and source throttling still require design. Do not turn a nightly file into millions of rapid API calls solely to call the pipeline streaming.

**Error recovery:** Batch offers file and batch statuses that simplify replay and reconciliation. Streaming needs record-level observability, deterministic retries, and duplicate-safe consumers. In both cases, preserve source keys and ingestion lineage.

**Ordering and updates:** Events can arrive late or out of order. Define whether business time or ingestion time matters. For profile attributes, understand whether the source sends full snapshots or partial updates and how those fragments interact with merge policies.

**Cost and operations:** Consider source engineering, connector capacity, monitoring, support coverage, and downstream load rather than only transport speed. A weekly business process rarely needs an always-on custom stream.

## Keep XDM and identity consistent

Both ingestion modes must produce valid XDM. When the same business concept arrives through batch and streaming paths, align field meaning, types, identity namespaces, and event types. Otherwise one customer action can look like two unrelated signals.

Use stable source event IDs or record keys to support duplicate detection and reconciliation. Test authenticated and anonymous behavior before profile-enabling streaming event datasets. For batch backfills, assess how historical timestamps and identity links affect existing profiles and audiences.

## A hybrid example

Consider a retailer with web behavior, store purchases, and loyalty data. Web interactions can stream through Web SDK because current browsing may support same-session personalization. Store transactions may stream from a reliable event platform or arrive in frequent micro-batches. The loyalty master can arrive nightly because tier recalculation occurs once per day.

All three paths can use governed XDM schemas and shared customer namespaces. Their schedules differ because their business clocks differ. The architecture stays coherent without forcing every source into one ingestion pattern.

## International deployment considerations

Global programs should assess where sources originate, where data is permitted to land, and who operates replay or correction. Some regions may use local batch drops because network, residency, or source contracts prevent a central stream. Others may collect consented digital events through edge services.

Standardize schemas, identity semantics, monitoring, and service-level definitions where possible. Allow regional transport differences when they reflect genuine constraints. A single global pipeline is not a success if it obscures consent or makes local failures impossible to reconcile.

Choose ingestion per source and use case, then test the complete path with realistic delays and failures. The [RTCDP course](/courses/rtcdp/) covers ingestion alongside XDM, Profile, and activation. For help selecting or reviewing a hybrid ingestion architecture, [contact us](/contact/).