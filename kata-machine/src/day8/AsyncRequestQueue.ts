// I have a queue. It returns a promise
// You give it a promise factory
// When they call the promise factory, your job gets to execute.
// you can have only up to 3 running at a time.

type AsyncRequestFn = () => Promise<unknown>;

type Node = {
  value: AsyncRequestFn;
  next?: Node;
}

export default class AsyncRequestQueue {
  private _length: number = 0;
  private _maxRequests: number = 3;
  private _runningRequests: number = 0;

  private head?: Node;
  private tail?: Node;

  get length() {
    return this._length;
  }

  get runningRequests() {
    return this._runningRequests;
  }

  get maxRequests() {
    return this._maxRequests;
  }

  set maxRequests(maxRequests: number) {
    if (maxRequests <= 0) {
      throw new Error("Cannot be 0 or less");
    }

    this.maxRequests = maxRequests;
  }

  enqueue(pFactory: AsyncRequestFn): void {
    this._length++;
    const node: Node = { value: pFactory };

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): AsyncRequestFn | undefined {
    if (!this.head || this._runningRequests === this._maxRequests) {
      return;
    }

    // promise technically not running until exec gets called by the consumer
    // but in order to prevent the consumer from dequeing a bunch until they can exec
    // do the decrements here
    this._length--;
    this._runningRequests++;

    const currHead = this.head;

    const exec = () => {
      return currHead.value().finally(() => {
        this._runningRequests--;
      })
    }

    if (!this.head.next) {
      this.head = this.tail = undefined;
      return exec;
    }

    this.head = currHead.next;
    return exec;
  }

  // We may not want to expose peek for this application...
  peek(): AsyncRequestFn | undefined {
    return this.head?.value
  }
}

const pq = new AsyncRequestQueue();
pq.enqueue(() => {
  return Promise.resolve()
})

pq.enqueue(() => {
  return Promise.resolve()
})

pq.enqueue(() => {
  return Promise.resolve()
})

pq.enqueue(() => {
  return Promise.resolve()
})

pq.enqueue(() => {
  return Promise.resolve()
})

console.log("pq length", pq.length);
console.log("pq running - pre", pq.runningRequests);

const p1 = pq.deque()
p1 && p1();

const p2 = pq.deque()
p2 && p2();

const p3 = pq.deque()
p3 && p3();

const p4 = pq.deque()
p4 && p4();

const p5 = pq.deque()
p5 && p5();

// p6 should not exist
const p6 = pq.deque()
p6 && p6();

console.log("p6 should be undefined", p6);

console.log("pq running - post", pq.runningRequests);

setTimeout(() => {
  console.log("pq running after 5 seconds", pq.runningRequests)

  const pp1 = pq.deque();
  pp1 && pp1();

  const pp2 = pq.deque();
  pp2 && pp2();

  console.log("new running reqs", pq.runningRequests);

  setTimeout(() => { 
    console.log("new running reqs after 5 seconds", pq.runningRequests);
    console.log("peeking after all requests should be cleared", pq.peek())
  }, 5000);

}, 5000)

