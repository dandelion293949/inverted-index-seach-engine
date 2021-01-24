import { InvertedIndex } from '../index';

describe('inverted index search', (): void => {
  test('alphabet', (): void => {
    const index = new InvertedIndex(['hello', 'he', 'convert', 'LoL']);
    const expected: string[] = ['hello', 'he'];
    const results = index.search('h');
    expect(results.length).toBe(expected.length);
    results.forEach(result => {
      expect(expected.some(word => word === result)).toBe(true);
    });
  });

  test('ひらがな', (): void => {
    const index = new InvertedIndex(['こんにちは', 'おはよう']);
    const expected: string[] = ['こんにちは'];
    const results = index.search('こ');
    expect(results.length).toBe(expected.length);
    results.forEach(result => {
      expect(expected.some(word => word === result)).toBe(true);
    });
  });
    
  test('Unicode正規化', (): void => {
    const index = new InvertedIndex(['人口', '⼈⼝']);
    const expected: string[] = ['人口'];
    const resultsOk = index.search('人');
    expect(resultsOk.length).toBe(expected.length);
    resultsOk.forEach(result => {
      expect(expected.some(word => word === result)).toBe(true);
    });
    const resultsNg = index.search('⼈');
    expect(resultsNg.length).toBe(0);

  });
});

