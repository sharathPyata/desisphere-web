import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA42m9-x6wdC0yD3nVUmvqhYVGPGP7wucc",
  authDomain: "desisphere-5e245.firebaseapp.com",
  projectId: "desisphere-5e245",
  storageBucket: "desisphere-5e245.firebasestorage.app",
  messagingSenderId: "529875788437",
  appId: "1:529875788437:android:5f2c8994831bff4690719c",
};

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

function encodeGeohash(lat: number, lng: number, precision = 10): string {
  let latRange = [-90, 90];
  let lngRange = [-180, 180];
  let hash = "";
  let bit = 0;
  let ch = 0;
  let isEven = true;

  while (hash.length < precision) {
    if (isEven) {
      const mid = (lngRange[0] + lngRange[1]) / 2;
      if (lng >= mid) { ch |= 1 << (4 - bit); lngRange[0] = mid; } else { lngRange[1] = mid; }
    } else {
      const mid = (latRange[0] + latRange[1]) / 2;
      if (lat >= mid) { ch |= 1 << (4 - bit); latRange[0] = mid; } else { latRange[1] = mid; }
    }
    isEven = !isEven;
    if (bit < 4) { bit++; } else { hash += BASE32[ch]; bit = 0; ch = 0; }
  }
  return hash;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleHomes = [
  {
    userName: "Priya Sharma",
    homeType: "Apartment",
    profilePicUrl: "",
    latitude: 35.2271,
    longitude: -80.8431,
    description: "Spacious 2BR/2BA apartment in Uptown Charlotte. Looking for a roommate to share rent. Close to Lynx Blue Line, grocery stores, and restaurants. Rent is $850/month per person including water and trash. Available from April 1st.",
    imageUrls: [],
    favoritesCount: 3,
  },
  {
    userName: "Rahul Patel",
    homeType: "House",
    profilePicUrl: "",
    latitude: 35.2085,
    longitude: -80.8578,
    description: "3BR house in South End looking for one roommate. Fully furnished common areas, private bedroom. Walking distance to South End restaurants and breweries. $750/month + utilities. Vegetarian-friendly household.",
    imageUrls: [],
    favoritesCount: 5,
  },
  {
    userName: "Ananya Reddy",
    homeType: "Condo",
    profilePicUrl: "",
    latitude: 35.2495,
    longitude: -80.8186,
    description: "Modern 2BR condo in NoDa arts district. One room available with private bathroom. In-unit washer/dryer, parking included. Great neighborhood with lots of cafes and art galleries. $900/month all inclusive.",
    imageUrls: [],
    favoritesCount: 2,
  },
  {
    userName: "Vikram Singh",
    homeType: "Townhouse",
    profilePicUrl: "",
    latitude: 35.2052,
    longitude: -80.8534,
    description: "Beautiful townhouse in Dilworth neighborhood. 2 rooms available in a 4BR home. Backyard, garage, quiet street. Close to East Blvd shops and Freedom Park. $700/month per room + split utilities. Indian family friendly.",
    imageUrls: [],
    favoritesCount: 7,
  },
  {
    userName: "Meera Krishnan",
    homeType: "Apartment",
    profilePicUrl: "",
    latitude: 35.3065,
    longitude: -80.7291,
    description: "1BR available in a 3BR apartment near UNC Charlotte. Ideal for students or young professionals. Furnished room, high-speed internet included. Close to campus and University City Blvd shopping. $550/month.",
    imageUrls: [],
    favoritesCount: 4,
  },
  {
    userName: "Arjun Desai",
    homeType: "House",
    profilePicUrl: "",
    latitude: 35.1856,
    longitude: -80.8310,
    description: "Looking for roommates for a large 5BR house in Ballantyne. Family-friendly community with pool and gym access. Great schools nearby. Two rooms available. $800/month each, utilities split. Vegetarian kitchen preferred.",
    imageUrls: [],
    favoritesCount: 6,
  },
  {
    userName: "Sneha Gupta",
    homeType: "Apartment",
    profilePicUrl: "",
    latitude: 35.2350,
    longitude: -80.8490,
    description: "Cozy studio apartment in Midtown Charlotte available for sublease. June through December. Fully furnished, pet-friendly building with gym and rooftop pool. Walking distance to restaurants. $1100/month.",
    imageUrls: [],
    favoritesCount: 1,
  },
  {
    userName: "Karthik Rao",
    homeType: "Townhouse",
    profilePicUrl: "",
    latitude: 35.2140,
    longitude: -80.7950,
    description: "3BR townhouse in Plaza Midwood. One room available immediately. Eclectic neighborhood with great food scene. Hardwood floors, updated kitchen, back patio. $725/month + 1/3 utilities. No smoking please.",
    imageUrls: [],
    favoritesCount: 3,
  },
  {
    userName: "Divya Nair",
    homeType: "Condo",
    profilePicUrl: "",
    latitude: 35.2200,
    longitude: -80.8650,
    description: "Luxury condo near Uptown with skyline views. 2BR/2BA, looking for one roommate. Building has concierge, gym, and pool. Secure parking included. Close to everything. $1050/month including HOA amenities.",
    imageUrls: [],
    favoritesCount: 8,
  },
  {
    userName: "Suresh Kumar",
    homeType: "House",
    profilePicUrl: "",
    latitude: 35.2680,
    longitude: -80.8100,
    description: "Spacious room in a family home in Highland Creek. Quiet neighborhood, great for working professionals. Indian grocery stores nearby. Home-cooked meals available optionally. $600/month all inclusive.",
    imageUrls: [],
    favoritesCount: 5,
  },
];

async function seedHomes() {
  const homesCollection = collection(db, "homes");

  for (const home of sampleHomes) {
    const geohash = encodeGeohash(home.latitude, home.longitude);
    const now = Timestamp.now();

    const docData = {
      ...home,
      geohash,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(homesCollection, docData);
    console.log(`Added: ${home.userName} (${home.homeType}) -> ${docRef.id}`);
  }

  console.log("\nDone! Added 10 sample homes in Charlotte area.");
}

seedHomes().catch(console.error);
