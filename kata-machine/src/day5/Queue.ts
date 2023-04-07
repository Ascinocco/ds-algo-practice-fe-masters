type Node<T> = {
  value: T;
  next?: Node<T>;
}

export default class Queue<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;
    
  constructor() {
    // explicity init
    // could be done as default values and already technically is for head and tail. Length still needs
    // to be initialized directly since it's a number.
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  enqueue(item: T): void {
    const node = { value: item };
    this.length++

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }
  
  deque(): T | undefined {
    if (!this.head) {
      return;
    }

    this.length--;
    const currNode = this.head;
    this.head = this.head.next

    if (this.length === 0) {
      this.tail = undefined;
    }
    
    return currNode.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
