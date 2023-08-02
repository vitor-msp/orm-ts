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
      if (pk) return;
      const fieldData = data[name];
      if (!fieldData && nullable) {
        registry[name] = undefined;
        return;
      }
      if ((typeof fieldData).localeCompare(type) !== 0) throw new Error();
      registry[name] = fieldData;
    });
    registry.id = RegistryBuilder.getNextId();
    return registry;
  }
}
