"use client";

import { useState } from "react";
import Image from "next/image";

interface FullScreenImageViewerProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function FullScreenImageViewer({
  images,
  initialIndex,
  onClose,
}: FullScreenImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* Navigation */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => prev - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => prev + 1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
