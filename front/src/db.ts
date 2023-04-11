import firebase from "firebase";

const API_BASE_URL = "http://localhost:2000";

const APP = firebase.initializeApp({
  apiKey: "FqhIRDR4EqsgWVtVAbpYR2EV06EoI05IhXftIs8x",
  databaseURL: "https://proteo-2a2ac-default-rtdb.firebaseio.com/",
  authDomain: "proteo-2a2ac.firebaseapp.com",
});

const rtDb = firebase.database();
const roomId = "372125b4-bf80-4c9c-a79b-2e6debf81291";

export { rtDb, API_BASE_URL, roomId };
