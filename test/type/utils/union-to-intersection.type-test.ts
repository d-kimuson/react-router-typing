import type { Assert, TypeEq, UnionToIntersection } from "~/type/utils.type"

export type It1 = Assert<
  "Convert union type to intersection type",
  TypeEq<
    UnionToIntersection<{ name: string } | { password: string }>,
    { name: string } & { password: string }
  >
>
