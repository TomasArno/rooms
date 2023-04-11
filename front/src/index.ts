import { goTo } from "./router";
import "./components/send-msg";
import "./components/message";

window.addEventListener("load", () => {
  goTo("/welcome");
});
