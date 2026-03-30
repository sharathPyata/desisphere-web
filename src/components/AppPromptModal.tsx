"use client";

import { useEffect } from "react";
import { getDownloadUrl } from "@/lib/utils";

interface AppPromptModalProps {
  message: string;
  onClose: () => void;
}

export default function AppPromptModal({ message, onClose }: AppPromptModalProps) {
  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm mx-auto p-6 pb-8 sm:pb-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[17px] font-semibold text-[--color-text-primary] text-center mb-2">
          Available on the app
        </h3>
        <p className="text-sm text-[--color-text-secondary] text-center mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          {/* iOS */}
          <a
            href={getDownloadUrl()}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-[--color-text-primary] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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

        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-[--color-text-secondary] hover:bg-neutral-50 transition-colors"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
