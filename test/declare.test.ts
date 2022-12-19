import type { IRoutes, AsRouteConfig } from "../src/type/declare.type"
import { TypeEq, Assert } from "../src/type/utils.type"
import { defineRoutes } from "../src/define-routes"

const HomePage = undefined as unknown as JSX.Element
const ExamplePage = undefined as unknown as JSX.Element
const NestListPage = undefined as unknown as JSX.Element
const NestDetailPage = undefined as unknown as JSX.Element

describe("With satisfies (>4.9)", () => {
  const routes = [
    {
      path: "/",
      element: HomePage,
    },
    {
      path: "/example",
      element: ExamplePage,
    },
    {
      path: "/nests",
      element: NestListPage,
      children: [
        {
          path: ":nestId",
          element: NestDetailPage,
        },
      ],
    },
  ] as const satisfies IRoutes

  type RouteConfig = AsRouteConfig<typeof routes>
  type Expect = {
    "/": {
      path: "/"
    }
    "/example": {
      path: "/example"
    }
    "/nests": {
      path: "/nests"
    }
    "/nests/:nestId": {
      path: "/nests/:nestId"
    } & {
      params: {
        nestId: string
      }
    }
  }

  type It1 = Assert<
    "RouteConfig should be mapped as expected format.",
    TypeEq<RouteConfig, Expect>
  >

  it("Fill-in-the-blanks for type testing", () => {
    expect(true).toBe(true)
  })
})

describe("With define-routes (<4.9)", () => {
  const routes = defineRoutes([
    {
      path: "/",
      element: HomePage,
    },
    {
      path: "/example",
      element: ExamplePage,
    },
    {
      path: "/nests",
      element: NestListPage,
      children: [
        {
          path: ":nestId",
          element: NestDetailPage,
        },
      ],
    },
  ] as const)

  type RouteConfig = AsRouteConfig<typeof routes>
  type Expect = {
    "/": {
      path: "/"
    }
    "/example": {
      path: "/example"
    }
    "/nests": {
      path: "/nests"
    }
    "/nests/:nestId": {
      path: "/nests/:nestId"
    } & {
      params: {
        nestId: string
      }
    }
  }

  type It1 = Assert<
    "RouteConfig should be mapped as expected format.",
    TypeEq<RouteConfig, Expect>
  >

  it("Fill-in-the-blanks for type testing", () => {
    expect(true).toBe(true)
  })
})
