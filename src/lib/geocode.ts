export interface GeoResult {
  name: string;
  lat: number;
  lng: number;
}

const PREDEFINED: GeoResult[] = [
  { name: "Charlotte, NC", lat: 35.2271, lng: -80.8431 },
  { name: "Uptown, Charlotte", lat: 35.2271, lng: -80.8431 },
  { name: "South End, Charlotte", lat: 35.2085, lng: -80.8578 },
  { name: "NoDa, Charlotte", lat: 35.2495, lng: -80.8186 },
  { name: "Dilworth, Charlotte", lat: 35.2052, lng: -80.8534 },
  { name: "University Area, Charlotte", lat: 35.3065, lng: -80.7291 },
  { name: "Ballantyne, Charlotte", lat: 35.0535, lng: -80.8459 },
  { name: "Mint Hill, NC", lat: 35.1796, lng: -80.6473 },
  { name: "Matthews, NC", lat: 35.1168, lng: -80.7237 },
  { name: "Huntersville, NC", lat: 35.4107, lng: -80.8429 },
];

export function filterPredefined(query: string): GeoResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return PREDEFINED.slice(0, 6);
  return PREDEFINED.filter((loc) => loc.name.toLowerCase().includes(q));
}

export async function geocodeSearch(query: string): Promise<GeoResult[]> {
  const q = query.trim();
  if (!q) return [];

  try {
    const params = new URLSearchParams({
      q,
      format: "json",
      limit: "5",
      countrycodes: "us",
    });

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: { "User-Agent": "DesiSphere-Web/1.0" },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.map((item: { display_name: string; lat: string; lon: string }) => ({
      name: item.display_name.split(",").slice(0, 2).join(",").trim(),
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch {
    return [];
  }
}
