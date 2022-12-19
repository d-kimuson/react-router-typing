# React Router Typing

[ English | [日本語](https://github.com/d-kimuson/react-router-typing/blob/main/README.ja.md) ]

react-router-typing is a helper library that makes react-router navigation type-safe. It allows type-safe routing using react-router's standard routing declarations.

## Installation

react-router-typing uses the plain object-based routing of createBrowserRouting and requires react-router@6.4.0 or higher.

```bash
$ yarn add react-router-typing react-router-dom^6.4.0
```

## Setup

The setting method differs depending on the version of TypeScript.

### > TypeScript 4.9

If the TS used in your project is 4.9 or higher, use satisfies

```diff
+import { AsRouteConfig, IRoutes, asBrowserRouter } from 'react-router-typing'

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
-]
+] as const satisfies IRoutes

+export type RouteConfig = AsRouteConfig<typeof routes>

-const router = createBrowserRouter(routes)
+const router = createBrowserRouter(asBrowserRouter(routes))
```

Place type-safe navigational utilities on any path.

```ts
import { generateUtils } from "react-router-typing"
import type { RouteConfig } from "./path/to/your-router-config"

export const { pagePath, pageMatch } = generateUtils<RouteConfig>()
```

### <= TypeScript 4.8

```diff
+import { AsRouteConfig, IRoutes, asBrowserRouter, defineRoutes } from 'react-router-typing'

const routes = defineRoutes([
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
-]
+])

+export type RouteConfig = AsRouteConfig<typeof routes>

-const router = createBrowserRouter(routes)
+const router = createBrowserRouter(asBrowserRouter(routes))
```

For utilities, please refer to the settings in TS 4.9.

## Type safety navigation

react-router uses a useNavigate hook and a Link component for navigation. The pagePath function can be used to specify a type-safe path to the destination.

```tsx
export const Sample: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (Math.random() > 0.5) {
      navigate(pagePath("/nests/:nestId", { nestId: "20" }))
    }
  }, [])

  return <Link to={pagePath("/nests/:nestId", { nestId: "20" })}>Move</Link>
}
```

Specifying a non-existent path will result in a type error and input completion will work.

![](./assets/page-path.gif)

## Type-safe path parameter extraction

The react-router can accept a matched path parameter using the useMatch hook, which can be type-safe by specifying it with the pageMatch function, and can also be used with the

```tsx
export const Sample: React.FC = () => {
  const match = useMatch(pageMatch("/nests/:nestId"))
  // :PathMatch<"nestId"> | null

  return null
}
```

## Contribution

Welcome.
