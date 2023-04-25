// import { rtDb, API_BASE_URL, roomId } from "./db";
type newState = { userName: string; messagesList: [] };
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
};
