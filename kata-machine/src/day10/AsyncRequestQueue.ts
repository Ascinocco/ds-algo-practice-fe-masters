type AsyncRequest = () => Promise<unknown>;

type Node = {
  value: AsyncRequest;
  next?: Node;
}

class AsyncRequestQueue = {
  public length: number = 0;
  private head?: Node;
  private tail?: Node;
  // @TODO: finish later...
}

