import { rtDb, API_BASE_URL } from "./db";
type newState = { userName: string; messagesList: [] };
type formData = {
  email: String;
  name: String;
  action: String;
  roomId: String | boolean;
};
export const state = {
  data: {
    userName: "",
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
  // subscribe(callback: (any) => any) {
  //   this.listeners.push(callback);
  // },
  async main(formData: formData) {
    const authState = await this.auth(formData);
    if (authState.status == 400) {
      const signUp = await this.signUp(formData);
      const signState = await signUp.json();
      const userId = signState.id;
      console.log(signState);
      console.log("Autenticación fallida, este es su nuevo id: " + userId);
    } else {
      const authData = await authState.json();
      console.log("Autenticación aceptada, este es su id: " + authData.id);
    }
  },
  async signUp(formData: formData) {
    const signUp = await fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
      }),
    });

    return signUp;
  },
  createRoom(formData: formData) {},
  joinRoom(formData: formData) {},

  async auth(formData: formData) {
    const userStateDb = await fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });

    return userStateDb;
  },
};
