import { expectType } from "tsd"
import { assertMinLength } from "~/assert-min-length"

describe("assertMinLength", () => {
  it("valid length", () => {
    const result = assertMinLength(["0", "1"], 2)
    expect(result).toStrictEqual(["0", "1"])
    expectType<[string, string, ...string[]]>(result)
  })

  it("invalid length", () => {
    expect(() => {
      const result = assertMinLength(["0", "1"], 3)
      expectType<[string, string, string, ...string[]]>(result)
    }).toThrow()
  })
})
