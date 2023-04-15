type RequestFn = () => Promise<unknown>;
// type defs seems to be global in the katas
// so going to have to create a unique type name
type ARNodeD11 = {
  request: RequestFn;
  next?: ARNodeD11;
}

const MAX_RUNNING_REQS_D11 = 3;

class AsyncRequestQueueD11 {
  public length: number = 0;
  public runningRequests: number = 0;
  private head?: ARNodeD11;
  private tail?: ARNodeD11;

  public enqueue(handler: RequestFn): void {
    this.length++;
    
    const node: ARNodeD11 = {
      request: handler,
    }

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  public deque(): RequestFn | undefined {
    if (!this.head || this.runningRequests === MAX_RUNNING_REQS_D11) {
      return;
    }

    this.length--;
    this.runningRequests++;

    const currHead = this.head;
    const handler = () => {
      return currHead.request().finally(() => {
        this.runningRequests--;
      })
    }

    if (!this.head.next) {
      this.head = this.tail = undefined;
      return handler;
    }

    this.head = this.head.next;
    return handler;
  }

  public peek(): RequestFn | undefined {
    return this.head?.request;
  } 
}

