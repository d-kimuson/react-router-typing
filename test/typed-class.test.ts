import { expectType } from "tsd"
import type { TypedClass } from "~/typed-class"
import { asTypedClass } from "~/typed-class"

describe("TypedClass", () => {
  type IMakura = {
    readonly id: number
    readonly name: string
  }

  class Makura implements IMakura {
    public readonly id: number
    public readonly name: string

    private constructor(data: IMakura) {
      this.id = data.id
      this.name = data.name
    }

    public static build<T extends IMakura>(data: T): TypedClass<Makura, T> {
      return asTypedClass(new Makura(data), data)
    }

    public sleep(): void {
      console.log(`sleep by ${this.name}`)
    }
  }

  type IUser = {
    readonly id: number
    readonly name: string | number
    readonly makura?: Makura
  }

  class User implements IUser {
    public readonly id: number
    public readonly name: string | number
    public readonly makura?: Makura

    public readonly hoge: string = "hoge"

    private constructor(data: IUser) {
      this.id = data.id
      this.name = data.name
      if (data.makura !== undefined) {
        this.makura = data.makura
      }
    }

    public static build<T extends IUser>(data: T): TypedClass<User, T> {
      return asTypedClass(new User(data), data)
    }

    public methodSample(): void {
      console.log("called method sample")
    }

    public get huga(): string {
      return String(this.name)
    }
  }

  describe("Initialized by exact value for optional property", () => {
    const data = {
      id: 1,
      name: "user",
      makura: Makura.build({
        id: 1,
        name: "makura",
      }),
    }

    const user = User.build(data)
    it("Basic type-safe property access", () => {
      expect(user.id).toBe(data.id)
      expectType<Makura>(user.makura)
    })

    it("Optional property is not an optional property (because initialized by exact value)", () => {
      expect(user.makura.name).toBe(data.makura.name)
      expectType<Makura>(user.makura)
    })

    it("union property is narrowed", () => {
      expect(user.name).toBe(data.name)
      expectType<string>(user.name) // not string | undefined
    })

    it("type-safe additional properties access", () => {
      expect(user.hoge).toBe("hoge")
      expectType<string>(user.hoge)
      expect(user.huga).toBe(data.name)
      expectType<string>(user.huga)
    })

    it("type-safe method call", () => {
      expect(() => {
        user.methodSample()
      }).not.toThrowError()
      expectType<() => void>(user.methodSample)
    })
  })

  describe("Initialized by omitted for optional property", () => {
    const data = {
      id: 1,
      name: "user",
    }

    const user = User.build(data)

    it("Optional properties are still optional", () => {
      expect(user.makura?.name).toBeUndefined()
      expectType<Makura | undefined>(user.makura)
    })
  })
})
