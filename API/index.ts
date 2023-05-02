import * as express from "express";
import { fsDb, rtDb } from "./db";
import { uuid } from "uuid";
import * as cors from "cors";

const app = express();
const port = 2000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});

const usersColl = fsDb.collection("users");
const roomsColl = fsDb.collection("rooms");

app.post("/signup", (req, res) => {
  const { email } = req.body;
  const { name } = req.body;
  usersColl
    .where("email", "==", email)
    .get()
    .then((searchedEmail) => {
      if (searchedEmail.empty) {
        usersColl
          .add({
            email,
            name,
          })
          .then((userRef) => {
            res.json({ id: userRef.id, new: true });
          });
      } else {
        res.status(400).send("User already exists");
      }
    });
});

app.post("/auth", (req, res) => {
  const { email } = req.body;

  usersColl
    .where("email", "==", email)
    .get()
    .then((searchedEmail) => {
      if (searchedEmail.empty) {
        res.status(400).send("Email not found");
      } else {
        res.json({ id: searchedEmail.docs[0].id });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  usersColl
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtDb.ref(`rooms/${uuid()}`);
        roomRef
          .set({
            messages: [],
            owner: userId,
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999).toString();
            roomsColl
              .doc(roomId)
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({ id: roomId });
              });
          });
      } else {
        res.status(401).send("no existis");
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  console.log(userId, typeof userId); // revisar

  usersColl
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsColl
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).send("no existis");
      }
    });
});
