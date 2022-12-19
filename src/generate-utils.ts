/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

export const generateUtils = <
  RouteConf extends {
    [K: string]: {
      path: string
      params?: {
        [K: string]: string
      }
    }
  }
>() => {
  /**
   * @example navigate(pagePath("/users/:userId", { userId: 1 }))
   * @example <Link to={pagePath("/users/:userId", { userId: 1 })}>Move</Link>
   */
  const pagePath = <T extends keyof RouteConf>(
    path: T,
    ...args: RouteConf[T] extends { params: any }
      ? [RouteConf[T]["params"]]
      : []
  ): string => {
    const [params] = args as [Record<string, string> | undefined]
    const typedPath = path as string

    return params === undefined
      ? typedPath
      : Object.entries(params).reduce(
          (s: string, [key, value]) => s.replace(`:${key}`, value),
          typedPath
        )
  }

  /**
   * @example const match = useMatch(pageMatch("/"))
   */
  const pageMatch = <T extends keyof RouteConf>(path: T): T => path

  return {
    pagePath,
    pageMatch,
  }
}
