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
    <div className="sticky top-[62px] z-20 bg-white">
      <div className="max-w-2xl mx-auto flex items-end px-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 pb-2.5 pt-2 text-sm text-center relative transition-colors ${
              activeTab === tab.key
                ? "font-semibold text-[--color-text-primary]"
                : "font-medium text-[--color-text-secondary] hover:text-[--color-text-primary]"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-[15%] right-[15%] h-[2.5px] bg-[#1a73e8] rounded-full" />
            )}
          </button>
        ))}
      </div>
      {/* Light separator line matching Android app */}
      <div className="h-[0.5px] bg-neutral-200" />
    </div>
  );
}
