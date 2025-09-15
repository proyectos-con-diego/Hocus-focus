import { useMemo } from 'react';

export function useReadingTime(body: any[], wordsPerMinute: number = 200) {
  return useMemo(() => {
    if (!Array.isArray(body)) return null;

    const totalWords = body.reduce((total: number, block: any) => {
      if (block._type === "block" && block.children) {
        const blockWords = block.children.reduce((blockTotal: number, child: any) => {
          return blockTotal + (child.text || "").split(/\s+/).length;
        }, 0);
        return total + blockWords;
      }
      return total;
    }, 0);

    return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
  }, [body, wordsPerMinute]);
} 