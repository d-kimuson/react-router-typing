export type IsNever<T> = T[] extends never[] ? true : false

export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false

/**
 * @desc Type testing with a set of TypeEq.
 * @example Assert<TypeEq<string, string>>  // valid
 * @example Assert<TypeEq<string, number>>  // invalid (error)
 */
export type Assert<Describe extends string, T extends true> = {
  __type: "Assert"
  isValid: T
  description: Describe
}

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type Simplify<T> = T extends object
  ? T extends Function
    ? T
    : T extends infer O
    ? { [K in keyof O]: Simplify<O[K]> }
    : never
  : T
