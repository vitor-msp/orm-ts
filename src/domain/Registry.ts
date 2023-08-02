import { ObjToMap } from "../utils/ObjToMap";
import { Field } from "./Field";

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

  static update(schema: Field[], data: any, registry: Registry): void {
    const newFields = ObjToMap.convert<string | number>(data);
    newFields.forEach((value, key) => {
      const field = schema.find(
        ({ name }) => name.localeCompare(key) === 0
      );
      if (!field) return;
      if ((typeof value).localeCompare(field.type) !== 0) throw new Error();
      registry[key] = value;
    });
  }
}
