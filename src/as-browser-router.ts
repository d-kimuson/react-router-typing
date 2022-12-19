import type { RouteObject } from "react-router-dom"
import type { IRoutes } from "~/types"

export const asBrowserRouter = (config: IRoutes): RouteObject[] => {
  return config as RouteObject[]
}
