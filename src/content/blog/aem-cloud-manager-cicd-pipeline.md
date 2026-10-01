---
title: "AEM Cloud Manager CI/CD Pipeline Explained"
slug: "aem-cloud-manager-cicd-pipeline"
description: "Understand AEM Cloud Manager CI/CD pipelines, build and code quality stages, deployment, environment variables, secrets, tests, and failure troubleshooting."
author: "Sumit Yadav"
publishDate: 2026-08-09
tags: ["AEM", "Cloud Manager", "CI/CD"]
featured: false
faqs:
  - question: "What is the difference between a full-stack and frontend pipeline in Cloud Manager?"
    answer: "A full-stack pipeline deploys AEM application code and configuration, while a frontend pipeline can deploy eligible frontend artifacts independently. Availability and exact behavior depend on the project and program configuration."
  - question: "Can Cloud Manager store environment-specific secrets?"
    answer: "Yes. Use supported secret and environment variable configuration rather than committing credentials. Application code should read the mapped configuration and handle missing values safely."
  - question: "Why does a Cloud Manager pipeline pass locally but fail during build?"
    answer: "Typical causes include a different Java or Node version, undeclared dependencies, quality gate violations, package structure errors, tests that depend on local state, or Dispatcher validation failures. Reproduce the reported stage with matching tool versions."
---

AEM Cloud Manager is the controlled route for building, validating, and deploying code to AEM as a Cloud Service. A production pipeline does more than copy a package: it creates a reproducible build, evaluates quality, validates configuration, runs tests, and rolls the release through managed infrastructure.

The practical consequence is that deployment design belongs in the application repository. Manual production installation is not a fallback release strategy.

## Pipeline types and responsibilities

A **full-stack pipeline** handles the Maven-based AEM project, including bundles, content packages, OSGi configuration, repository initialization, and Dispatcher configuration. Production pipelines include stronger controls and deployment behavior; non-production pipelines support faster validation against development environments.

Projects may also use specialized pipelines, including frontend or web-tier configuration pipelines where supported. These reduce lead time when a change does not require a complete application deployment. Choose the narrowest pipeline that owns the artifact, but avoid splitting releases when the pieces must change atomically.

## What happens in a full-stack pipeline

Although details vary, think of the flow in these stages:

1. **Source and build:** Cloud Manager checks out the configured branch and executes the project build with declared toolchains and dependencies.
2. **Code quality:** Static analysis evaluates reliability, security, maintainability, and AEM-specific patterns. Important violations can block progression.
3. **Artifact validation:** Content package structure, OSGi bundles, and Dispatcher configuration are checked.
4. **Deployment:** Artifacts move to the target environment using the platform's managed rollout process.
5. **Testing:** Configured functional, UI, experience, or custom quality checks exercise the deployed application.
6. **Approval and promotion:** Production workflows may pause for business or deployment approval before continuing.

Follow the pipeline's actual report when diagnosing a failure. "Pipeline failed" is not a root cause; the failed stage and rule are.

## Build for reproducibility

Pin compatible Java, Maven, Node, and frontend dependency versions according to the repository's supported setup. Declare every dependency needed by CI. A build that relies on a developer's global package, local Maven cache quirk, or uncommitted generated file is not reproducible.

Run unit tests and package validation before pushing. Keep tests deterministic and avoid calls to unavailable external systems. Use test doubles for unit tests and reserve environment integrations for an appropriate later stage.

Cloud Service instances are immutable from the project's perspective. Include OSGi configuration and repository initialization in code, and use compatible changes that tolerate old and new instances during a rolling deployment. The [Cloud Service architecture guide](/blog/aem-as-a-cloud-service-architecture/) explains why local state and all-at-once migrations fail this model.

## Variables, secrets, and environment differences

Use Cloud Manager's supported environment variables and secrets for values that differ by environment. Secrets must never be committed or printed to logs. Map values into OSGi configuration using the supported substitution mechanism and fail clearly when required configuration is absent.

Keep the number of environment differences small. If lower environments use entirely different integrations or content assumptions, pipeline success there provides weak evidence for production. Use stable interfaces and environment-specific endpoints, not environment-specific business logic.

## Quality gates should shape development

Do not wait until release day to discover quality violations. Run available analyzers in pull requests, keep unit coverage focused on important behavior, and treat security findings according to risk. If a rule is a false positive, document and manage it through the supported process instead of weakening code globally.

Dispatcher configuration deserves the same discipline. Validate farms, filters, rewrites, and cache rules in CI. A syntactically valid rule can still expose an endpoint or disable caching, so add behavior-level checks for critical routes. See the [Dispatcher guide](/blog/aem-dispatcher-configuration-caching-invalidation/).

## Troubleshooting failed deployments

First identify whether the failure occurred during build, quality analysis, artifact validation, deployment, or post-deployment testing. Download the relevant log and find the earliest actionable error rather than the final cascade.

- For dependency failures, compare repository declarations and tool versions.
- For bundle failures, inspect imports, exports, and OSGi activation errors.
- For package failures, verify dependencies and installation order.
- For Dispatcher failures, run the same validator locally where available.
- For test failures, preserve screenshots, request logs, and test data identifiers.
- For deployment health failures, inspect application logs for startup and configuration errors.

Global teams need one release record and named decision owners. A handoff between India, Germany, and the US is useful only when everyone can see the same commit, pipeline run, approvals, and rollback criteria.

Build practical deployment skills in the [AEM Developer and Architect course](/courses/aem-developer/). For CI/CD or release architecture support, [contact us](/contact/).