import type { ArrayAtLeastN } from "~/type/utils.type"

export const assertMinLength = <T, L extends number>(
  arr: T[],
  length: L
): ArrayAtLeastN<T, L> => {
  if (arr.length < length)
    throw new TypeError(
      `Type assertion failed. arr.length should be gt ${length}, but get ${arr.length}`
    )
  return arr as ArrayAtLeastN<T, L>
}
