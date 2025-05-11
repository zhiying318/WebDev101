class Queue<T> {
    private elements: T[] = [];
  
    enqueue(element: T): void {
      this.elements.push(element);
    }
  
    dequeue(): T | undefined {
      return this.elements.shift();
    }
  
    size(): number {
      return this.elements.length;
    }
  }
  
  export function runQueueTest(outputId: string): void {
    const el = document.getElementById(outputId);
    if (!el) return;
    el.innerHTML = ""; // 清空上一次输出
  
    function log(message: string) {
      el.innerHTML += `<div>${message}</div>`;
    }
  
    const numberQueue = new Queue<number>();
    log("<strong>start numberQueue test:</strong>");
    log(`original size: ${numberQueue.size()}`);
  
    numberQueue.enqueue(10);
    numberQueue.enqueue(20);
    numberQueue.enqueue(30);
    log(`size now: ${numberQueue.size()}`);
  
    log(`dequeue: ${numberQueue.dequeue()}`);
    log(`size now: ${numberQueue.size()}`);
    log(`dequeue: ${numberQueue.dequeue()}`);
    log(`dequeue (from new empty Queue): ${new Queue<number>().dequeue()}`);
  
    const stringQueue = new Queue<string>();
    log("<br> <strong>start stringQueue test:</strong>");
    log(`original size: ${stringQueue.size()}`);
  
    stringQueue.enqueue("a");
    stringQueue.enqueue("b");
    stringQueue.enqueue("c");
    log(`size now: ${stringQueue.size()}`);
  
    log(`dequeue: ${stringQueue.dequeue()}`);
    log(`size now: ${stringQueue.size()}`);
    log(`dequeue: ${stringQueue.dequeue()}`);
    log(`dequeue (from new empty Queue): ${new Queue<string>().dequeue()}`);
  }
  