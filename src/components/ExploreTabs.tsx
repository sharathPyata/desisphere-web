"use client";

import type { TabType } from "@/types";

interface ExploreTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { key: TabType; label: string }[] = [
  { key: "homes", label: "Homes" },
  { key: "food", label: "Food" },
  { key: "services", label: "Services" },
  { key: "events", label: "Events" },
];

export default function ExploreTabs({ activeTab, onTabChange }: ExploreTabsProps) {
  return (
    <div className="sticky top-14 z-20 bg-white border-b border-[--color-border-light]">
      <div className="max-w-2xl mx-auto flex">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-3 text-sm font-medium text-center relative transition-colors ${
              activeTab === tab.key
                ? "text-[--color-text-primary]"
                : "text-[--color-text-secondary] hover:text-[--color-text-primary]"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-[--color-primary] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
