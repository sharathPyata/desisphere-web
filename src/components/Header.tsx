"use client";

import { useState } from "react";
import LocationSearch from "./LocationSearch";

interface HeaderProps {
  locationName: string;
  onLocationChange: (name: string, lat: number, lng: number) => void;
}

export default function Header({ locationName, onLocationChange }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white">
        <div className="max-w-2xl mx-auto px-4 pt-3 pb-2">
          <button
            onClick={() => setShowSearch(true)}
            className="w-full flex items-center justify-center gap-3 border border-neutral-200 rounded-full px-5 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow bg-white"
          >
            <svg
              className="w-[18px] h-[18px] text-[--color-text-primary] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-[15px] font-medium text-[--color-text-primary]">
              {locationName}
            </span>
          </button>
        </div>
      </header>

      {showSearch && (
        <LocationSearch
          onSelect={(name, lat, lng) => {
            onLocationChange(name, lat, lng);
            setShowSearch(false);
          }}
          onClose={() => setShowSearch(false)}
        />
      )}
    </>
  );
}
