import { Field } from "./Field";
import { Table } from "./Table";

export type Registry = any;

export abstract class RegistryBuilder {
  static build(schema: Field[], data: any, id: number): Registry {
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
    registry.id = id;
    return registry;
  }
}
