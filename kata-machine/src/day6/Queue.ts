type Node<T> = {
  value: T;
  next?: Node<T>;
}

export default class Queue<T> {
  public length: number = 0;
  private head?: Node<T>;
  private tail?: Node<T>;
 
  enqueue(item: T): void {
    this.length++;
    const node: Node<T> = { value: item };

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

    const currHead = this.head;

    if (!this.head.next) {
      this.head = undefined;
      this.tail = undefined;
      return currHead.value;
    }
    
    this.head = currHead.next;
    return currHead.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
