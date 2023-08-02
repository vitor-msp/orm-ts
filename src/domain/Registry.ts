import { Field } from "./Field";

export type Registry = any;

export abstract class RegistryBuilder {
  private static currentId: number = 1;

  private static getNextId(): number {
    const id = RegistryBuilder.currentId++;
    return id;
  }

  static build(schema: Field[], data: any): Registry {
    const registry: Registry = {};
    schema.forEach(({ name, nullable, pk, type }) => {
      const fieldData = data[name];
      // validations
      registry[name] = fieldData;
    });
    registry.id = RegistryBuilder.getNextId();
    return registry;
  }
}
