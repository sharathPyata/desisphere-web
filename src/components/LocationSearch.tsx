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
    <div className="fixed inset-0 z-50 bg-[--color-background]">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 h-16 border-b border-[--color-border-light]">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[--color-border] hover:shadow-md transition-shadow"
          >
            <svg className="w-4 h-4 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-base font-semibold text-[--color-text-primary]">
            Where to?
          </h2>
        </div>

        {/* Location cards */}
        <div className="px-6 py-6">
          <p className="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-4">
            Popular areas
          </p>
          <div className="space-y-1">
            {PREDEFINED_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => onSelect(loc.name, loc.lat, loc.lng)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-[--color-hover] transition-colors"
              >
                <div className="w-12 h-12 bg-[--color-border-light] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[--color-text-primary]"
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
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[--color-text-primary]">
                    {loc.name}
                  </p>
                  <p className="text-xs text-[--color-text-secondary]">
                    Charlotte, NC
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
