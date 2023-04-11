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
      height: 220px;
      display: flex;
      flex-direction: column;
      row-gap: 100px;
    }

    .welcome-container__title {
      text-align: center;
      font-size: 40px;
    }

    `;
  container.appendChild(style);
}

export function initWelcome() {
  const containerEl = document.createElement("div");
  containerEl.className = "container";

  containerEl.innerHTML = `

    <div class="welcome-container">
      <h1 class="welcome-container__title">¡Bienvenidos!</h1>
      <div class="send-container">
        <send-comp id="welcome"></send-comp>
      </div>
    </div>
    `;

  addStyles(containerEl);

  return containerEl;
}
