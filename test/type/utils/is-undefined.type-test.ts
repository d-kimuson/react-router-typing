import type { Assert, TypeEq, IsUndefined } from "~/type/utils.type"

export type It1 = Assert<"undefined", TypeEq<IsUndefined<undefined>, true>>
export type It2 = Assert<"other common", TypeEq<IsUndefined<"string">, false>>
export type It3 = Assert<
  "undefined or other common",
  TypeEq<IsUndefined<"string" | undefined>, false>
>
export type It4 = Assert<"any", TypeEq<IsUndefined<any>, false>>
export type It5 = Assert<"never", TypeEq<IsUndefined<never>, false>>
