"use client";

const PREDEFINED_LOCATIONS = [
  { name: "Charlotte", lat: 35.2271, lng: -80.8431 },
  { name: "Uptown", lat: 35.2271, lng: -80.8431 },
  { name: "South End", lat: 35.2085, lng: -80.8578 },
  { name: "NoDa", lat: 35.2495, lng: -80.8186 },
  { name: "Dilworth", lat: 35.2052, lng: -80.8534 },
  { name: "University Area", lat: 35.3065, lng: -80.7291 },
];

interface LocationSearchProps {
  onSelect: (name: string, lat: number, lng: number) => void;
  onClose: () => void;
}

export default function LocationSearch({ onSelect, onClose }: LocationSearchProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950">
      <div className="max-w-2xl mx-auto">
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="text-neutral-600 dark:text-neutral-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Choose Location
          </h2>
        </div>

        {/* Predefined locations */}
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
            Popular Areas
          </p>
          <div className="space-y-1">
            {PREDEFINED_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => onSelect(loc.name, loc.lat, loc.lng)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-neutral-400"
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
                <span className="text-sm text-neutral-900 dark:text-white">
                  {loc.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
