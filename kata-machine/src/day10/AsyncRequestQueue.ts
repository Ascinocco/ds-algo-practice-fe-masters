type AsyncRequest = () => Promise<unknown>;

type ARNode = {
  value: AsyncRequest;
  next?: ARNode;
}

// in practice might be better to add setter and getting for class property
const MAX_RUNNING_REQS = 3;

class AsyncRequestQueue {
  public length: number = 0;
  public runningRequests: number = 0;
  private head?: ARNode;
  private tail?: ARNode;
  
  enqueue(req: AsyncRequest): void {
    this.length++;
    const node: ARNode = { value: req };

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): AsyncRequest | undefined {
    if (!this.head || this.runningRequests === 3) {
      return;
    }
    
    this.length--;
    this.runningRequests++;

    const currHead = this.head;

    const execReq = () => {
      return currHead.value().finally(() => {
        this.runningRequests--;
      })  
    } 

    if (!this.head.next) {
      this.head = this.tail = undefined;
      return execReq;
    }

    this.head = currHead.next;
    return execReq;
  }

  peek(): AsyncRequest | undefined {
    return this.head?.value;
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

