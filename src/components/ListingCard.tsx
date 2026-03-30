"use client";

import ImageCarousel from "./ImageCarousel";
import { getRelativeTimeString, kmToMiles, getDownloadUrl } from "@/lib/utils";

interface ListingCardProps {
  name: string;
  type: string;
  profilePicUrl: string;
  imageUrls: string[];
  description: string;
  distance: number;
  updatedAt: number;
  favoritesCount: number;
  onImageClick: (images: string[], index: number) => void;
}

export default function ListingCard({
  name,
  type,
  imageUrls,
  description,
  distance,
  updatedAt,
  favoritesCount,
  onImageClick,
}: ListingCardProps) {
  const handleAppRedirect = () => {
    window.location.href = getDownloadUrl();
  };

  return (
    <article className="group">
      {/* Image with heart overlay */}
      <div className="relative">
        <ImageCarousel
          images={imageUrls}
          altPrefix={name}
          onImageClick={(index) => onImageClick(imageUrls, index)}
        />

        {/* Heart button overlay */}
        <button
          onClick={handleAppRedirect}
          className="absolute top-3 right-3 z-10"
        >
          <svg
            className="w-7 h-7 drop-shadow-md"
            fill="rgba(0,0,0,0.5)"
            stroke="white"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="mt-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-[--color-text-primary] leading-tight">
            {name}
          </h3>
          {favoritesCount > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-[--color-text-primary]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm text-[--color-text-primary]">{favoritesCount}</span>
            </div>
          )}
        </div>

        {/* Type */}
        <p className="text-sm text-[--color-text-secondary] mt-0.5">
          {type}
        </p>

        {/* Distance */}
        <p className="text-sm text-[--color-text-secondary] mt-0.5">
          {kmToMiles(distance)} miles away
        </p>

        {/* Description */}
        {description && (
          <p className="text-sm text-[--color-text-secondary] mt-1 line-clamp-2">
            {description}
          </p>
        )}

        {/* Updated time */}
        <p className="text-sm mt-1">
          <span className="text-[--color-text-secondary]">Updated </span>
          <span className="text-[--color-text-primary] font-medium">
            {getRelativeTimeString(updatedAt)}
          </span>
        </p>
      </div>
    </article>
  );
}
