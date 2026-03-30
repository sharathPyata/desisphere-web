export interface Home {
  id: string;
  userName: string;
  homeType: string;
  profilePicUrl: string;
  latitude: number;
  longitude: number;
  geohash: string;
  imageUrls: string[];
  favoritesCount: number;
  description: string;
  distance: number;
  createdAt: number;
  updatedAt: number;
}

export interface Restaurant {
  id: string;
  businessName: string;
  businessType: string;
  profilePicUrl: string;
  latitude: number;
  longitude: number;
  geohash: string;
  imageUrls: string[];
  favoritesCount: number;
  description: string;
  distance: number;
  createdAt: number;
  updatedAt: number;
}

export interface Service {
  id: string;
  userName: string;
  serviceType: string;
  profilePicUrl: string;
  latitude: number;
  longitude: number;
  geohash: string;
  imageUrls: string[];
  favoritesCount: number;
  description: string;
  distance: number;
  createdAt: number;
  updatedAt: number;
}

export interface Event {
  id: string;
  userName: string;
  eventType: string;
  profilePicUrl: string;
  latitude: number;
  longitude: number;
  geohash: string;
  imageUrls: string[];
  favoritesCount: number;
  description: string;
  distance: number;
  createdAt: number;
  updatedAt: number;
}

export type ListingItem = Home | Restaurant | Service | Event;

export type TabType = "homes" | "food" | "services" | "events";
