declare function readByChar(
  path: string,
  onChar: readByChar.OnChar,
  onClose: () => void
);

declare namespace readByChar {
  type OnChar = (character: string, column: number, line: number) => void;
}

export = readByChar;
