customElements.define(
  "init-chat",
  class InitChat extends HTMLElement {
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
        .gen-container {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          row-gap: 20px;
        }

        .msg-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          row-gap: 6px;
          overflow: scroll;
          padding: 0 20px;
        }

        .p {
          margin: 0;
          font-size: 20px;
        }

        .btn-container {
          max-width: 285px;
          margin: 0 auto 50px auto;
        }
            `;
      this.shadow.appendChild(style);
    }

    render() {
      let arr = [0, 0, 0];
      this.shadow.innerHTML = `
      <div class="gen-container">
        <div class="descrip-container">
          <h2 class="title">Chat</h2>
          <p class ="room-id">Room ID:</p>
        </div>

        <div class="msg-container">
        
        ${arr.map(() => `<text-box type="incoming">Hola</text-box>`).join("")}
        </div>
        <div class="btn-container">
          <send-button type="chat" time="20:02"></send-button>
        </div>
      </div>`;
      // const selectRoomEl = this.shadow.querySelector(".select") as HTMLElement;
      // const labelRoomEl = this.shadow.querySelector(
      //   ".label-room"
      // ) as HTMLElement;
      // selectRoomEl.addEventListener("change", (e) => {
      //   const target = e.target as HTMLFormElement;
      //   const choosedOption = target.value;

      //   choosedOption == "existing"
      //     ? (labelRoomEl.style.display = "initial")
      //     : "";
      // });

      this.addStyles();
    }
  }
);
