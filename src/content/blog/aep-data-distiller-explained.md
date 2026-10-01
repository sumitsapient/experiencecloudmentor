---
title: "AEP Data Distiller Explained: SQL Transformations Inside Experience Platform"
slug: "aep-data-distiller-explained"
description: "Learn what Adobe Experience Platform Data Distiller does, where it fits, and how to use SQL-derived datasets without confusing it with profile processing."
author: "Gaurav Agarwal"
publishDate: 2026-08-21
tags: ["AEP", "RTCDP", "Data Distiller"]
featured: false
faqs:
  - question: "What is AEP Data Distiller?"
    answer: "Data Distiller is an Adobe Experience Platform capability for querying, transforming, and preparing data in the Data Lake with SQL. It can create derived datasets for analysis, profile use cases, and downstream activation when the output is modeled and enabled correctly."
  - question: "Does Data Distiller update Real-Time Customer Profile directly?"
    answer: "Not automatically. A scheduled query writes results to an output dataset. That dataset must use an appropriate XDM schema and be enabled for Profile before its records can contribute to profile fragments."
  - question: "Is Data Distiller a replacement for an enterprise ETL platform?"
    answer: "Usually not. It is strongest for transformations on data already in AEP. An enterprise ETL or ELT platform may still be needed for source extraction, cross-platform orchestration, and transformations that must happen before ingestion."
---

Data Distiller is the SQL transformation layer inside Adobe Experience Platform (AEP). It lets teams query data in the AEP Data Lake, calculate reusable attributes, reshape records, and write the results into new datasets. The practical value is simple: data already in AEP can be prepared for analysis or activation without exporting it to another warehouse merely to run a transformation.

It is not the Real-Time Customer Profile engine, an identity-stitching service, or a general replacement for every enterprise data pipeline. Keeping those boundaries clear prevents many implementation mistakes.

## Where Data Distiller fits

AEP ingestion brings source data into datasets that conform to XDM schemas. Query Service provides the SQL interface over those datasets. Data Distiller adds capabilities for building and operationalizing more substantial SQL transformations, including scheduled queries and derived datasets.

A typical flow looks like this:

1. Web, CRM, commerce, or service data lands in AEP datasets.
2. A SQL query joins, filters, aggregates, or standardizes that data.
3. The query writes its result to an output dataset.
4. A downstream consumer uses that dataset for reporting, profile enrichment, audience creation, or export.

For example, raw order lines may be too granular for a marketer who needs customer-level values. A scheduled query can calculate total spend, last purchase date, and category affinity by customer identifier. The output becomes a compact derived dataset rather than forcing every audience definition to repeat the same calculations.

## Good use cases

Data Distiller works well when the required inputs already reside in AEP and SQL is a natural way to express the transformation. Common uses include:

- Creating customer-level aggregates from transaction or event data.
- Standardizing codes and values across ingested sources.
- Building analysis-ready tables for Customer Journey Analytics or business intelligence tools.
- Preparing attributes that simplify RTCDP audience rules.
- Inspecting ingestion quality, unexpected nulls, or schema mapping results.

This can be especially useful for global deployments. A team may normalize country codes, currencies, and regional product hierarchies centrally while retaining the fields needed to enforce local activation policy. The transformation should not erase consent provenance or combine data across regions merely because SQL makes the join possible. Data residency, contractual controls, and governance labels still determine what should be processed.

## Profile enablement is a separate decision

Writing a query result does not place it in Real-Time Customer Profile. If the output should enrich profiles, its schema must be compatible with Profile, identity fields must be configured correctly, and the dataset must be enabled for Profile. The records then contribute profile fragments according to identity and merge-policy behavior.

This distinction matters because not every derived result belongs in Profile. Large analytical aggregates, operational audit tables, and temporary quality outputs may be useful in the Data Lake but wasteful or inappropriate as profile attributes. Decide the consumer first, then design the output schema.

If identity behavior is central to the use case, review the [shared-device identity stitching example](/blog/identity-stitching-shared-devices-aep) before enabling a derived dataset. An aggregate grouped by the wrong identifier can attach one person's behavior to another profile.

## Design a reliable scheduled query

Start with a narrow query against a known time range. Confirm row counts, uniqueness, null handling, and the intended grain of the output. A label such as "customer summary" is not enough; document whether one row represents a person, account, household, device, or person-by-region combination.

Then make repeated runs safe. Define how late-arriving records are handled, whether the query replaces or appends output, and how duplicate source records affect aggregates. Monitor query failures and output freshness rather than assuming a schedule guarantees usable data.

For organizations with teams in the US, UK, Germany or the wider EU, Australia, UAE, Singapore, India, and Canada, ownership also needs to be explicit. A central platform team can maintain shared SQL patterns, while regional data owners approve fields and uses affected by local privacy or residency obligations. That is more durable than creating a separate transformation for every market without shared standards.

## What Data Distiller does not solve

Data Distiller cannot repair an unclear XDM model, weak identity namespace design, or missing consent data. It can make flawed data easier to query, but the flaw remains. It also does not guarantee low-latency activation: scheduled transformations run on a cadence, so a use case requiring an immediate response to an event may need streaming ingestion and streaming or edge audience evaluation instead.

Before production, verify the source-to-output lineage, query schedule, dataset retention, profile setting, governance labels, and downstream refresh expectation. That checklist turns a useful SQL statement into an operable data product.

The [RTCDP course](/courses/rtcdp/) covers the surrounding architecture: XDM, identity, Profile, audiences, and activation. For help deciding whether a transformation belongs in AEP or an external data platform, [contact us](/contact/).