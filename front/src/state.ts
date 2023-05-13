import { API_BASE_URL } from "./db";
type newState = { userName: string; roomId: string; messagesList: any };
type formData = {
  email: string;
  name: string;
  action: string;
  roomId: string | boolean;
};
type message = { roomId: string; userName: string; msg: any };
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
  syncroMessages() {},
  // subscribe(callback: (any) => any) {
  //   this.listeners.push(callback);
  // },
  async main(formData: formData) {
    const authState = await this.auth(formData);
    let userId = undefined;

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

    if (formData.action == "new") {
      const roomData = await this.createRoom(userId);
      const roomDataParsed = await roomData.json();
      const lastState = this.getState();
      lastState.roomId = roomDataParsed.roomId;
      lastState.userName = formData.name;
      this.setState(lastState);

      console.log(`Tu roomId es: ${roomDataParsed.roomId}`);
      console.log(this.data);

      const rtDbRoomData = await this.joinRoom(lastState.roomId, userId);
      const { rtDbRoomId } = await rtDbRoomData.json();
      this.sentMessage({
        roomId: rtDbRoomId,
        userName: this.data.userName,
        msg: "Este es el primer mensaje",
      });
    }
    // else {
    // }
  },
  async sentMessage(message: message) {
    const { roomId } = message;
    const { userName } = message;
    const { msg } = message;
    console.log(roomId, userName, msg);

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
