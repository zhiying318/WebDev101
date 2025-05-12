export function runHello(outputId: string) {
    const my_hello_message: string = "Bonjour TYPESCRIPT !";
  
    const my_title: HTMLHeadingElement = document.createElement("h1");
    my_title.textContent = my_hello_message;
  
    const appDiv: HTMLDivElement = document.createElement("div");
    appDiv.id = "app";
    appDiv.appendChild(my_title);
  
    // document.body.appendChild(appDiv);
    const outputContainer = document.getElementById(outputId);
    if (outputContainer) {
    outputContainer.appendChild(appDiv); // ✅ 插入目标区域
  }
  }
  