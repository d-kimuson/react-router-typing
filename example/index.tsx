import { createBrowserRouter } from 'react-router-dom'
import type { AsRouteConfig, IRoutes } from 'react-router-typing'
import React from 'react'
import { asBrowserRouter } from 'react-router-typing'
import { Nav } from './nav'

const routes = [
  {
    path: "/",
    element: (
      <div>
        <h2>Home</h2>
        <Nav />
      </div>
    ),
  },
  {
    path: "/example",
    element: <div>Example</div>,
  },
  {
    path: "/nests",
    children: [
      {
        path: "",
        element: (
          <div>Nest List Page</div>
        ),
      },
      {
        path: ":nestId",
        element: (
          <div>Nest Child Page</div>
        ),
      },
    ],
  },
] as const satisfies IRoutes

export type RouteConfig = AsRouteConfig<typeof routes>

export const router = createBrowserRouter(asBrowserRouter(routes))

/**
 * createRoot(document.getElementById("root")).render(
 *   <RouterProvider router={router} />
 * );
 */
