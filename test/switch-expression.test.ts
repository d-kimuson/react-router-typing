import { expectType } from "tsd"
import { switchExpression } from "~/switch-expression"

describe("switchExpression", () => {
  describe("Declaration type is appropriate", () => {
    it("appropriate case type", () => {
      const status = "value" as "value" | "guard" | "validate" | "remain"
      const result = switchExpression(status)
        .case("value", "valueResult" as const)
        .case((value): value is "guard" => {
          // Exclude 'value' literal
          expectType<"guard" | "validate" | "remain">(value)
          return true
        }, "guardResult" as const)
        .case((value) => {
          // Exclude 'guard' literal
          expectType<"validate" | "remain">(value)
          return true
        }, "ngResult" as const)
        .case((value) => {
          // Not Exclude 'validate" | 'remain' literal
          expectType<"validate" | "remain">(value)
          return true
        }, "skipResult" as const)
        .default("defaultResult" as const)

      expectType<
        | "valueResult"
        | "guardResult"
        | "ngResult"
        | "skipResult"
        | "defaultResult"
      >(result)
    })

    it("appropriate value type", () => {
      const status = "value" as "value" | "guard" | "validate" | "remain"
      const result = switchExpression(status)
        .case("value", (value) => {
          // constrict as value
          expectType<"value">(value)
          return "valueResult" as const
        })
        .case(
          (_value): _value is "guard" => true,
          (value) => {
            // constrict as guarded
            expectType<"guard">(value)
            return "guardResult" as const
          }
        )
        .case(
          (_value) => true,
          (value) => {
            // not constrict
            expectType<"validate" | "remain">(value)
            return "ngResult" as const
          }
        )
        .default("defaultResult" as const)

      expectType<"valueResult" | "guardResult" | "ngResult" | "defaultResult">(
        result
      )
    })

    it("Default value is required when all patterns are not type guarded", () => {
      const status = "1" as "1" | "2"
      switchExpression(status)
        .case("1", "1")
        // @ts-expect-error -- for test
        .default()
    })

    it("When all patterns can be type guarded, the default value is forbidden.", () => {
      const status = "1" as "1" | "2"
      switchExpression(status)
        .case("1", "1")
        .case("2", "2")
        // @ts-expect-error -- for test
        .default("defaultValue")
    })
  })

  describe("Actual behavior for value pattern", () => {
    const callExpression = (status: "ok" | "ng"): "okResult" | "ngResult" => {
      return switchExpression(status)
        .case("ok", "okResult" as const)
        .case("ng", "ngResult" as const)
        .default()
    }

    it("ok", () => {
      expect(callExpression("ok")).toBe("okResult")
    })

    it("ng", () => {
      expect(callExpression("ng")).toBe("ngResult")
    })
  })

  describe("Actual behavior for type guard pattern", () => {
    const callExpression = (status: "ok" | "ng"): "okResult" | "ngResult" => {
      return switchExpression(status)
        .case((value): value is "ok" => value === "ok", "okResult" as const)
        .case((_value): _value is "ng" => true, "ngResult" as const)
        .default()
    }

    it("ok", () => {
      expect(callExpression("ok")).toBe("okResult")
    })

    it("ng", () => {
      expect(callExpression("ng")).toBe("ngResult")
    })
  })

  describe("Actual behavior for validate & resolver pattern", () => {
    const callExpression = (
      status: "ok" | "ng" | "unchecked"
    ): "okResult" | "ngResult" | "defaultValue" => {
      return switchExpression(status)
        .case(
          (value) => value === "ok",
          (value) => {
            expect(value).toBe(status)
            return "okResult" as const
          }
        )
        .case(
          (value) => value === "ng",
          (value) => {
            expect(value).toBe(status)
            return "ngResult" as const
          }
        )
        .default("defaultValue" as const)
    }

    it("ok", () => {
      expect(callExpression("ok")).toBe("okResult")
    })

    it("ng", () => {
      expect(callExpression("ng")).toBe("ngResult")
    })

    it("unchecked", () => {
      expect(callExpression("unchecked")).toBe("defaultValue")
    })
  })
})
