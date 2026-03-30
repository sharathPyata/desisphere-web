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
      <header className="sticky top-0 z-30 bg-white border-b border-[--color-border-light]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <svg className="w-8 h-8 text-[--color-primary]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="text-xl font-bold text-[--color-primary] hidden sm:block">
              DesiSphere
            </span>
          </div>

          {/* Search pill */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center border border-[--color-border] rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-sm font-medium text-[--color-text-primary] border-r border-[--color-border] pr-3 mr-3">
              {locationName}
            </span>
            <span className="text-sm text-[--color-text-secondary] pr-3">
              Explore nearby
            </span>
            <span className="bg-[--color-primary] rounded-full p-1.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </button>

          {/* Mobile search icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="sm:hidden flex items-center gap-2 border border-[--color-border] rounded-full py-2 px-3 shadow-sm"
          >
            <svg className="w-4 h-4 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium">{locationName}</span>
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
