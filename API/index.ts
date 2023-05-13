import * as express from "express";
import { fsDb, rtDb } from "./db";
import { v4 as uuidv4 } from "uuid";
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
        res.status(400).json({ res: "User already exists" });
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
        res.status(400).json({ res: "Email not found" });
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
        const roomRef = rtDb.ref(`rooms/${uuidv4().replaceAll("-", "")}`);
        roomRef
          .set({
            messages: [0],
            owner: userId,
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = (1000 + Math.floor(Math.random() * 999)).toString();
            roomsColl
              .doc(roomId)
              .set({
                rtDbRoomId: roomLongId,
              })
              .then(() => {
                res.json({ roomId });
              });
          });
      } else {
        res.status(401).json({ res: "no existis" });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  usersColl
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsColl
          .doc(roomId)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const data = snap.data();
              res.json(data);
            } else {
              res.status(401).send("El Room solicitado NO existe");
            }
          });
      } else {
        res.status(401).send("El usuario NO existe, por favor registrese");
      }
    });
});

app.post("/messages", (req, res) => {
  const { roomId } = req.query;
  const { userName } = req.body;
  const { msg } = req.body;
  console.log(roomId, userName, "del messages", msg);

  console.log("Mensaje recibido");

  const messageListRef = rtDb.ref(`rooms/${roomId}/messages`);
  messageListRef.get().then((snap) => {
    if (snap.exists) {
      console.log("existe");
    } else {
      console.log("no existe");
    }
    console.log(snap.val());

    let messages = snap.val();
    messages.push(req.body);
    messageListRef.set(messages, () => res.json("Mensaje enviado"));
  });
});
