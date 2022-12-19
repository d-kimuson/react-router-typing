import type { SnakeToCamel, TypeEq, Assert } from "~/type/utils.type"

export type It1 = Assert<"basic", TypeEq<SnakeToCamel<"user_name">, "userName">>
export type It2 = Assert<
  "multiple deliminator",
  TypeEq<SnakeToCamel<"user_first_name">, "userFirstName">
>
