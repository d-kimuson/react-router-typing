import type {
  SwitchCaseObject,
  GuardFunction,
  ResolveFunction,
} from "./switch-expression.type"
import type { IsNever } from "~/type/utils.type"

const unresolvedSwitchCaseResult = {
  __type: "UnresolvedSwitchCaseResult",
} as const
type UnresolvedSwitchCaseResult = typeof unresolvedSwitchCaseResult

const createSwitchCaseObject = <T, Result>(
  target: T,
  resolved: UnresolvedSwitchCaseResult
): SwitchCaseObject<T, Result> => {
  return {
    value: target,
    case: <
      Value extends T,
      GuardF extends GuardFunction<T, Value>,
      Ret,
      Guarded,
      _CaseType,
      NextValue
    >(
      valueOrGuardOrFunction: Value | GuardF,
      resolveOrResolver: ResolveFunction<Guarded, Ret>
    ): SwitchCaseObject<
      NextValue,
      IsNever<Result> extends true ? Ret : Result | Ret
    > => {
      const isMatch =
        typeof valueOrGuardOrFunction === "function"
          ? (valueOrGuardOrFunction as GuardFunction<T, Value>)(target)
          : target === valueOrGuardOrFunction

      if (isMatch) {
        const val =
          typeof resolveOrResolver === "function"
            ? (resolveOrResolver as (val: Guarded) => Ret)(
                target as unknown as Guarded
              )
            : resolveOrResolver

        return createResolvedCaseObject(target as unknown as NextValue, val)
      }

      return createSwitchCaseObject(target as unknown as NextValue, resolved)
    },
    // @ts-expect-error -- Do not used direct return pattern
    default: <Default>(
      resolveOrResolver: ResolveFunction<T, Default>
    ): Default => {
      if (typeof resolveOrResolver === "function") {
        return (resolveOrResolver as (value: T) => Default)(target) as Default
      }

      return resolveOrResolver as Default
    },
  }
}

const createResolvedCaseObject = <T, R>(
  target: T,
  resolved: R
): SwitchCaseObject<T, R> => {
  return {
    value: target,
    case: <_Guarded, Ret, NextValue>(): SwitchCaseObject<NextValue, Ret> => {
      return createResolvedCaseObject<NextValue, Ret>(
        target as unknown as NextValue,
        resolved as unknown as Ret
      )
    },
    default: (): R => {
      return resolved
    },
  }
}

export const switchExpression = <T>(target: T): SwitchCaseObject<T> => {
  return createSwitchCaseObject(target, unresolvedSwitchCaseResult)
}
