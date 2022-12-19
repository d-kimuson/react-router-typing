export type Range0ToN<
  N extends number,
  Result extends number[] = [],
  CountIndexArray extends number[] = [],
  Index = CountIndexArray["length"]
> = Index extends N
  ? Result
  : Range0ToN<
      N,
      [...Result, Index extends number ? Index : never],
      [...CountIndexArray, never]
    >

export type Range<From extends number, To extends number> = Range0ToN<
  To,
  [],
  Range0ToN<From>
>

export const typedRange = <From extends number, To extends number>(
  from: From,
  to: To
): Range<From, To> => {
  return Array.from({ length: to }, (_v, k) => k).filter(
    (i) => i >= from
  ) as Range<From, To>
}
