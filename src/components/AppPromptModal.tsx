"use client";

import { getDownloadUrl } from "@/lib/utils";

interface AppPromptModalProps {
  message: string;
  onClose: () => void;
}

export default function AppPromptModal({ message, onClose }: AppPromptModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm mx-auto p-6 pb-8 sm:pb-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* App icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[--color-primary] to-[#ff6b81] flex items-center justify-center">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
        </div>

        <h3 className="text-[17px] font-semibold text-[--color-text-primary] text-center mb-1">
          Available on the app
        </h3>
        <p className="text-sm text-[--color-text-secondary] text-center mb-5 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col gap-2.5">
          <a
            href={getDownloadUrl()}
            className="w-full py-3 rounded-xl bg-[--color-primary] text-white text-sm font-semibold text-center hover:bg-[--color-primary-dark] transition-colors"
          >
            Get the App
          </a>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-medium text-[--color-text-secondary] hover:bg-neutral-50 transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
