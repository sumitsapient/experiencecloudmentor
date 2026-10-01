export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface TopicGuide {
  title: string;
  description: string;
  introduction: string;
  steps: string[];
  course?: { href: string; label: string };
}

const topicGuides: Record<string, TopicGuide> = {
  aem: {
    title: 'Adobe Experience Manager (AEM) Guides',
    description: 'Practical AEM guides covering development, architecture, careers, certification, and Edge Delivery Services.',
    introduction: 'Build a working understanding of AEM from component development and cloud architecture through certification and career decisions.',
    steps: ['Start with the AEM developer career path', 'Learn modern AEM and Edge Delivery Services architecture', 'Prepare with certification and interview guides'],
    course: { href: '/courses/aem-developer/', label: 'Explore AEM Developer & Architect training' },
  },
  eds: {
    title: 'Edge Delivery Services (EDS) Guides',
    description: 'Guides to Adobe Edge Delivery Services architecture, AEM comparisons, implementation choices, and developer skills.',
    introduction: 'Understand where Edge Delivery Services fits in the AEM ecosystem and when its document-based, performance-first model is the right choice.',
    steps: ['Compare EDS with traditional AEM', 'Understand the delivery and authoring model', 'Build and migrate with practical implementation guidance'],
    course: { href: '/courses/eds/', label: 'Explore Edge Delivery Services training' },
  },
  aep: {
    title: 'Adobe Experience Platform (AEP) Guides',
    description: 'Adobe Experience Platform guides covering Edge Network, identity, privacy, audiences, RTCDP, AJO, and CJA.',
    introduction: 'Learn how Adobe Experience Platform collects, governs, unifies, and activates customer data across the Experience Cloud.',
    steps: ['Understand the AEP product ecosystem', 'Learn collection, XDM, identity, and privacy foundations', 'Connect profiles and audiences to activation use cases'],
    course: { href: '/courses/rtcdp/', label: 'Explore Real-Time CDP training' },
  },
  rtcdp: {
    title: 'Adobe Real-Time CDP Guides',
    description: 'Real-Time CDP guides covering identity, audience composition, activation, certification, privacy, and platform comparisons.',
    introduction: 'Move from AEP data foundations to unified profiles, governed audiences, and activation across enterprise destinations.',
    steps: ['Learn schemas, identity, and unified profiles', 'Build and evaluate audience strategies', 'Prepare for implementation and certification'],
    course: { href: '/courses/rtcdp/', label: 'Explore Real-Time CDP training' },
  },
  ajo: {
    title: 'Adobe Journey Optimizer (AJO) Guides',
    description: 'AJO guides covering real-time journey orchestration, AEP integration, identity, and platform comparisons.',
    introduction: 'Learn how Adobe Journey Optimizer uses AEP profiles and events to coordinate timely, personalized interactions across channels.',
    steps: ['Understand how AEP and AJO work together', 'Learn event-driven journey concepts', 'Compare AJO with alternative orchestration platforms'],
    course: { href: '/courses/ajo/', label: 'Explore Adobe Journey Optimizer training' },
  },
  'adobe-target': {
    title: 'Adobe Target Guides',
    description: 'Adobe Target guides covering experimentation, personalization, implementation choices, and platform comparisons.',
    introduction: 'Learn where Adobe Target fits in an experimentation stack and how to evaluate its personalization capabilities against alternatives.',
    steps: ['Understand testing and personalization use cases', 'Compare Adobe Target with alternative platforms', 'Plan audiences, activities, and measurement'],
    course: { href: '/courses/adobe-target/', label: 'Explore Adobe Target training' },
  },
  cja: {
    title: 'Customer Journey Analytics (CJA) Guides',
    description: 'Customer Journey Analytics guides explaining its role in the Adobe Experience Platform ecosystem and cross-channel measurement.',
    introduction: 'Understand how CJA uses AEP datasets to analyze customer behavior and journeys across channels.',
    steps: ['Understand where CJA fits in AEP', 'Learn how cross-channel data becomes analysis-ready', 'Connect journey measurement to activation strategy'],
  },
};

export function getTopicGuide(slug: string, label: string): TopicGuide {
  return topicGuides[slug] ?? {
    title: `${label} Guides`,
    description: `Practical ${label} guides, comparisons, and implementation insights from Adobe Experience Cloud practitioners.`,
    introduction: `Explore practical articles and learning resources for ${label}.`,
    steps: ['Start with the foundational guides', 'Explore implementation examples', 'Continue with related training and services'],
  };
}
