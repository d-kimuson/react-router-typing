export type IsAny<T> = boolean extends (T extends never ? true : false)
  ? true
  : false
export type IsNever<T> = T[] extends never[] ? true : false
export type IsUndefined<T> = T[] extends undefined[]
  ? IsAny<T> extends true
    ? false
    : IsNever<T> extends true
    ? false
    : true
  : false

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

/**
 * @desc Types that emit concrete literals for completion but allow strings
 * @example LiteralOrStr<'ok' | 'ng'>
 */
export type LiteralOrStr<Literal extends string> = Literal | (string & {})

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type PushToTuple<Tuple extends any[], Val> = [...Tuple, Val]
export type LastOfUnion<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never
export type UnionToTuple<
  T,
  LastU = LastOfUnion<T>,
  NextT = Exclude<T, LastU>
> = true extends IsNever<T> ? [] : PushToTuple<UnionToTuple<NextT>, LastU>

export type ArrayToUnion<T extends Array<any>> = T[number]

export type AppendToTuple<Item, Tuple extends unknown[]> = [Item, ...Tuple]
export type ArrayAtLeastN<
  T,
  N extends number = 1,
  Tuple = TupleN<T, N>
> = Tuple extends T[] ? [...Tuple, ...T[]] : never
export type TupleN<T, Num extends number, TupleT extends T[] = []> = {
  current: TupleT
  next: TupleN<T, Num, AppendToTuple<T, TupleT>>
}[TupleT extends { length: Num } ? "current" : "next"]

type SnakeToPascal<Str extends string> = Str extends `${infer H}_${infer T}`
  ? `${Capitalize<H>}${SnakeToPascal<T>}`
  : Capitalize<Str>

export type SnakeToCamel<Str extends string> = Uncapitalize<SnakeToPascal<Str>>

export type ExcludeMethod<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}

export type Simplify<T> = T extends object
  ? T extends Function
    ? T
    : T extends infer O
    ? { [K in keyof O]: Simplify<O[K]> }
    : never
  : T

export type GetReadonlyKeys<T> = {
  [K in keyof Required<T>]: TypeEq<
    Pick<T, K>,
    Readonly<Pick<T, K>>
  > extends true
    ? K
    : never
}[keyof T]
