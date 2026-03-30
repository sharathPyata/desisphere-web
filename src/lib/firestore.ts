import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Home, Restaurant, Service, Event } from "@/types";
import { getGeoHashRange, getDistanceKm } from "./geo";

function parseTimestamp(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  return Date.now();
}

async function fetchNearbyDocs<T>(
  collectionName: string,
  lat: number,
  lng: number,
  limit: number,
  parser: (id: string, data: Record<string, unknown>) => T & { distance: number }
): Promise<T[]> {
  const radiusKm = 50;
  const bounds = getGeoHashRange(lat, lng, radiusKm);
  const allItems: (T & { distance: number })[] = [];

  for (const bound of bounds) {
    const q = query(
      collection(db, collectionName),
      orderBy("geohash"),
      startAt(bound.start),
      endAt(bound.end)
    );

    const snapshot = await getDocs(q);
    for (const doc of snapshot.docs) {
      const data = doc.data() as Record<string, unknown>;
      const itemLat = (data.latitude as number) || 0;
      const itemLng = (data.longitude as number) || 0;
      const distance = getDistanceKm(lat, lng, itemLat, itemLng);

      if (distance <= radiusKm) {
        allItems.push(parser(doc.id, data));
      }
    }
  }

  const unique = Array.from(new Map(allItems.map((item) => [(item as unknown as { id: string }).id, item])).values());
  unique.sort((a, b) => a.distance - b.distance);
  return unique.slice(0, limit) as T[];
}

export async function fetchNearbyHomes(lat: number, lng: number, limit = 10): Promise<Home[]> {
  return fetchNearbyDocs<Home>("homes", lat, lng, limit, (id, data) => ({
    id,
    userName: (data.userName as string) || "",
    homeType: (data.homeType as string) || "Home",
    profilePicUrl: (data.profilePicUrl as string) || "",
    latitude: (data.latitude as number) || 0,
    longitude: (data.longitude as number) || 0,
    geohash: (data.geohash as string) || "",
    imageUrls: (data.imageUrls as string[]) || [],
    favoritesCount: (data.favoritesCount as number) || 0,
    description: (data.description as string) || "",
    distance: getDistanceKm(lat, lng, (data.latitude as number) || 0, (data.longitude as number) || 0),
    createdAt: parseTimestamp(data.createdAt),
    updatedAt: parseTimestamp(data.updatedAt),
  }));
}

export async function fetchNearbyRestaurants(lat: number, lng: number, limit = 10): Promise<Restaurant[]> {
  return fetchNearbyDocs<Restaurant>("restaurants", lat, lng, limit, (id, data) => ({
    id,
    businessName: (data.businessName as string) || "",
    businessType: (data.businessType as string) || "Restaurant",
    profilePicUrl: (data.profilePicUrl as string) || "",
    latitude: (data.latitude as number) || 0,
    longitude: (data.longitude as number) || 0,
    geohash: (data.geohash as string) || "",
    imageUrls: (data.imageUrls as string[]) || [],
    favoritesCount: (data.favoritesCount as number) || 0,
    description: (data.description as string) || "",
    distance: getDistanceKm(lat, lng, (data.latitude as number) || 0, (data.longitude as number) || 0),
    createdAt: parseTimestamp(data.createdAt),
    updatedAt: parseTimestamp(data.updatedAt),
  }));
}

export async function fetchNearbyServices(lat: number, lng: number, limit = 10): Promise<Service[]> {
  return fetchNearbyDocs<Service>("services", lat, lng, limit, (id, data) => ({
    id,
    userName: (data.userName as string) || "",
    serviceType: (data.serviceType as string) || "Service",
    profilePicUrl: (data.profilePicUrl as string) || "",
    latitude: (data.latitude as number) || 0,
    longitude: (data.longitude as number) || 0,
    geohash: (data.geohash as string) || "",
    imageUrls: (data.imageUrls as string[]) || [],
    favoritesCount: (data.favoritesCount as number) || 0,
    description: (data.description as string) || "",
    distance: getDistanceKm(lat, lng, (data.latitude as number) || 0, (data.longitude as number) || 0),
    createdAt: parseTimestamp(data.createdAt),
    updatedAt: parseTimestamp(data.updatedAt),
  }));
}

export async function fetchNearbyEvents(lat: number, lng: number, limit = 10): Promise<Event[]> {
  return fetchNearbyDocs<Event>("events", lat, lng, limit, (id, data) => ({
    id,
    userName: (data.userName as string) || "",
    eventType: (data.eventType as string) || "Event",
    profilePicUrl: (data.profilePicUrl as string) || "",
    latitude: (data.latitude as number) || 0,
    longitude: (data.longitude as number) || 0,
    geohash: (data.geohash as string) || "",
    imageUrls: (data.imageUrls as string[]) || [],
    favoritesCount: (data.favoritesCount as number) || 0,
    description: (data.description as string) || "",
    distance: getDistanceKm(lat, lng, (data.latitude as number) || 0, (data.longitude as number) || 0),
    createdAt: parseTimestamp(data.createdAt),
    updatedAt: parseTimestamp(data.updatedAt),
  }));
}
