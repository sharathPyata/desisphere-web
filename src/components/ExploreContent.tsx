"use client";

import { useState, useEffect, useCallback } from "react";
import type { TabType, Home, Restaurant, Service, Event } from "@/types";
import {
  fetchNearbyHomes,
  fetchNearbyRestaurants,
  fetchNearbyServices,
  fetchNearbyEvents,
} from "@/lib/firestore";
import Header from "./Header";
import ExploreTabs from "./ExploreTabs";
import ListingCard from "./ListingCard";
import AppDownloadBanner from "./AppDownloadBanner";
import BottomNav from "./BottomNav";
import FullScreenImageViewer from "./FullScreenImageViewer";
import AppPromptModal from "./AppPromptModal";

const DEFAULT_LOCATION = { name: "Charlotte", lat: 35.2271, lng: -80.8431 };

interface TabData {
  homes: Home[];
  food: Restaurant[];
  services: Service[];
  events: Event[];
}

interface TabLoading {
  homes: boolean;
  food: boolean;
  services: boolean;
  events: boolean;
}

export default function ExploreContent() {
  const [activeTab, setActiveTab] = useState<TabType>("food");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [data, setData] = useState<TabData>({
    homes: [],
    food: [],
    services: [],
    events: [],
  });
  const [loading, setLoading] = useState<TabLoading>({
    homes: false,
    food: false,
    services: false,
    events: false,
  });
  const [loadedTabs, setLoadedTabs] = useState<Set<TabType>>(new Set());
  const [viewer, setViewer] = useState<{
    images: string[];
    index: number;
  } | null>(null);
  const [promptMessage, setPromptMessage] = useState<string | null>(null);

  const loadTab = useCallback(
    async (tab: TabType, lat: number, lng: number) => {
      setLoading((prev) => ({ ...prev, [tab]: true }));
      try {
        let items: Home[] | Restaurant[] | Service[] | Event[];
        switch (tab) {
          case "homes":
            items = await fetchNearbyHomes(lat, lng, 10);
            break;
          case "food":
            items = await fetchNearbyRestaurants(lat, lng, 10);
            break;
          case "services":
            items = await fetchNearbyServices(lat, lng, 10);
            break;
          case "events":
            items = await fetchNearbyEvents(lat, lng, 10);
            break;
        }
        setData((prev) => ({ ...prev, [tab]: items }));
        setLoadedTabs((prev) => new Set(prev).add(tab));
      } catch (err) {
        console.error(`Error loading ${tab}:`, err);
      } finally {
        setLoading((prev) => ({ ...prev, [tab]: false }));
      }
    },
    []
  );

  useEffect(() => {
    if (!loadedTabs.has(activeTab)) {
      loadTab(activeTab, location.lat, location.lng);
    }
  }, [activeTab, loadedTabs, loadTab, location]);

  const handleLocationChange = (name: string, lat: number, lng: number) => {
    setLocation({ name, lat, lng });
    setLoadedTabs(new Set());
    setData({ homes: [], food: [], services: [], events: [] });
  };

  const currentItems = data[activeTab];
  const isLoading = loading[activeTab];

  return (
    <div className="min-h-screen bg-[--color-background] pb-20">
      <Header
        locationName={location.name}
        onLocationChange={handleLocationChange}
      />
      <ExploreTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-[--color-border-light] border-t-[--color-primary] rounded-full animate-spin" />
            <p className="mt-3 text-sm text-[--color-text-secondary]">
              Loading nearby {activeTab === "food" ? "restaurants" : activeTab}...
            </p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ minHeight: "calc(100vh - 190px)" }}
            <svg
              className="w-12 h-12 text-[--color-border] mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <p className="text-sm font-medium text-[--color-text-primary]">
              No {activeTab === "food" ? "restaurants" : activeTab} nearby
            </p>
            <p className="text-xs text-[--color-text-secondary] mt-1">
              Try a different location
            </p>
          </div>
        ) : (
          <>
            {currentItems.map((item) => {
              const isRestaurant = "businessName" in item;
              return (
                <ListingCard
                  key={item.id}
                  name={
                    isRestaurant
                      ? (item as Restaurant).businessName
                      : (item as Home | Service | Event).userName
                  }
                  type={
                    isRestaurant
                      ? (item as Restaurant).businessType
                      : "homeType" in item
                        ? (item as Home).homeType
                        : "serviceType" in item
                          ? (item as Service).serviceType
                          : (item as Event).eventType
                  }
                  profilePicUrl={item.profilePicUrl}
                  imageUrls={item.imageUrls}
                  description={item.description}
                  distance={item.distance}
                  updatedAt={item.updatedAt}
                  favoritesCount={item.favoritesCount}
                  onImageClick={(images, index) =>
                    setViewer({ images, index })
                  }
                  onAppPrompt={(msg) => setPromptMessage(msg)}
                />
              );
            })}
            <AppDownloadBanner />
          </>
        )}
      </main>

      <BottomNav
        currentTab="explore"
        onAppPrompt={(msg) => setPromptMessage(msg)}
      />

      {viewer && (
        <FullScreenImageViewer
          images={viewer.images}
          initialIndex={viewer.index}
          onClose={() => setViewer(null)}
        />
      )}

      {promptMessage && (
        <AppPromptModal
          message={promptMessage}
          onClose={() => setPromptMessage(null)}
        />
      )}
    </div>
  );
}
