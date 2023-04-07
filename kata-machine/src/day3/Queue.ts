type QNode<T> = {
  value: T;
  next?: QNode<T>;
}

export default class Queue<T> {
  public length: number;
  private head?: QNode<T>;
  private tail?: QNode<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  // to enqueue something is to add it to the queue
  enqueue(item: T): void {
    this.length++;
    const node = {value: item}

    if (!this.tail) {
      this.tail = this.head = node
      return
    }

    this.tail.next = node;
    this.tail = node;
  }

  // remove from the queue
  deque(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;

    // get reference to current head
    const currHead = this.head;
    
    // point internal head to next node
    this.head = this.head.next;

    return currHead.value;
  }
  
  // peek gets the heads value
  peek(): T | undefined {
    return this.head?.value;
  }
}
