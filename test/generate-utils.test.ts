import { generateUtils } from "../src/generate-utils"

describe("About generateUtils", () => {
  describe("When not nested routes", () => {
    const { pagePath, pageMatch } = generateUtils<{
      "/": {
        path: "/"
      }
    }>()

    it("/ is valid for pagePath", () => {
      expect(pagePath("/")).toBe("/")
    })

    // @ts-expect-error -- /other is valid for pagePath
    pagePath("/other")

    it("/ is valid for pageMatch", () => {
      expect(pageMatch("/")).toBe("/")
    })

    // @ts-expect-error -- /other is valid for pageMatch
    pageMatch("/other")
  })

  describe("When nested routes", () => {
    const { pagePath, pageMatch } = generateUtils<{
      "/": {
        path: "/"
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
    }>()

    try {
      // @ts-expect-error -- Should have parameter
      pagePath("/nests/:nestId")

      // @ts-expect-error -- Should have nestId parameter
      pagePath("/nests/:nestId", {})

      // @ts-expect-error -- Invalid parameter
      pagePath("/nests/:nestId", { invalidKey: "1" })
    } catch (err) {}

    it("/nests/:nestId is valid for pagePath", () => {
      expect(pagePath("/nests/:nestId", { nestId: "1" })).toBe("/nests/1")
    })

    it("/nests/:nestId is valid for pageMatch", () => {
      expect(pageMatch("/nests/:nestId")).toBe("/nests/:nestId")
    })
  })
})
