customElements.define(
  "msg-comp",
  class ComponentButton extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    addStyles() {
      const style = document.createElement("style");
      style.innerHTML = `
      .container {
        display:flex
      }
      .message {
        background: lightslategrey;
        color: white;
        padding: 11px 26px;
        font-size: 25px;
        border-radius: 15px;
      }
        `;
      this.shadow.appendChild(style);
    }

    render() {
      const containerEl = document.createElement("div") as HTMLElement;
      containerEl.className = "container";
      const sender = this.getAttribute("sender");

      containerEl.innerHTML = `
      <div class="message">${this.textContent}</div>
      `;

      if (sender == "tomas") {
        containerEl.style.justifyContent = "flex-start";
      } else {
        containerEl.style.justifyContent = "flex-end";
      }

      this.addStyles();

      this.shadow.appendChild(containerEl);
    }
  }
);
