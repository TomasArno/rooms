customElements.define(
  "text-box",
  class TextBox extends HTMLElement {
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
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin: 6px 0;
                }

                .incoming {
                    display: inline;
                    padding: 12px;
                    background-color: #eaeaeacf;
                    font-size: 18px;
                    border-radius: 3px;
                    align-self: flex-start;
                    text-align: left;
                }

                .sent {
                    display: inline;
                    padding: 12px;
                    background-color: #bae97ccf;
                    font-size: 18px;
                    border-radius: 3px;
                    align-self: flex-end;
                    text-align: right;
                }
            `;
      this.shadow.appendChild(style);
    }

    render() {
      const type = this.getAttribute("type") as "incoming" | "sent";
      const content = this.innerHTML as String;

      this.shadow.innerHTML = `
                <div class="container">
                    <div class=${type}>${content}</div> 
                </div>            
            `;
      this.addStyles();
    }
  }
);
