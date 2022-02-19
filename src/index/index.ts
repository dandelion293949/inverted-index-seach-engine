export const invertedIndex = (words: string[]) => {
  const index: { [key: string]: string[] } = {};
  const documents: string[] = [];

  const add = (word: string): void => {
    const normalizedWord = word.normalize('NFKC');
    if (documents.find(doc => doc === normalizedWord)) {
      return;
    }

    const currentIndex = [...new Set(normalizedWord.split(''))]
      .reduce((acc: { [key: string]: string }, cur: string): { [key: string]: string } => {
        return acc[cur] ? acc : Object.assign(acc, { [cur]: normalizedWord });
      }, {});

    Object.entries(currentIndex).forEach(([key, value]) => {
      if (index[key]) {
        index[key].push(value);
        return;
      }
      index[key] = [value];
    });

    documents.push(normalizedWord);
  };

  const search = (key: string): string[] => {
    return index[key] ? index[key] : [];
  }

  const getIndex = (): { [key: string]: string[] } => {
    return index;
  }

  words.forEach((word) => add(word))

  return {
    add,
    search,
    getIndex,
  }
};
