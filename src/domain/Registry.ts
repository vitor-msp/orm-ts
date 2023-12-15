import { ObjToMap } from "../utils/ObjToMap";
import { Field } from "./Field";

export type Registry = any;

export class RegistryBuilder {
  private readonly schema: Field[];
  private data: any;
  private registry: Registry;

  constructor(schema: Field[]) {
    this.schema = schema;
  }

  private reset(): void {
    this.data = null;
    this.registry = {};
  }

  create(data: any, id: number): Registry {
    this.reset();
    this.data = data;
    this.schema.forEach((field) => this.createField(field, this));
    this.registry.id = id;
    return this.registry;
  }

  private createField(field: Field, self: Registry) {
    if (field.pk) return;
    const fieldData = self.data[field.name];
    if (this.setFieldIfIsNull(fieldData, field)) return;
    this.setNotNullField(fieldData, field);
  }

  private setFieldIfIsNull(fieldData: any, field: Field): boolean {
    if (fieldData || !field.nullable) return false;
    this.registry[field.name] = undefined;
    return true;
  }

  private setNotNullField(fieldData: any, field: Field): void {
    if (this.dataHasInvalidType(fieldData, field.type)) throw new Error();
    this.registry[field.name] = fieldData;
  }

  private dataHasInvalidType(fieldData: any, fieldType: string): boolean {
    return typeof fieldData !== fieldType;
  }

  update(data: any, registry: Registry): Registry {
    this.reset();
    this.data = data;
    this.registry = registry;
    const newFields = ObjToMap.convert<string | number>(data);
    newFields.forEach((value, key) => this.updateField(value, key, this));
    return this.registry;
  }

  private updateField(
    value: string | number,
    key: string,
    self: RegistryBuilder
  ): void {
    const field = self.schema.find((field) => field.name === key);
    if (!field) return;
    self.setNotNullField(value, field);
  }
}
