import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "init-welcome",
  class InitWelcome extends HTMLElement {
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
        .header {
          background: #FF8282;
          height: 60px;
        }

        .form {
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 20px;
        }

        .label {
          width: 80%;
        }

        .p{
          margin: 0;
          font-size: 20px;
        }

        .input {
          width: 100%;
          height: 50px;
          font-size: 30px;
        }

        .label-room {
          display: none;
        }
            `;
      this.shadow.appendChild(style);
    }

    render() {
      console.log("Soy el welcome");
      this.shadow.innerHTML = `
        <header class="header"></header>

        <form class="form">
            <label class ="label-email label">
              <p class="p">Email</p>
              <input class="input email" type="text" name="label-email">
            </label>

            <label class ="label-name label">
              <p class="p">Tu nombre</p>
              <input class="input name" type="text" name="label-name">
            </label>
                
            <label class ="label-options label">
              <p class="p">Room</p>
              <select class="select input" name="label-options">
                <option value="new">New room</option>
                <option value="existing">Existing room</option>
              </select>
            </label>
                
            <label class ="label-room label">
              <p class="p">Room id</p>
                <input class="input room-id" type="text" name="label-name">
            </label>

            <send-button class="form-btn" type="home"></send-button>
        </form>
        `;
      const emailEl = this.shadow.querySelector(".email") as HTMLFormElement;
      const nameEl = this.shadow.querySelector(".name") as HTMLFormElement;
      const selectRoomEl = this.shadow.querySelector(
        ".select"
      ) as HTMLFormElement;
      const labelRoomEl = this.shadow.querySelector(
        ".label-room"
      ) as HTMLFormElement;
      const roomId = this.shadow.querySelector(".room-id") as HTMLFormElement;
      const formBtnEl = this.shadow.querySelector(
        ".form-btn"
      ) as HTMLFormElement;

      selectRoomEl.addEventListener("change", (e) => {
        const target = e.target as HTMLFormElement;
        const choosedOption = target.value;

        choosedOption == "existing"
          ? (labelRoomEl.style.display = "initial")
          : (labelRoomEl.style.display = "none");
      });

      formBtnEl.addEventListener("click", () => {
        console.log("Listener en welcome del boton");
        state
          .main({
            email: emailEl.value.toLowerCase(),
            name: nameEl.value.toLowerCase(),
            action: selectRoomEl.value,
            shortRoomId: roomId.value,
          })
          .then(() => {
            Router.go("/chat");
          });
      });

      this.addStyles();
    }
  }
);
