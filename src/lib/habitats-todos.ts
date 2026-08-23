// Registry of all TODO(michael) markers in Habitats pages.
// Used by tests/habitats-copy-todo.test.ts to ensure no fabricated Habitat prose.
// Per spec §5.4, this is the single source of truth for what Michael needs to write.

export type HabitatTodoEntry = {
  path: string;
  section: string;
  count: number;
};

export const habitatsTodos: HabitatTodoEntry[] = [
  // /habitats page - 19 total markers
  { path: "/habitats", section: "hero-support", count: 1 },
  { path: "/habitats", section: "design-fields-land-water", count: 1 },
  { path: "/habitats", section: "design-fields-human-patterns", count: 1 },
  { path: "/habitats", section: "design-fields-climate-envelope", count: 1 },
  { path: "/habitats", section: "design-fields-natural-construction", count: 1 },
  { path: "/habitats", section: "design-fields-private-home-systems", count: 1 },
  { path: "/habitats", section: "design-fields-energy-compute", count: 1 },
  { path: "/habitats", section: "material-principle", count: 1 },
  { path: "/habitats", section: "engagement-land-potential-review", count: 1 },
  { path: "/habitats", section: "engagement-habitat-feasibility", count: 1 },
  { path: "/habitats", section: "engagement-development-formation", count: 1 },
  { path: "/habitats", section: "ideal-partners-1", count: 1 },
  { path: "/habitats", section: "ideal-partners-2", count: 1 },
  { path: "/habitats", section: "ideal-partners-3", count: 1 },
  { path: "/habitats", section: "ideal-partners-4", count: 1 },
  { path: "/habitats", section: "ideal-partners-5", count: 1 },
  { path: "/habitats", section: "ideal-partners-6", count: 1 },
  { path: "/habitats", section: "design-fields-land-water-body", count: 1 },
  { path: "/habitats", section: "material-principle-body", count: 1 },

  // /habitats/land-potential-review page - 11 markers total
  { path: "/habitats/land-potential-review", section: "hero-title", count: 1 },
  { path: "/habitats/land-potential-review", section: "hero-lede", count: 1 },
  { path: "/habitats/land-potential-review", section: "explore-heading-comment", count: 1 },
  { path: "/habitats/land-potential-review", section: "explore-development-constraints", count: 1 },
  { path: "/habitats/land-potential-review", section: "explore-site-opportunities", count: 1 },
  { path: "/habitats/land-potential-review", section: "explore-system-requirements", count: 1 },
  { path: "/habitats/land-potential-review", section: "explore-next-investigations", count: 1 },
  { path: "/habitats/land-potential-review", section: "deliverables-heading-comment", count: 1 },
  { path: "/habitats/land-potential-review", section: "deliverables-body", count: 1 },
  { path: "/habitats/land-potential-review", section: "process-heading-comment", count: 1 },
  { path: "/habitats/land-potential-review", section: "process-body", count: 1 },

  // NOTE: the /land-review form page (2 markers) was removed from the public
  // build per Decision 5 quarantine (2026-08-23). LandReviewForm.tsx survives on
  // branch preserve/wp2-2026-08-23 for a future private/authenticated return.
];

// Total TODO markers across all Habitat pages
export const totalHabitatsTodos = habitatsTodos.reduce((sum, entry) => sum + entry.count, 0);
