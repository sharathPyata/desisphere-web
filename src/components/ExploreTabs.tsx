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
    <div className="sticky top-14 z-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-2xl mx-auto flex">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-3 text-sm font-medium text-center relative transition-colors ${
              activeTab === tab.key
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
