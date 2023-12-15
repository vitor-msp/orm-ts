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
    const registry = new RegistryBuilder(schema).create(data, 1);
    expect(registry.id).toEqual(1);
    expect(registry.name).toEqual("registry");
    expect(registry.age).toBeUndefined();
  });

  test("ensure throw error when age is invalid", () => {
    const data: any = {
      name: "registry",
      age: "age",
    };
    expect(() => new RegistryBuilder(schema).create(data, 1)).toThrow(Error);
  });

  test("ensure throw error when name is not passed", () => {
    const data: any = {};
    expect(() => new RegistryBuilder(schema).create(data, 1)).toThrow(Error);
  });

  test("ensure update a registry", () => {
    const data: any = {
      name: "registry",
      age: 24,
    };
    const registryBuilder = new RegistryBuilder(schema);
    const registry = registryBuilder.create(data, 1);
    registryBuilder.update({ name: "edited", other: "ignored" }, registry);
    expect(registry.id).toEqual(1);
    expect(registry.name).toEqual("edited");
    expect(registry.age).toEqual(24);
  });

  test("ensure throw error when age is invalid", () => {
    const data: any = {
      name: "registry",
      age: 24,
    };
    const registryBuilder = new RegistryBuilder(schema);
    const registry = registryBuilder.create(data, 1);
    expect(() => registryBuilder.update({ age: "edited" }, registry)).toThrow(
      Error
    );
  });
});
