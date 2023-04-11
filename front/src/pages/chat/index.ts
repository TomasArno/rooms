import { state } from "../../state";
function addStyles(container: HTMLElement) {
  const style = document.createElement("style");
  style.innerHTML = `
  .container {
    background-color: gray;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .welcome-container {
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 28px;
    padding: 13px 0;
  }

  .welcome-container__title {
    text-align: center;
    font-size: 40px;
  }

  .msg-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    overflow: scroll;
  }
      `;
  container.appendChild(style);
}

export function initChat() {
  const componentEl = document.createElement("div") as HTMLElement;
  componentEl.className = "container";

  componentEl.innerHTML = `
  <div class="welcome-container">
  <h1 class="welcome-container__title">CHAT</h1>
  <div class="msg-container"></div>
  
  <div class="send-container">
  <send-comp id="chat"></send-comp>
  </div>
  </div>
  `;

  const msgContainer = componentEl.querySelector(
    ".msg-container"
  ) as HTMLElement;

  state.subscribe(() => {
    const messagesList = state.getState().messagesList;

    msgContainer.innerHTML = `
      ${messagesList
        .map(
          (element) =>
            `<msg-comp sender="${element.userName}">${element.msg}</msg-comp>`
        )
        .join("")}`;
  });

  state.connectChatroom();

  addStyles(componentEl);

  return componentEl;
}
