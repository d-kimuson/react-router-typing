import type { Assert, TypeEq, ArrayAtLeastN } from "~/type/utils.type"

export type It1 = Assert<
  "basic",
  TypeEq<ArrayAtLeastN<string, 1>, [string, ...string[]]>
>

export type It2 = Assert<
  "length is 0",
  TypeEq<ArrayAtLeastN<string, 0>, string[]>
>
