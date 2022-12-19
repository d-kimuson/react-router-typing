import { createBrowserRouter } from "react-router-dom"
import { IRoutes } from "../src/types"
import { asBrowserRouter } from "../src/as-browser-router"

describe("as browser router", () => {
  const routes: IRoutes = []
  try {
    createBrowserRouter(asBrowserRouter(routes))
  } catch (err) {
    if (err instanceof ReferenceError) {
      // expected. document is not defined in test context.
    } else {
      throw err
    }
  }

  it("Fill-in-the-blanks for type testing", () => {
    expect(true).toBe(true)
  })
})
