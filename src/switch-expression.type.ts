import type { IsNever, TypeEq } from "~/type/utils.type"

export type GuardFunction<Value, Guarded extends Value> =
  | ((value: Value) => boolean)
  | ((value: Value) => value is Guarded)
export type ResolveFunction<Value, Resolved> =
  | ((value: Value) => Resolved)
  | Resolved

export type SwitchCaseObject<T, Result = never> = {
  value: T
  resolvedValue?: Result
  case: <
    Value extends T,
    GuardF extends GuardFunction<T, Value>,
    Ret,
    Guarded = GuardF[] extends ((value: any) => value is infer I)[] ? I : never,
    CaseType = GuardF[] extends ((value: any) => value is Value)[]
      ? "guard"
      : boolean extends (
          GuardF extends (value: any) => value is Value ? true : false
        )
      ? "value"
      : "validate",
    NextValue = CaseType extends "validate"
      ? T
      : CaseType extends "value"
      ? Exclude<T, Value>
      : Exclude<T, Guarded>
  >(
    value: Value | GuardF,
    resolve: ResolveFunction<
      CaseType extends "validate"
        ? T
        : CaseType extends "value"
        ? Value
        : CaseType extends "guard"
        ? Guarded
        : never,
      Ret
    >
  ) => SwitchCaseObject<
    NextValue,
    IsNever<Result> extends true ? Ret : Result | Ret
  >
  default: IsNever<T> extends true
    ? () => Result
    : <Default>(
        resolve: ResolveFunction<T, Default>
      ) => TypeEq<Default, unknown> extends true ? Result : Result | Default
}
