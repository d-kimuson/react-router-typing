import { createBrowserRouter } from 'react-router-dom'
import type { AsRouteConfig, IRoutes } from 'react-router-typing'
import React from 'react'
import { asBrowserRouter } from 'react-router-typing'

declare const HomePage: React.FC
declare const ExamplePage: React.FC
declare const NestListPage: React.FC
declare const NestDetailPage: React.FC

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

const router = createBrowserRouter(asBrowserRouter(routes))

/**
 * createRoot(document.getElementById("root")).render(
 *   <RouterProvider router={router} />
 * );
 */
