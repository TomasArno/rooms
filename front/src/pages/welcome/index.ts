import { state } from "../../state";

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
      this.shadow.innerHTML = `
        <header class="header"></header>

        <form class="form">
            <label class ="label-email label">
              <p class="p">Email</p>
              <input class="input" type="text" name="label-email">
            </label>

            <label class ="label-name label">
              <p class="p">Tu nombre</p>
              <input class="input" type="text" name="label-name">
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
                <input class="input" type="text" name="label-name">
            </label>

            <send-button class="form-btn" type="home" time="20:02"></send-button>
        </form>
        `;
      const selectRoomEl = this.shadow.querySelector(".select") as HTMLElement;
      const formBtnEl = this.shadow.querySelector(".form-btn") as HTMLElement;
      const labelRoomEl = this.shadow.querySelector(
        ".label-room"
      ) as HTMLElement;
      selectRoomEl.addEventListener("change", (e) => {
        const target = e.target as HTMLFormElement;
        const choosedOption = target.value;

        choosedOption == "existing"
          ? (labelRoomEl.style.display = "initial")
          : (labelRoomEl.style.display = "none");
      });

      formBtnEl.addEventListener("click", () => {});

      this.addStyles();
    }
  }
);
