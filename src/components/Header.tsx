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
      <header className="sticky top-0 z-30 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            DesiSphere
          </h1>
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="max-w-[140px] truncate">{locationName}</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
