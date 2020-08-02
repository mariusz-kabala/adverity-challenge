export class ChunkStatus {
    public chunks: boolean[];
  
    constructor() {
      this.chunks = [];
    }
  
    public registerChunk() {
      return this.chunks.push(false) - 1;
    }
  
    public markAsReady(index: number) {
      this.chunks[index] = true;
    }
  
    public isReady() {
      return !this.chunks.some((value) => value === false);
    }
  }
  