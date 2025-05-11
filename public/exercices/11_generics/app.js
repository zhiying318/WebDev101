class Queue {
    constructor() {
        this.elements = [];
    }
    enqueue(element) {
        this.elements.push(element);
    }
    dequeue() {
        return this.elements.shift();
    }
    size() {
        return this.elements.length;
    }
}
export function runQueueTest(outputId) {
    const el = document.getElementById(outputId);
    if (!el)
        return;
    el.innerHTML = ""; // 清空上一次输出
    function log(message) {
        el.innerHTML += `<div>${message}</div>`;
    }
    const numberQueue = new Queue();
    log("<strong>start numberQueue test:</strong>");
    log(`original size: ${numberQueue.size()}`);
    numberQueue.enqueue(10);
    numberQueue.enqueue(20);
    numberQueue.enqueue(30);
    log(`size now: ${numberQueue.size()}`);
    log(`dequeue: ${numberQueue.dequeue()}`);
    log(`size now: ${numberQueue.size()}`);
    log(`dequeue: ${numberQueue.dequeue()}`);
    log(`dequeue (from new empty Queue): ${new Queue().dequeue()}`);
    const stringQueue = new Queue();
    log("<br> <strong>start stringQueue test:</strong>");
    log(`original size: ${stringQueue.size()}`);
    stringQueue.enqueue("a");
    stringQueue.enqueue("b");
    stringQueue.enqueue("c");
    log(`size now: ${stringQueue.size()}`);
    log(`dequeue: ${stringQueue.dequeue()}`);
    log(`size now: ${stringQueue.size()}`);
    log(`dequeue: ${stringQueue.dequeue()}`);
    log(`dequeue (from new empty Queue): ${new Queue().dequeue()}`);
}
