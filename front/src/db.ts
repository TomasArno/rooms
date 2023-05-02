import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const API_BASE_URL = "http://localhost:2000";

const APP = initializeApp({
  apiKey: "FqhIRDR4EqsgWVtVAbpYR2EV06EoI05IhXftIs8x",
  databaseURL: "https://proteo-2a2ac-default-rtdb.firebaseio.com/",
  authDomain: "proteo-2a2ac.firebaseapp.com",
  projectId: "proteo-2a2ac",
});

const rtDb = getDatabase(APP);
const dB = getFirestore(APP);

export { rtDb, dB, API_BASE_URL };
