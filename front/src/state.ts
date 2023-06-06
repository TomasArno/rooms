import { API_BASE_URL, rtDb } from "./db";
type message = { roomId: string; userName: string; msg: any };
type newState = {
  userName: string;
  longRoomId: string;
  shortRoomId: string;
  messagesList: any;
};
type formData = {
  email: string;
  name: string;
  action: string;
  shortRoomId: string;
};
export const state = {
  data: {
    userName: "",
    longRoomId: "",
    shortRoomId: "",
    messagesList: [],
  },
  listeners: [],

  getState() {
    return this.data;
  },
  setState(newState: newState) {
    this.data = newState;
    for (const cb of this.listeners as any) {
      cb();
    }
  },
  subscribe(callback: (any: any) => any) {
    console.log("soy el suscribe");

    this.listeners.push(callback);
  },
  connectChatroom() {
    console.log("me conecto al chatroom");

    const chatRoomsRef = rtDb.ref(`/rooms/${this.data.longRoomId}/messages`);
    const lastState = this.getState();

    chatRoomsRef.on("value", (snapshot) => {
      console.log("CAMBIOS");
      const messages = snapshot.val() as [];

      console.log(messages);

      lastState.messagesList = messages.slice(1, messages.length);
      console.log(lastState.messagesList);

      this.setState(lastState);
    });
  },
  async main(formData: formData) {
    console.log("recibí data: ", formData);

    const authState = await this.auth(formData);
    let userId;

    if (authState.status == 400) {
      const signUp = await this.signUp(formData);
      const signState = await signUp.json();
      userId = signState.id;
      console.log("Autenticación fallida, este es su nuevo id: " + userId);
    } else {
      const authData = await authState.json();
      userId = authData.id;

      console.log("Autenticación aceptada, este es su id: " + authData.id);
    }

    const lastState = this.getState();
    lastState.userName = formData.name;

    if (formData.action == "new") {
      const roomData = await this.createRoom(userId);
      const { roomId } = await roomData.json();

      const rtDbRoomData = await this.joinRoom(roomId, userId);
      const { rtDbRoomId } = await rtDbRoomData.json();

      lastState.shortRoomId = roomId;
      lastState.longRoomId = rtDbRoomId;
      lastState.longRoomId = rtDbRoomId;
      console.log(`Tu roomId corto es: ${roomId}`);
      console.log(`Tu roomId largo es: ${rtDbRoomId}`);
    } else if (formData.shortRoomId) {
      const rtDbRoomData = await this.joinRoom(formData.shortRoomId, userId);
      const { rtDbRoomId } = await rtDbRoomData.json();

      lastState.shortRoomId = formData.shortRoomId;
      lastState.longRoomId = rtDbRoomId;
      console.log(`Tu roomId es: ${rtDbRoomId}`);
    } else {
      console.log("Indique algún roomId");
    }

    this.setState(lastState);
    state.connectChatroom();
    console.log("Termine");
  },
  async sendMessage(message: message) {
    const { roomId } = message;
    const { userName } = message;
    const { msg } = message;
    console.log(message, "mensaje");

    const sentMessage = await fetch(
      API_BASE_URL + `/messages?roomId=${roomId}`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName,
          msg,
        }),
      }
    );

    return sentMessage;
  },
  async signUp(formData: formData) {
    const userId = await fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
      }),
    });

    return userId;
  },
  async createRoom(userId: string) {
    const roomId = await fetch(API_BASE_URL + "/rooms", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    return roomId;
  },
  async joinRoom(roomId: string, userId: string) {
    const rtDbRoomId = await fetch(
      API_BASE_URL + `/rooms/${roomId}?userId=${userId}`,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return rtDbRoomId;
  },

  async auth(formData: formData) {
    const authState = await fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });

    return authState;
  },
};
