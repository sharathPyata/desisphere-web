"use client";

import { getDownloadUrl } from "@/lib/utils";

interface BottomNavProps {
  currentTab: "explore" | "favourites" | "profile";
}

export default function BottomNav({ currentTab }: BottomNavProps) {
  const handleAppRedirect = () => {
    window.location.href = getDownloadUrl();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16">
        {/* Explore - active */}
        <div className="flex flex-col items-center gap-0.5">
          <svg
            className={`w-6 h-6 ${
              currentTab === "explore"
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-400"
            }`}
            fill={currentTab === "explore" ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={currentTab === "explore" ? 0 : 1.5}
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <span
            className={`text-[10px] ${
              currentTab === "explore"
                ? "text-neutral-900 dark:text-white font-medium"
                : "text-neutral-400"
            }`}
          >
            Explore
          </span>
        </div>

        {/* Favourites - redirects to app */}
        <button
          onClick={handleAppRedirect}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            className="w-6 h-6 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="text-[10px] text-neutral-400">Favourites</span>
        </button>

        {/* Profile - redirects to app */}
        <button
          onClick={handleAppRedirect}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            className="w-6 h-6 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span className="text-[10px] text-neutral-400">Profile</span>
        </button>
      </div>
    </nav>
  );
}
