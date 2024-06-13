import { describe, expect, it } from 'vitest';
import { addRange } from './addRange';
import { tokenStringify, tokenParse } from './tokenRefresh';
import { createString } from './createStringFromIds';

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

describe('createString', () => {
  it('should create string for appending to url', () => {
    const answered = [
      { id: 1, answer: 1, isCorrect: true },
      {
        id: 2,
        answer: 2,
        isCorrect: false,
      },
    ];

    const result = createString(true, true, true, answered, []);
    expect(result).toStrictEqual('');

    const result1 = createString(true, true, false, answered, []);
    expect(result1).toStrictEqual('&id=1&id=2');

    const result2 = createString(false, true, true, answered, []);
    expect(result2).toStrictEqual('&id_ne=1');

    const result3 = createString(true, false, true, answered, []);
    expect(result3).toStrictEqual('&id_ne=2');

    const result4 = createString(true, false, false, answered, []);
    expect(result4).toStrictEqual('&id=1');

    const result5 = createString(false, true, false, answered, []);
    expect(result5).toStrictEqual('&id=2');
  });
});
