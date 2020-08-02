import { ChunkStatus } from './chunkStatus' 

describe("ChunkStatus class", () => {
    it ("Should return false as not all chunks are marked as ready", () => {
        const status = new ChunkStatus()

        status.registerChunk()
        status.registerChunk()
        status.registerChunk()

        status.markAsReady(0)
        status.markAsReady(2)

        expect(status.isReady()).toBe(false)
    })

    it ("Should return true as all chunks are marked as ready", () => {
        const status = new ChunkStatus()

        status.registerChunk()
        status.registerChunk()

        status.markAsReady(0)
        status.markAsReady(1)

        expect(status.isReady()).toBe(true)
    })
})