import { Router } from "@vaadin/router";

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
      const type = this.getAttribute("type");

      this.shadow.innerHTML = `
        <div class="container">
            <input type="text" class="input"/>
            <button class="button"></button>
        </div>            
              `;

      const buttonEl = this.shadow.querySelector(".button") as HTMLElement;
      const inputEl = this.shadow.querySelector(".input") as HTMLFormElement;

      if (type == "home") {
        buttonEl.textContent = "Comenzar";
        buttonEl.addEventListener("click", () => {
          Router.go("/chat");
        });
      } else {
        inputEl.style.display = "initial";
        buttonEl.textContent = "Enviar";
      }
      this.addStyles();
    }
  }
);
