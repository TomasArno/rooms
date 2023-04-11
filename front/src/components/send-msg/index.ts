import { goTo } from "../../router";
import { state } from "../../state";

customElements.define(
  "send-comp",
  class ComponentButton extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const style = document.createElement("style");
      style.innerHTML = `
        .container {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
        }

        .p {
          margin: 0 0 10px 0;
          font-size: 25px;
        }

        .button {
          background: #6495ED;
          border-radius: 4px;
          color: white;

          width: 100%;
          height: 55px;
          font-size: 20px;
          
        }
        
        .input {
          box-sizing: border-box;
          border-radius: 4px;
          width: 100%;
          height: 55px;
          font-size: 27px;
        }
        `;
      this.shadow.appendChild(style);
      this.render();
    }

    render() {
      const containerEl = document.createElement("div");
      containerEl.className = "container";

      containerEl.innerHTML = `
          <div>
              <p class="p">Tu nombre</p>
              <input type="text" class="input"/>
          </div>
          <button class="button"></button>
      `;
      const buttonEl = containerEl.querySelector(".button") as HTMLElement;
      const inputEl = containerEl.querySelector(".input") as HTMLFormElement;
      const pEl = containerEl.querySelector(".p") as HTMLElement;

      const idComp = this.id;

      if (idComp == "welcome") {
        buttonEl.textContent = "Comenzar";
        buttonEl.addEventListener("click", () => {
          state.setName(inputEl.value);

          goTo("/chat");
        });
      } else {
        buttonEl.textContent = "Enviar";
        pEl.style.display = "none";

        buttonEl.addEventListener("click", () => {
          state.sendMessage({
            msg: inputEl.value,
            userName: state.getState().userName,
          });
        });
      }

      this.shadow.appendChild(containerEl);
    }
  }
);
