"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
  onImageClick: (index: number) => void;
}

export default function ImageCarousel({
  images,
  altPrefix,
  onImageClick,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const validImages = images.length > 0 ? images : [];

  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
        <svg
          className="w-12 h-12 text-neutral-300 dark:text-neutral-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="w-full aspect-square rounded-lg overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
        onClick={() => onImageClick(currentIndex)}
      >
        <Image
          src={validImages[currentIndex]}
          alt={`${altPrefix} image ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 640px"
          unoptimized
        />
      </div>

      {/* Navigation arrows */}
      {validImages.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => prev - 1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {currentIndex < validImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => prev + 1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Dots indicator */}
      {validImages.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {validImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-neutral-300 dark:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
