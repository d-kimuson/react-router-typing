import type { RouteObject } from "react-router-dom"
import type { ReadonlyDeep } from "type-fest"

export type IRoutes = ReadonlyArray<ReadonlyDeep<RouteObject>>

export type AsRouteConfig<
  T extends IRoutes,
  U = ToRouteUnion<T>
> = AsObjectShape<U extends { path: string } ? U : { path: string }>

/**
 * @desc children のネストを解決して Union にする
 * {
 *     readonly path: "/";
 *     readonly element: JSX.Element;
 * } | {
 *     readonly path: "/example";
 *     readonly element: JSX.Element;
 * } | {
 *     readonly path: "/nests";
 *     readonly element: JSX.Element;
 *     readonly children: readonly [...];
 * } | {
 *     path: "/nests/:nestId";
 * }
 */

type ToRouteUnion<T extends IRoutes> = T extends ReadonlyArray<infer I>
  ? MergeChild<I>
  : never
/**
 * @desc 使いやすい Object 形式に整形
 * {
 *     "/example": {
 *         path: "/example";
 *     };
 *     "/nests": {
 *         path: "/nests";
 *     };
 *     "/": {
 *         path: "/";
 *     };
 *     "/nests/:nestId": {
 *         path: "/nests/:nestId";
 *     } & {
 *         params: {
 *             nestId: string;
 *         };
 *     };
 * }
 */
type AsObjectShape<T extends { path: string }> = {
  [K in T["path"]]: {
    path: K
  } & (ParsePathParams<K> extends infer Params
    ? keyof Params extends never
      ? {}
      : {
          params: Params
        }
    : never)
}

type MergeChild<T> = T extends {
  path: string
  children: ReadonlyArray<infer Children extends { path: string }>
}
  ?
      | (T extends { element: JSX.Element } ? T : never)
      | MergeChild<
          {
            path: `${T["path"]}/${Children["path"]}`
          } & (Children extends { children: any }
            ? { children: Children["children"] }
            : {})
        >
  : T

/**
 * @desc リテラルなルーティング文字列からパスパラメタを抽出する
 * @example ParsePathParams<'/nests/:nestId'> = { nestId: string }
 */
type ParsePathParams<T extends string> = [T] extends [`${string}:${infer I1}`]
  ? I1 extends `${infer Param}/${infer I2}`
    ? Required<{ [K in Param]: string } & ParsePathParams<I2>>
    : { [K in I1]: string }
  : {}
