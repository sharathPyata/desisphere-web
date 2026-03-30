export function getRelativeTimeString(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  return `${months}mo ago`;
}

export function kmToMiles(km: number): string {
  return (km * 0.621371).toFixed(1);
}

export const APP_STORE_URL = "#";
export const PLAY_STORE_URL = "#";

export function getDownloadUrl(): string {
  if (typeof window === "undefined") return PLAY_STORE_URL;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("iphone") || ua.includes("ipad")) return APP_STORE_URL;
  return PLAY_STORE_URL;
}
