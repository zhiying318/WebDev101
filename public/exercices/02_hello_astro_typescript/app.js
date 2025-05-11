export function runHello(outputId) {
    const my_hello_message = "Bonjour TYPESCRIPT !";
    const my_title = document.createElement("h1");
    my_title.textContent = my_hello_message;
    const appDiv = document.createElement("div");
    appDiv.id = "app";
    appDiv.appendChild(my_title);
    // document.body.appendChild(appDiv);
    const outputContainer = document.getElementById(outputId);
    if (outputContainer) {
        outputContainer.appendChild(appDiv); // ✅ 插入目标区域
    }
}
