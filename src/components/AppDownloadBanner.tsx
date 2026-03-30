"use client";

import { getDownloadUrl } from "@/lib/utils";

export default function AppDownloadBanner() {
  return (
    <div className="py-10">
      <div className="border border-[--color-border] rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-[--color-primary-light] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[--color-primary]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1">
          Continue exploring on DesiSphere
        </h3>
        <p className="text-sm text-[--color-text-secondary] mb-5 max-w-sm mx-auto">
          Get the full experience with favourites, profiles, and more listings in the app.
        </p>
        <a
          href={getDownloadUrl()}
          className="inline-flex items-center gap-2 bg-[--color-primary] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[--color-primary-dark] transition-colors"
        >
          Get the app
        </a>
      </div>
    </div>
  );
}
