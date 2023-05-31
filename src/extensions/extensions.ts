declare global {
  interface String {
    replaceRegex(regex: RegExp, replacementText: string): string;
  }
}

Object.defineProperty(String.prototype, 'replaceRegex', {
  value: function (regex: RegExp, replacementText: string) {
    return regex.global
      ? this.replaceAll(regex, replacementText)
      : this.replace(regex, replacementText);
  },
  writable: true,
  configurable: true,
});

export {};
