import { expectType } from "tsd"
import { typedObjectKeys, typedObjectKeysStrict } from "~/typed-object-keys"

describe("typedObjectKeys", () => {
  describe("string", () => {
    it("with literal", () => {
      const keys = typedObjectKeys({ key: "value" })
      expectType<"key"[]>(keys)
      expect(keys).toStrictEqual(["key"])
    })

    it("optional properties are included", () => {
      const keys = typedObjectKeys({ required: "value" } as {
        required: string
        optional?: string
      })
      expectType<("required" | "optional")[]>(keys)
      expect(keys).toStrictEqual(["required"])
    })

    it("optional properties are not included if using strict version", () => {
      const keys = typedObjectKeysStrict({ required: "value" } as {
        required: string
        optional?: string
      })
      expectType<"required"[]>(keys)
      expect(keys).toStrictEqual(["required"])
    })

    it("mapped types (string)", () => {
      const keys = typedObjectKeys({ required: "value" } as {
        [K: string]: string
      })
      expectType<string[]>(keys)
    })
  })

  describe("number", () => {
    it("literal", () => {
      const keys = typedObjectKeys({ 0: "value" } as {
        0: string
      })
      expectType<"0"[]>(keys)
      expect(keys).toStrictEqual(["0"])
    })

    it("mapped types (number)", () => {
      const keys = typedObjectKeys({ 0: "value" } as {
        [K: number]: string
      })
      expectType<number[]>(keys)
      expect(keys).toStrictEqual(["0"])
    })
  })
})
