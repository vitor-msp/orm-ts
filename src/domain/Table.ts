import { ObjToMap } from "../utils/ObjToMap";
import { Field, FieldProps } from "./Field";
import { Registry, RegistryBuilder } from "./Registry";

export class Table {
  readonly tableName: string;
  private readonly fields: Field[] = [];
  private readonly registries: Registry[] = [];
  private currentId: number = 1;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  field(dto: FieldProps): Table {
    const field = new Field(dto);
    this.fields.push(field);
    return this;
  }

  insert(dto: any): string {
    const id = this.getNextId();
    const registry = RegistryBuilder.build(this.fields, dto, id);
    this.registries.push(registry);
    return "1 line affected";
  }

  select(id: number, show: any): string {
    const registry = this.find(id);
    if (!registry) return "";
    const registryView: any = { ...registry };
    const showMap = ObjToMap.convert<boolean>(show);
    showMap.forEach((value, key) => {
      if (!value) delete registryView[key];
    });
    return JSON.stringify(registryView);
  }

  update(id: number, dto: any): string {
    const registry = this.find(id);
    if (!registry) return "0 lines affected";
    const newFields = ObjToMap.convert<string | number>(dto);
    newFields.forEach((value, key) => {
      registry[key] = value;
    });
    return "1 line affected";
  }

  delete(id: number): string {
    const index = this.registries.findIndex((registry) => registry.id === id);
    if (index === -1) return "0 lines affected";
    this.registries.splice(index, 1);
    return "1 line affected";
  }

  selectMany(): string {
    const registries = this.registries.map((r) => r);
    return JSON.stringify(registries);
  }

  getFields(): Field[] {
    return this.fields;
  }

  getRegistries(): Registry[] {
    return this.registries;
  }

  private find(id: number): any {
    return this.registries.find((registry) => registry.id === id);
  }

  private getNextId(): number {
    return this.currentId++;
  }
}
