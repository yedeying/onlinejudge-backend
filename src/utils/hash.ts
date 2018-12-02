import { createHash } from 'crypto';

export const sha1: {
  (source: string): string;
  (source: string[]): string;
} = (source: string | string[]) => {
  const shasum = createHash('sha1');
  if (typeof source === 'string') {
    source = [source];
  }
  for (const str of source) {
    shasum.update(str);
  }
  return shasum.digest('hex');
};
