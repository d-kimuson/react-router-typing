import type { RouteObject } from "react-router-dom"
import type { IRoutes } from "~/type/declare.type"

export const asBrowserRouter = (config: IRoutes): RouteObject[] => {
  return config as RouteObject[]
}
