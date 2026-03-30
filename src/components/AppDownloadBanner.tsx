"use client";

import { getDownloadUrl } from "@/lib/utils";

export default function AppDownloadBanner() {
  return (
    <div className="px-3 py-6">
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950/30 dark:to-orange-950/30 rounded-xl p-5 text-center">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
          See more on DesiSphere
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Download the app for full access to listings, favourites, and more.
        </p>
        <a
          href={getDownloadUrl()}
          className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-8 2h16v2H4v-2z" />
          </svg>
          Download the App
        </a>
      </div>
    </div>
  );
}
