import { API_BASE_URL, rtDb } from "./db";
type message = { roomId: string; userName: string; msg: any };
type newState = { userName: string; roomId: string; messagesList: any };
type formData = {
  email: string;
  name: string;
  action: string;
  roomId: string;
};
export const state = {
  data: {
    userName: "",
    roomId: "",
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
    this.listeners.push(callback);
  },
  connectChatroom() {
    const chatRoomsRef = rtDb.ref(`/rooms/${this.data.roomId}/messages`);
    const lastState = this.getState();
    console.log(`El room es ${this.data.roomId}`);

    chatRoomsRef.on("value", (snapshot) => {
      const messages = snapshot.val(); // extraigo la data del snapshot

      lastState.messagesList = messages;
      this.setState(lastState);
    });
  },
  async main(formData: formData) {
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
      const roomDataParsed = await roomData.json();
      lastState.roomId = roomDataParsed.roomId;
      this.setState(lastState);

      console.log(`Tu roomId es: ${roomDataParsed.roomId}`);

      const rtDbRoomData = await this.joinRoom(lastState.roomId, userId);
      const { rtDbRoomId } = await rtDbRoomData.json();
      this.sendMessage({
        roomId: rtDbRoomId,
        userName: this.data.userName,
        msg: "Este es el primer mensaje enviado cuando cree un room",
      });
    } else if (formData.roomId) {
      const rtDbRoomData = await this.joinRoom(formData.roomId, userId);
      const { rtDbRoomId } = await rtDbRoomData.json();
      lastState.roomId = rtDbRoomId;
      this.setState(lastState);
      console.log(`Tu roomId es: ${rtDbRoomId}`);
    } else {
      console.log("Indique algún roomId");
    }
  },
  async sendMessage(message: message) {
    const { roomId } = message;
    const { userName } = message;
    const { msg } = message;
    console.log(msg);

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
