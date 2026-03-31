"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { filterPredefined, geocodeSearch, type GeoResult } from "@/lib/geocode";

interface HeaderProps {
  locationName: string;
  onLocationChange: (name: string, lat: number, lng: number) => void;
}

export default function Header({ locationName, onLocationChange }: HeaderProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const openSearch = () => {
    setIsSearching(true);
    setQuery("");
    setResults(filterPredefined(""));
  };

  const closeSearch = () => {
    setIsSearching(false);
    setQuery("");
    setResults([]);
  };

  const selectResult = (result: GeoResult) => {
    onLocationChange(result.name, result.lat, result.lng);
    closeSearch();
  };

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setResults(filterPredefined(value));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length >= 2) {
      setIsLoading(true);
      debounceRef.current = setTimeout(async () => {
        const apiResults = await geocodeSearch(value);
        setResults((prev) => {
          const predefined = filterPredefined(value);
          const predefinedNames = new Set(predefined.map((p) => p.name.toLowerCase()));
          const unique = apiResults.filter(
            (r) => !predefinedNames.has(r.name.toLowerCase())
          );
          return [...predefined, ...unique];
        });
        setIsLoading(false);
      }, 400);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  // Close on click outside
  useEffect(() => {
    if (!isSearching) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSearching]);

  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F6]">
      <div className="max-w-2xl mx-auto px-4 pt-3 pb-2" ref={containerRef}>
        {!isSearching ? (
          <button
            onClick={openSearch}
            className="w-full flex items-center justify-center gap-3 border border-neutral-200 rounded-full px-5 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow bg-[#FAF9F6]"
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
        ) : (
          <div className="relative">
            <div className="flex items-center gap-2 border border-neutral-300 rounded-full px-4 py-2.5 bg-[#FAF9F6] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
              <svg
                className="w-[18px] h-[18px] text-[--color-text-secondary] flex-shrink-0"
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
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="City name or zip code"
                className="flex-1 text-[15px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] bg-transparent outline-none"
              />
              {query && (
                <button
                  onClick={() => handleQueryChange("")}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300"
                >
                  <svg className="w-3 h-3 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown results */}
            <div className="absolute left-0 right-0 mt-2 bg-[#FAF9F6] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-neutral-100 max-h-72 overflow-y-auto z-50">
              {results.length > 0 ? (
                results.map((result, i) => (
                  <button
                    key={`${result.name}-${i}`}
                    onClick={() => selectResult(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <svg
                      className="w-5 h-5 text-[--color-text-secondary] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm text-[--color-text-primary] text-left">
                      {result.name}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-[--color-text-secondary] text-center">
                  {isLoading ? "Searching..." : "No results found"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
