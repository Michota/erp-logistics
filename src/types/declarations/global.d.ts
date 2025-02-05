declare global {
  interface String {
    toUpperCase<T extends string>(this: T): Uppercase<T>;
  }
}

export {}