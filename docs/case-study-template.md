# Anonymized Case Study Template

Use this worksheet before creating a file in `src/content/case-studies/`. Include only facts you are permitted to publish.

## Confidentiality rules

- Do not include the client or company name, logo, internal system names, proprietary screenshots, or identifiable contacts.
- Describe the client broadly, such as "European manufacturing enterprise" or "US-based financial services company."
- Use a broad region rather than an office, city, or country when the combination could identify the client.
- Publish metrics only when they are measured and approved. Use an honest range when an exact number is confidential.
- Do not imply that Adobe or the client endorses ExperienceCloudMentor.

## Required frontmatter

```yaml
---
title: "Outcome-focused project title"
slug: "descriptive-project-slug"
category: "AEM"
clientProfile: "Global financial services enterprise"
industry: "Financial services"
region: "North America"
consultant: "Sumit Yadav"
technologies:
  - "AEM as a Cloud Service"
  - "Cloud Manager"
problem: "The factual business or technical problem."
constraints:
  - "A real delivery, compliance, migration, or platform constraint"
approach: "What was implemented and why that approach was selected."
outcome: "A measured, approved outcome or a precise qualitative result."
order: 1
---
```

Allowed `category` values: `AEM`, `RTCDP`, `AJO`, `Adobe Target`, or `EDS`.

Allowed `consultant` values: `Sumit Yadav` or `Gaurav Agarwal`.

## Evidence checklist

- What changed between the initial and final state?
- Which constraints shaped the architecture?
- Which work did the named consultant personally perform?
- Which technologies were actually used?
- How was the outcome measured?
- Is every claim safe to publish under the engagement agreement?
- Could the details identify the client when combined? If so, generalize further.

## Writing guidance

Lead with the result, then explain the problem, constraints, decision process, implementation, and outcome. Prefer concrete engineering choices over promotional claims. If no approved quantitative metric exists, describe the operational result without inventing a percentage.
