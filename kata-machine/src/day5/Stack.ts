type Node<T> = {
  value: T;
  prev?: Node<T>;
}

export default class Stack<T> {
  public length: number;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.tail = undefined;
  }

  push(item: T): void {
    const node = { value: item };
    this.length++;

    if (!this.tail) {
      this.tail = node;
      return;
    }

    const currTail = this.tail;
    this.tail = node;
    this.tail.prev = currTail;
  }

  pop(): T | undefined {
    if (!this.tail) {
      return;
    }

    this.length--;
    const currTail = this.tail;

    if (this.length === 0) {
      this.tail = undefined;
      return currTail.value;
    }

    this.tail = currTail.prev
    return currTail.value;
  }

  peek(): T | undefined {
    return this.tail?.value;
  }
}
