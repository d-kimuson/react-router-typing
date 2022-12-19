import { sampleModule } from "~/module"

describe("Jestの疎通テスト", () => {
  it("テストができる", () => {
    expect(true).toBe(true)
  })

  it("relative path の解決ができる", () => {
    expect(sampleModule).toBe("sampleModule")
  })
})
