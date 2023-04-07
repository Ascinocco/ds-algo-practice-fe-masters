type Node<T> = {
  value: T;
  prev?: Node<T>;
}

export default class Stack<T> {
  public length: number = 0;
  private tail?: Node<T>;

  push(item: T): void {
    this.length++;
    const node: Node<T> = { value: item };

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

    this.length--
    const currTail = this.tail;

    if (!this.tail.prev) {
      this.tail = undefined;
      return currTail.value;
    }

    this.tail = currTail.prev;
    return currTail.value;
  }

  peek(): T | undefined {
    return this.tail?.value;
  }
}
