// SHOULD BE REMOVED
import { createBrowserRouter } from 'react-router-dom'
import type { AsRouteConfig, IRoutes } from './types'
import type { FC } from 'react'
import { asBrowserRouter } from '~/as-browser-router'
import { generateUtils } from '~/generate-utils'

declare const HomePage: FC
declare const ExamplePage: FC
declare const NestListPage: FC
declare const NestDetailPage: FC

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/example",
    element: <ExamplePage />,
  },
  {
    path: "/nests",
    element: (
      <NestListPage />
    ),
    children: [
      {
        path: ":nestId",
        element: (
          <NestDetailPage />
        ),
      },
    ],
  },
] as const satisfies IRoutes

export type RouteConfig = AsRouteConfig<typeof routes>

createBrowserRouter(asBrowserRouter(routes))

export const {
  pagePath,
  pageMatch
} = generateUtils<RouteConfig>()
