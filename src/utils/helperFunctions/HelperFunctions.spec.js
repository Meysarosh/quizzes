import { describe, expect, it } from 'vitest';
import { addRange } from './addRange';
import { tokenStringify, tokenParse } from './tokenRefresh';

describe('addRange', () => {
  it('Should add and remove new ranges', async () => {
    const prevRange = [[1, 5]];
    const newRange = [4, 7];
    const newRange2 = [10, 11];

    const result = addRange(prevRange, newRange);

    expect(result).toStrictEqual([[1, 7]]);

    const result2 = addRange(result, newRange2);

    expect(result2).toStrictEqual([
      [1, 7],
      [10, 11],
    ]);
  });
});

describe('tokenRefresh', () => {
  it('the two functions should code and decode a string', () => {
    const string = 'SomeString12345';

    const result = tokenParse(tokenStringify(string, 'SomeOutherString98765'));

    expect(result).toStrictEqual(string);
  });
});
