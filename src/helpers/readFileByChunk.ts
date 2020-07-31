export const readFileByChunk = ({
  file,
  onChunk,
  onError,
  onEnd,
  chunkSize = 64 * 1024,
}: {
  file: File;
  chunkSize?: number;
  onChunk: (chunk: string) => void;
  onEnd: () => void;
  onError: (error: DOMException | undefined | null) => void;
}) => {
  let currentOffset = 0;

  const readChunk = (offset: number, length: number) => {
    const reader = new FileReader();
    const blob = file.slice(offset, length + offset);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.error || !e.target?.result) {
        return onError(e.target?.error);
      }

      const result = e.target.result as string;
      currentOffset += result.length;

      onChunk(result);

      if (currentOffset >= file.size) {
        return onEnd();
      }
      readChunk(currentOffset, chunkSize);
    };

    reader.readAsText(blob, "UTF-8");
  };

  readChunk(currentOffset, chunkSize);
};
