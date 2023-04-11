import { rtDb, API_BASE_URL, roomId } from "./db";
import map from "lodash/map";
export const state = {
  data: {
    userName: "",
    messagesList: [],
  },
  listeners: [],

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  connectChatroom() {
    const chatRoomsRef = rtDb.ref(`/chatroom/${roomId}/messages`);
    const lastState = this.getState();

    chatRoomsRef.on("value", (snapshot) => {
      const messages = snapshot.val(); // extraigo la data del snapshot
      lastState.messagesList = messages;
      this.setState(lastState);
    });
  },
  setName(name: string) {
    const lastState = state.getState();
    lastState.userName = name;
    state.setState(lastState);
  },
  sendMessage(newMsg) {
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMsg),
    });
  },
};
