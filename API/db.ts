import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://proteo-2a2ac-default-rtdb.firebaseio.com",
});

const rtDb = admin.database();
const fsDb = admin.firestore();

const roomId = "372125b4-bf80-4c9c-a79b-2e6debf81291";

export { fsDb, rtDb, roomId };
