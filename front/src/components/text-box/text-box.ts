class TextBox extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement("style");
    const type = this.getAttribute("type") as "incoming" | "sent";
    const content = this.innerHTML as String;
    const time = this.getAttribute("time") as String;

    style.innerHTML = `
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin: 6px 0;
                }

                    .time {
                        display: inline;
                        font-size: 0.81em;
                        margin: 0 0 0 9px;
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

    this.shadow.innerHTML = `
                <div class="container">
                    <div class=${type}>${content}<div class="time">| ${time}</div></div> 
                </div>            
            `;

    this.shadow.appendChild(style);
  }
}

customElements.define("text-box", TextBox);
