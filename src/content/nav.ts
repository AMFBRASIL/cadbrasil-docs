import type { Section } from "@/lib/docs-ui";
import { kbSections } from "@/content/kb/sections";
import { kbGroupOrder } from "@/content/kb/articles";

export type NavGroup = {
  label: string;
  sections: Section[];
};

const hub = kbSections[0]!;
const articleSections = kbSections.slice(1);

export const navGroups: NavGroup[] = [
  { label: "Visão geral", sections: [hub] },
  ...kbGroupOrder.map((group) => ({
    label: group,
    sections: articleSections.filter((s) => s.title.startsWith(`[${group}]`)),
  })).filter((g) => g.sections.length > 0),
];

export const sections: Section[] = kbSections;
