// ==================== <hello-world> ====================
class HelloWorld extends HTMLElement {
    connectedCallback() {
      this.textContent = "Hello World!";
    }
  }
  customElements.define("hello-world", HelloWorld);
  
  // ==================== <hello-name> ====================
  class HelloName extends HTMLElement {
    name: string = "Remi";
  
    static get observedAttributes(): string[] {
      return ["name"];
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "name") {
        this.name = newValue;
      }
    }
  
    connectedCallback() {
      this.textContent = `Hello ${this.name}!`;
    }
  }
  customElements.define("hello-name", HelloName);
  
  // ==================== <date-time> ====================
  class DateTime extends HTMLElement {
    private timerId?: number;
  
    connectedCallback() {
      this.updateTime();
      this.timerId = setInterval(() => this.updateTime(), 1000);
    }
  
    disconnectedCallback() {
      if (this.timerId) clearInterval(this.timerId);
    }
  
    private updateTime() {
      this.textContent = new Date().toLocaleString();
    }
  }
  customElements.define("date-time", DateTime);
  
  // ==================== <greet-custom> ====================
  class GreetCustom extends HTMLElement {
    static get observedAttributes() {
      return ["name"];
    }
  
    private name: string = "";
  
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
      if (name === "name") {
        this.name = newVal;
        this.updateGreeting();
      }
    }
  
    connectedCallback() {
      this.updateGreeting();
    }
  
    private updateGreeting() {
      const hour = new Date().getHours();
      let greeting = "Bonsoir";
      if (hour >= 5 && hour < 12) greeting = "Bonjour";
      else if (hour >= 12 && hour < 18) greeting = "Bon après-midi";
  
      this.innerHTML = `${greeting}${this.name ? `, ${this.name}` : ""}!`;
    }
  }
  customElements.define("greet-custom", GreetCustom);
  
  // ==================== Fonction appelée au clic ====================
  export function runSession18(containerId: string) {
  
    const style = document.createElement("style");
    style.textContent = `
      hello-world, hello-name, date-time, greet-custom {
        display: block;
        margin-bottom: 15px;
      }
    `;
    document.head.appendChild(style);
  
    const container = document.getElementById(containerId);
    if (!container) {
      console.error("Container non trouvé :", containerId);
      return;
    }
  
    container.innerHTML = "";
  
    const helloName = document.createElement("hello-name");
    helloName.setAttribute("name", "Monsieur DEBUT");
  
    const thirdHelloName = document.createElement("hello-name");
    thirdHelloName.setAttribute("name", "John");
    thirdHelloName.id = "third";
  
    const dateTime = document.createElement("date-time");
  
    const greet = document.createElement("greet-custom");
    greet.setAttribute("name", "Alice");
  
    container.appendChild(helloName);
    container.appendChild(document.createElement("br"));
    container.appendChild(thirdHelloName);
    container.appendChild(document.createElement("br"));
    container.appendChild(dateTime);
    container.appendChild(document.createElement("br"));
    container.appendChild(greet);
  }
  