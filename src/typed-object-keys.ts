import type { IsNever } from "~/type/utils.type"

type IsStrUnion<T, Tmp = T extends string ? true : false> = boolean extends Tmp
  ? true
  : false
type IsLiteral<T, Base> = Base extends T ? false : T extends Base ? true : false

type _IsPossibleUndef<T> = T extends undefined ? "true" : never
type IsPossibleUndef<T, V = _IsPossibleUndef<T>> = IsNever<V> extends false
  ? true
  : false
type RemoveOmittable<T extends object> = {
  [K in keyof T as IsPossibleUndef<T[K]> extends true ? never : K]: T[K]
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const typedObjectKeys = <
  Obj extends object,
  T = keyof Obj,
  IsLiteralStr = IsLiteral<T, string>,
  IsLiteralNum = IsLiteral<T, number>
>(
  target: Obj
) =>
  Object.keys(target) as unknown as boolean extends IsLiteralStr
    ? T[]
    : IsLiteralStr extends true
    ? T[]
    : IsLiteralNum extends true
    ? T extends number
      ? `${T}`[]
      : never
    : IsStrUnion<T> extends true
    ? string[]
    : (keyof typeof target)[] // prohibit { [K: number]: any }

/**
 * @desc Contains optional properties
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const typedObjectKeysStrict = <Obj extends object>(target: Obj) => {
  return typedObjectKeys(target as RemoveOmittable<Obj>)
}
