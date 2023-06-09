type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
  public length: number = 0;
  private head?: Node<T>;
  private tail?: Node<T>;

  prepend(item: T): void {
    const node: Node<T> = {
      value: item,
    }

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("Index provided is greater then list length");
    }
    
    if (idx === this.length) {
      this.append(item)
      return;
    }

    if (idx === 0) {
      this.prepend(item);
      return;
    }

    let curr = this.head;

    for (let i = 0; i < idx; i++) {
      curr = curr?.next;
    }

    if (!curr) {
      throw new Error("Failed to lookup item at index")
    }    
    
    this.length++;
    const node: Node<T> = { value: item };
    node.next = curr;
    node.prev = curr.prev;
    curr.prev = node;

    if (curr.prev) {
      curr.prev.next = curr;
    }
 }

  append(item: T): void {
    this.length++;
    const node: Node<T> = {
      value: item,
    }

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next node;
    this.tail = node;
  }

  remove(item: T): T | undefined {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; i++) {
      curr = curr.next;

      if (curr?.value === item) {
        break;
      }
    }

    if (!curr) {
      return;
    }

    this.length--;

    if (this.length === 0) {
      this.head = this.tail = undefined;
      return;
    }

    if (curr.prev) {
      // curr.prev.next = curr.next;
      curr.prev = curr.next
    }

    if (curr.next) {
      // curr.next.prev = curr.prev;
      curr.next = curr.prev
    }

    if (curr === this.head)e

    curr.prev = curr.next = undefined;
  }

  get(idx: number): T | undefined {
    return
  }
  removeAt(idx: number): T | undefined {
    return
  }
}
