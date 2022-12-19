import type {
  Simplify,
  ExcludeMethod,
  GetReadonlyKeys,
} from "./type/utils.type"

/**
 * @param instance
 * @param _data
 * @returns
 */
export const asTypedClass = <Cls, Data>(
  instance: Cls,
  _data: Data
): TypedClass<Cls, Data> => {
  return instance as unknown as TypedClass<Cls, Data>
}

export type TypedClass<
  Base,
  Data,
  RawData = ExcludeMethod<Data>,
  ReadonlyKeys = GetReadonlyKeys<Base>
> = Simplify<
  {
    readonly [K in keyof RawData]: K extends keyof Base & keyof Data
      ? RawData[K] extends Record<string, unknown>
        ? TypedClass<NonNullable<Base[K]>, Data[K], RawData[K]>
        : RawData[K]
      : never
  } & {
    readonly [K in Exclude<ReadonlyKeys, keyof RawData> as K extends
      | symbol
      | string
      | number
      ? K
      : never]: K extends keyof Base ? Base[K] : never
  } & {
    [K in Exclude<keyof Base, ReadonlyKeys | keyof RawData>]: Base[K]
  }
>
