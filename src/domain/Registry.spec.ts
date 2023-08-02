import { Field } from "./Field";
import { RegistryBuilder } from "./Registry";

describe("unit tests for Registry class", () => {
  const schema: Field[] = [
    new Field({ name: "id", type: "number", pk: true }),
    new Field({ name: "name", type: "string", nullable: false }),
    new Field({ name: "age", type: "number" }),
  ];

  test("ensure build a registry", () => {
    const data: any = {
      name: "registry",
    };
    const registry = RegistryBuilder.build(schema, data, 1);
    expect(registry.id).toEqual(1);
    expect(registry.name).toEqual("registry");
    expect(registry.age).toBeUndefined();
  });

  test("ensure throw error when age is invalid", () => {
    const data: any = {
      name: "registry",
      age: "age",
    };
    expect(() => RegistryBuilder.build(schema, data, 1)).toThrow(Error);
  });

  test("ensure throw error when name is not passed", () => {
    const data: any = {};
    expect(() => RegistryBuilder.build(schema, data, 1)).toThrow(Error);
  });

  test("ensure update a registry", () => {
    const data: any = {
      name: "registry",
      age: 24,
    };
    const registry = RegistryBuilder.build(schema, data, 1);
    RegistryBuilder.update(
      schema,
      { name: "edited", other: "ignored" },
      registry
    );
    expect(registry.id).toEqual(1);
    expect(registry.name).toEqual("edited");
    expect(registry.age).toEqual(24);
  });

  test("ensure throw error when age is invalid", () => {
    const data: any = {
      name: "registry",
      age: 24,
    };
    const registry = RegistryBuilder.build(schema, data, 1);
    expect(() =>
      RegistryBuilder.update(schema, { age: "edited" }, registry)
    ).toThrow(Error);
  });
});
