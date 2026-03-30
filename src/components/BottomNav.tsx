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
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[--color-border-light]">
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-16 h-[60px]">
        {/* Explore */}
        <div className="flex flex-col items-center gap-0.5 cursor-pointer">
          <svg
            className={`w-6 h-6 ${
              currentTab === "explore"
                ? "text-[--color-primary]"
                : "text-[--color-text-tertiary]"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={currentTab === "explore" ? 2.5 : 1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span
            className={`text-[10px] ${
              currentTab === "explore"
                ? "text-[--color-primary] font-bold"
                : "text-[--color-text-tertiary] font-medium"
            }`}
          >
            Explore
          </span>
        </div>

        {/* Favourites */}
        <button
          onClick={handleAppRedirect}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            className="w-6 h-6 text-[--color-text-tertiary]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="text-[10px] font-medium text-[--color-text-tertiary]">
            Favourites
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={handleAppRedirect}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            className="w-6 h-6 text-[--color-text-tertiary]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span className="text-[10px] font-medium text-[--color-text-tertiary]">
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
}
