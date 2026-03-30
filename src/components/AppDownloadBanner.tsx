"use client";

import { getDownloadUrl } from "@/lib/utils";

export default function AppDownloadBanner() {
  return (
    <div className="py-10 px-4 text-center">
      <h3 className="text-[17px] font-semibold text-[--color-text-primary] mb-2">
        Continue exploring on DesiSphere
      </h3>
      <p className="text-sm text-[--color-text-secondary] mb-6 leading-relaxed max-w-xs mx-auto">
        Get the full experience with favourites, profiles, and more listings in the app.
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        {/* iOS */}
        <a
          href={getDownloadUrl()}
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors border border-neutral-800"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download for iOS
        </a>

        {/* Android - Disabled */}
        <button
          disabled
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-neutral-200 text-neutral-300 text-sm font-semibold cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.6 11.48l1.84-3.18c.16-.31.04-.69-.26-.85-.31-.16-.69-.04-.85.26l-1.87 3.23C15 10.34 13.54 10 12 10s-3 .34-4.46.94L5.67 7.71c-.16-.31-.54-.43-.85-.26-.31.16-.43.54-.26.85l1.84 3.18C2.93 13.6 0 17.47 0 22h24c0-4.53-2.93-8.4-6.4-10.52zM7 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
          Android coming soon
        </button>
      </div>
    </div>
  );
}
