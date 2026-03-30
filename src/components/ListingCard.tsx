"use client";

import Image from "next/image";
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
  profilePicUrl,
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
    <article className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex-shrink-0">
          {profilePicUrl ? (
            <Image
              src={profilePicUrl}
              alt={name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
            {name}
          </p>
          {type && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {type}
            </p>
          )}
        </div>
        <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Image Carousel */}
      <div className="px-3">
        <ImageCarousel
          images={imageUrls}
          altPrefix={name}
          onImageClick={(index) => onImageClick(imageUrls, index)}
        />
      </div>

      {/* Actions Row */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Like - redirects to app */}
          <button
            onClick={handleAppRedirect}
            className="p-1 text-neutral-700 dark:text-neutral-300 hover:text-red-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          {/* Share */}
          <button className="p-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </button>
        </div>

        {/* Distance + Time */}
        <div className="flex items-center gap-4 text-xs">
          <div className="text-right">
            <p className="text-neutral-900 dark:text-white font-medium">
              {kmToMiles(distance)}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">miles</p>
          </div>
          <div className="text-right">
            <p className="text-neutral-900 dark:text-white font-medium">
              {getRelativeTimeString(updatedAt)}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">updated</p>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="px-3 pb-3">
          <p className="text-sm text-neutral-900 dark:text-white line-clamp-3">
            {description}
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="border-b border-neutral-100 dark:border-neutral-800" />
    </article>
  );
}
