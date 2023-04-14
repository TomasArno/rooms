console.log("af");

customElements.define(
  "init-welcome",
  class InitWelcome extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
    }

    conectedCallback() {
      this.render();
    }

    render() {
      console.log("aas");
      this.shadow.innerHTML = `
        <header class="header"></header>
        <form class="form">
            <label class ="label-email">
                <p class="p">Email</p>
                <input class="input" type="text" name="label-email">
            </label>
            <label class ="label-name">
                <p class="p">Tu nombre</p>
                <input class="input" type="text" name="label-name">
            </label>
            <label class ="label">
                <p class="p">Email</p>
            </label>
            <label class ="label">
                <p class="p">Email</p>
            </label>

            <text-box type="incoming" time="20:02">test</text-box>
        </form>
        `;
    }
  }
);
