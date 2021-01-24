export class InvertedIndex {
  index: { [key: string]: string[] } = {};
  documents: string[] = [];
  constructor(words: string[]) {
    words.forEach(word => {
      const normalizedWord: string = word.normalize('NFKC');
      normalizedWord.split('').forEach(char => {
        let docs: string[];
        if(this.index[char]) {
          docs = this.index[char];
          if(docs.every(item => item !== normalizedWord)) {
            docs.push(normalizedWord);
          }
        } else {
          docs = [normalizedWord];
        }

        this.index[char] = docs;
      });
      this.documents.push(normalizedWord);
    });
  }
  add(arg0: string): void {
    const normalizedWord: string = arg0.normalize('NFKC');
    if(this.documents.every(item => item !== normalizedWord)) {
      normalizedWord.split('').forEach(char => {
        var docs: string[];
        if(this.index[char]) {
          docs = this.index[char];
          if(docs.every(item => item !== normalizedWord)) {
            docs.push(normalizedWord);
          }
        } else {
          docs = [normalizedWord];
        }

        this.index[char] = docs;
      });
      this.documents.push(normalizedWord);
    }
  }
  search(key: string): string[] {
    return this.index[key] ? this.index[key] : [];
  }
}
