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

const sampleServices = [
  {
    userName: "Ravi Mehta",
    serviceType: "Tax Preparation",
    profilePicUrl: "",
    latitude: 35.2271,
    longitude: -80.8431,
    description: "CPA with 10+ years experience. Specializing in individual and small business tax returns. Familiar with H1B, OPT, and international tax situations. Free consultation for first-time clients. Available evenings and weekends during tax season.",
    imageUrls: [],
    favoritesCount: 12,
  },
  {
    userName: "Lakshmi Iyer",
    serviceType: "Mehendi Artist",
    profilePicUrl: "",
    latitude: 35.2085,
    longitude: -80.8578,
    description: "Professional mehendi/henna artist for weddings, engagements, baby showers, and festivals. Traditional and modern designs. Serving Charlotte and surrounding areas. Book early for wedding season! Portfolio available on request.",
    imageUrls: [],
    favoritesCount: 8,
  },
  {
    userName: "Amit Joshi",
    serviceType: "Real Estate Agent",
    profilePicUrl: "",
    latitude: 35.2495,
    longitude: -80.8186,
    description: "Licensed real estate agent helping the South Asian community find their dream homes in Charlotte. Specializing in Ballantyne, South End, and University area. First-time homebuyer guidance. Fluent in Hindi, Gujarati, and English.",
    imageUrls: [],
    favoritesCount: 6,
  },
  {
    userName: "Pooja Verma",
    serviceType: "Tutoring",
    profilePicUrl: "",
    latitude: 35.2052,
    longitude: -80.8534,
    description: "Math and Science tutoring for grades 6-12. SAT/ACT prep available. MS in Education from UNC Charlotte. In-person (Dilworth area) or online sessions. $40/hour. Group discounts available. Free trial session for new students.",
    imageUrls: [],
    favoritesCount: 4,
  },
  {
    userName: "Sanjay Kulkarni",
    serviceType: "Photography",
    profilePicUrl: "",
    latitude: 35.3065,
    longitude: -80.7291,
    description: "Professional photographer specializing in Indian weddings, pre-wedding shoots, and family portraits. Drone photography available. Competitive packages starting at $500. Serving Charlotte, Raleigh, and Atlanta areas.",
    imageUrls: [],
    favoritesCount: 9,
  },
  {
    userName: "Neha Agarwal",
    serviceType: "Yoga Instructor",
    profilePicUrl: "",
    latitude: 35.2350,
    longitude: -80.8490,
    description: "Certified yoga instructor offering private and group classes. Hatha, Vinyasa, and Pranayama. Morning and evening batches in Midtown Charlotte. Special classes for beginners and seniors. First class free!",
    imageUrls: [],
    favoritesCount: 5,
  },
  {
    userName: "Rajesh Pandey",
    serviceType: "Immigration Consultant",
    profilePicUrl: "",
    latitude: 35.2140,
    longitude: -80.7950,
    description: "Immigration consulting services for H1B, Green Card, OPT, and family sponsorship. 15+ years experience. Not a law firm - consultation and document preparation services. Evening appointments available. Call for free initial consultation.",
    imageUrls: [],
    favoritesCount: 11,
  },
  {
    userName: "Kavitha Raman",
    serviceType: "Catering",
    profilePicUrl: "",
    latitude: 35.1856,
    longitude: -80.8310,
    description: "Authentic South Indian and North Indian catering for parties, pujas, and events. Vegetarian and non-vegetarian menus. Minimum order 20 people. Delivery and setup included in Charlotte area. Homestyle cooking with fresh ingredients.",
    imageUrls: [],
    favoritesCount: 7,
  },
  {
    userName: "Deepak Bansal",
    serviceType: "Auto Repair",
    profilePicUrl: "",
    latitude: 35.2200,
    longitude: -80.8650,
    description: "Honest and affordable auto repair shop near Uptown. Oil changes, brake service, AC repair, and general maintenance. Fair prices, no upselling. Loaner car available for major repairs. Hindi and Punjabi spoken.",
    imageUrls: [],
    favoritesCount: 3,
  },
  {
    userName: "Sunita Chopra",
    serviceType: "Dance Classes",
    profilePicUrl: "",
    latitude: 35.2680,
    longitude: -80.8100,
    description: "Bollywood and classical dance classes for kids and adults. Weekly classes in Highland Creek community center. Annual recital and competition opportunities. Ages 4 and up. Registration open for spring batch. $60/month.",
    imageUrls: [],
    favoritesCount: 6,
  },
];

const sampleEvents = [
  {
    userName: "Charlotte Desi Community",
    eventType: "Festival",
    profilePicUrl: "",
    latitude: 35.2271,
    longitude: -80.8431,
    description: "Annual Holi celebration at Freedom Park! Colors, music, food stalls, and Bollywood DJ. Bring the whole family. Free entry, colors available for purchase. Food vendors from local Indian restaurants. March 30th, 11 AM - 4 PM.",
    imageUrls: [],
    favoritesCount: 25,
  },
  {
    userName: "CLT Telugu Association",
    eventType: "Cultural Program",
    profilePicUrl: "",
    latitude: 35.2085,
    longitude: -80.8578,
    description: "Ugadi celebrations with cultural performances, traditional food, and kids activities. Venue: South End Community Hall. April 6th, 5 PM onwards. Tickets: $15 adults, kids under 10 free. Dinner included.",
    imageUrls: [],
    favoritesCount: 14,
  },
  {
    userName: "Desi Professionals CLT",
    eventType: "Networking",
    profilePicUrl: "",
    latitude: 35.2495,
    longitude: -80.8186,
    description: "Monthly networking mixer for South Asian professionals in Charlotte. This month at a rooftop bar in NoDa. Great opportunity to connect with tech, finance, and healthcare professionals. Light appetizers and first drink included. April 12th, 6-9 PM.",
    imageUrls: [],
    favoritesCount: 10,
  },
  {
    userName: "Charlotte Cricket League",
    eventType: "Sports",
    profilePicUrl: "",
    latitude: 35.3065,
    longitude: -80.7291,
    description: "Spring cricket league registration now open! Games every Saturday and Sunday at University area grounds. Teams of 11, tape ball format. Season runs April through July. Registration fee $50 per player. All skill levels welcome.",
    imageUrls: [],
    favoritesCount: 18,
  },
  {
    userName: "Spicewood Kitchen",
    eventType: "Workshop",
    profilePicUrl: "",
    latitude: 35.2052,
    longitude: -80.8534,
    description: "Learn to make authentic South Indian dosas and chutneys! Hands-on cooking workshop in Dilworth. All ingredients provided. Take home recipe cards and leftover food. Limited to 12 participants. April 20th, 10 AM - 1 PM. $35 per person.",
    imageUrls: [],
    favoritesCount: 8,
  },
  {
    userName: "Bollywood Nights CLT",
    eventType: "Concert",
    profilePicUrl: "",
    latitude: 35.2350,
    longitude: -80.8490,
    description: "Live Bollywood music night featuring local artists performing your favorite hits from the 90s to today! Venue: The Music Yard, Midtown. April 26th, 7 PM. Tickets $25 advance, $35 at door. Food and drinks available for purchase.",
    imageUrls: [],
    favoritesCount: 15,
  },
  {
    userName: "Hindu Temple of Charlotte",
    eventType: "Religious",
    profilePicUrl: "",
    latitude: 35.1856,
    longitude: -80.8310,
    description: "Ram Navami celebrations at the Hindu Temple. Special puja at 10 AM followed by cultural program and prasadam lunch. Everyone welcome. No entry fee. Parking available. Please bring your own plates to reduce waste. April 17th.",
    imageUrls: [],
    favoritesCount: 12,
  },
  {
    userName: "Desi Kids Charlotte",
    eventType: "Kids",
    profilePicUrl: "",
    latitude: 35.2140,
    longitude: -80.7950,
    description: "Kids Rangoli and art workshop at Plaza Midwood studio. Ages 5-12. Learn traditional Indian art forms with modern twists. All materials provided. Light snacks included. April 13th, 2-4 PM. $20 per child. Siblings get 50% off.",
    imageUrls: [],
    favoritesCount: 6,
  },
  {
    userName: "CLT Badminton Club",
    eventType: "Sports",
    profilePicUrl: "",
    latitude: 35.2200,
    longitude: -80.8650,
    description: "Weekly badminton sessions every Wednesday and Friday evening, 7-9 PM at Uptown Recreation Center. All levels welcome. Rackets available to borrow. Drop-in fee $5 or monthly membership $30. Great way to stay active and meet people!",
    imageUrls: [],
    favoritesCount: 9,
  },
  {
    userName: "Charlotte Tamil Sangam",
    eventType: "Cultural Program",
    profilePicUrl: "",
    latitude: 35.2680,
    longitude: -80.8100,
    description: "Tamil New Year (Puthandu) celebration! Traditional kolam competition, classical dance performances, and authentic Tamil feast. April 14th at Highland Creek clubhouse, 4 PM onwards. Family event. RSVP required. $10 per family.",
    imageUrls: [],
    favoritesCount: 11,
  },
];

async function seed() {
  const now = Timestamp.now();

  console.log("Seeding services...");
  for (const svc of sampleServices) {
    const geohash = encodeGeohash(svc.latitude, svc.longitude);
    const docRef = await addDoc(collection(db, "services"), { ...svc, geohash, createdAt: now, updatedAt: now });
    console.log(`  Added: ${svc.userName} (${svc.serviceType}) -> ${docRef.id}`);
  }

  console.log("\nSeeding events...");
  for (const evt of sampleEvents) {
    const geohash = encodeGeohash(evt.latitude, evt.longitude);
    const docRef = await addDoc(collection(db, "events"), { ...evt, geohash, createdAt: now, updatedAt: now });
    console.log(`  Added: ${evt.userName} (${evt.eventType}) -> ${docRef.id}`);
  }

  console.log("\nDone! Added 10 services and 10 events.");
}

seed().catch(console.error);
