"use client";

import Image from "next/image";
import ImageCarousel from "./ImageCarousel";
import { kmToMiles } from "@/lib/utils";

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
  onAppPrompt: (message: string) => void;
}

export default function ListingCard({
  name,
  profilePicUrl,
  imageUrls,
  description,
  distance,
  favoritesCount,
  onImageClick,
  onAppPrompt,
}: ListingCardProps) {
  return (
    <article className="bg-[--color-background]">
      {/* Header: profile pic + name + distance + more */}
      <div className="flex items-center gap-3 px-4 py-2.5">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
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
          <p className="text-[15px] font-semibold text-[--color-text-primary] truncate">
            {name}
          </p>
        </div>
        <span className="text-sm text-[--color-text-secondary] flex-shrink-0">
          {kmToMiles(distance)} mi
        </span>
        <button className="text-[--color-text-secondary] flex-shrink-0 -mr-1">
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

      {/* Actions Row: like + count on left, share on right */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAppPrompt("Save your favourite listings and never miss an update. Download the app to start building your wishlist.")}
            className="text-[--color-text-primary] hover:text-[--color-primary] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          {favoritesCount > 0 && (
            <span className="text-sm text-[--color-text-primary]">
              {favoritesCount}
            </span>
          )}
        </div>
        <button className="text-[--color-text-primary] hover:text-[--color-text-secondary] transition-colors">
          <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 pb-3">
          <p className="text-sm text-[--color-text-primary] line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Light divider between cards */}
      <div className="h-[0.5px] bg-neutral-200 mx-0" />
    </article>
  );
}
