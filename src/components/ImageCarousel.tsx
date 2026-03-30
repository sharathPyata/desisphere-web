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
      <div className="w-full aspect-[4/3] bg-[--color-border-light] rounded-xl flex items-center justify-center">
        <svg
          className="w-10 h-10 text-[--color-text-tertiary]"
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
    <div className="relative group">
      <div
        className="w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-[--color-border-light]"
        onClick={() => onImageClick(currentIndex)}
      >
        <Image
          src={validImages[currentIndex]}
          alt={`${altPrefix} image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      </div>

      {/* Navigation arrows — visible on hover */}
      {validImages.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => prev - 1);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <svg className="w-3 h-3 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {currentIndex < validImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => prev + 1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <svg className="w-3 h-3 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Dots indicator */}
      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {validImages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-white w-2"
                  : "bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
