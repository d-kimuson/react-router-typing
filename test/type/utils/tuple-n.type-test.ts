import type { Assert, TypeEq, TupleN } from "~/type/utils.type"

export type It1 = Assert<"basic", TypeEq<TupleN<string, 1>, [string]>>

export type It2 = Assert<"length is 0", TypeEq<TupleN<string, 0>, []>>

// TODO
// - assertMinLength のテスト追加
// - TupleN のテスト追加
