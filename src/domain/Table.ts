import { ObjToMap } from "../utils/ObjToMap";
import { Field, FieldProps } from "./Field";
import { Registry, RegistryBuilder } from "./Registry";

export type SchemaDto = {
  tableName: string;
  fields: {
    name: string;
    type: "string" | "number";
    nullable: boolean;
    pk: boolean;
  }[];
};

enum ReturnMessages {
  OneLineAffected = "1 line affected",
  ZeroLineAffected = "0 lines affected",
  Empty = "",
}

export class Table {
  readonly tableName: string;
  private readonly fields: Field[] = [];
  private readonly registries: Registry[] = [];
  private currentId: number = 1;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  field(fieldProps: FieldProps): Table {
    const field = new Field(fieldProps);
    this.fields.push(field);
    return this;
  }

  insert(registryData: any): string {
    const id = this.getNextId();
    const registry = new RegistryBuilder(this.fields).create(registryData, id);
    this.registries.push(registry);
    return ReturnMessages.OneLineAffected;
  }

  private getNextId(): number {
    return this.currentId++;
  }

  select(id: number, fieldsToReturn: any): string {
    const registry = this.findRegistry(id);
    if (!registry) return ReturnMessages.Empty;
    const registryToReturn: any = { ...registry };
    const fieldsToReturnMap = ObjToMap.convert<boolean>(fieldsToReturn);
    fieldsToReturnMap.forEach((value, key) =>
      this.deleteFieldsToNotReturn(value, key, registryToReturn)
    );
    return JSON.stringify(registryToReturn);
  }

  private findRegistry(id: number): any {
    return this.registries.find((registry) => registry.id === id);
  }

  private deleteFieldsToNotReturn(
    value: boolean,
    key: string,
    registryToReturn: any
  ): void {
    if (!value) delete registryToReturn[key];
  }

  update(id: number, registryData: any): string {
    const registry = this.findRegistry(id);
    if (!registry) return ReturnMessages.ZeroLineAffected;
    try {
      new RegistryBuilder(this.fields).update(registryData, registry);
      return ReturnMessages.OneLineAffected;
    } catch (error) {
      return ReturnMessages.ZeroLineAffected;
    }
  }

  delete(id: number): string {
    const registryIndex = this.findResgitryIndex(id);
    if (registryIndex === -1) return ReturnMessages.ZeroLineAffected;
    this.registries.splice(registryIndex, 1);
    return ReturnMessages.OneLineAffected;
  }

  private findResgitryIndex(id: number): number {
    return this.registries.findIndex((registry) => registry.id === id);
  }

  selectMany(): string {
    return JSON.stringify(this.registries);
  }

  getFields(): Field[] {
    return this.fields;
  }

  getRegistries(): Registry[] {
    return this.registries;
  }

  getSchema(): SchemaDto {
    return {
      tableName: this.tableName,
      fields: this.getFields().map(({ name, nullable, pk, type }) => {
        return {
          name,
          type,
          nullable,
          pk,
        };
      }),
    };
  }
}
