import { state } from "../../state";

customElements.define(
  "send-button",
  class SendButton extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    addStyles() {
      const style = document.createElement("style");

      style.innerHTML = `
            .container {
                background: gray;
                width: 100%;
            }
            .input {
                box-sizing: border-box;
                width: 100%;
                height: 50px;
                display: none;
                font-size: 30px;
            }
            .button {
                width: 100%;
                height: 50px;
            }
        `;
      this.shadow.appendChild(style);
    }

    render() {
      this.shadow.innerHTML = `
        <div class="container">
            <input type="text" class="input"/>
            <button class="button"></button>
        </div>`;

      const type = this.getAttribute("type");
      const buttonEl = this.shadow.querySelector(".button") as HTMLFormElement;
      const inputEl = this.shadow.querySelector(".input") as HTMLFormElement;
      console.log("El type del button es: " + type);

      if (type == "home") {
        buttonEl.textContent = "Comenzar";
      } else {
        inputEl.style.display = "initial";
        buttonEl.textContent = "Enviar";
        buttonEl.addEventListener("click", (e: any) => {
          state.sendMessage({
            roomId: state.data.longRoomId,
            userName: state.data.userName,
            msg: inputEl.value,
          });
          inputEl.value = "";
        });
      }
      this.addStyles();
    }
  }
);
