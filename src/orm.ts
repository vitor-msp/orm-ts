abstract class ObjToMap {
  static convert<T>(obj: any): Map<string, T> {
    const map = new Map<string, T>(
      Object.keys(obj).map((key) => [key, obj[key]])
    );
    return map;
  }
}

type FieldProps = {
  name: string;
  type: "text" | "number";
  nullable?: boolean;
  pk?: boolean;
};

class Field {
  readonly name: string;
  readonly type: "text" | "number";
  readonly nullable: boolean = true;
  readonly pk: boolean = false;

  constructor(props: FieldProps) {
    const { name, type } = props;
    this.name = name;
    this.type = type;
    if (props.nullable) this.nullable = props.nullable;
    if (props.pk) this.pk = props.pk;
  }
}

type Registry = any;

abstract class RegistryBuilder {
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

class Table {
  private tableName: string;
  private readonly fields: Field[] = [];
  private readonly registries: Registry[] = [];

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  field(dto: FieldProps): Table {
    const field = new Field(dto);
    this.fields.push(field);
    return this;
  }

  getTableName(): string {
    return this.tableName;
  }

  insert(dto: any): string {
    const registry = RegistryBuilder.build(this.fields, dto);
    this.registries.push(registry);
    return "1 line affected";
  }

  private find(id: number): any {
    return this.registries.find((registry) => registry.id === id);
  }

  select(id: number, show: any): string {
    const registry = this.find(id);
    if (!registry) return "";
    const registryView: any = {};
    const showMap = ObjToMap.convert<boolean>(show);
    showMap.forEach((value, key) => {
      if (!value) return;
      const fieldToShow = registry[key];
      registryView[key] = fieldToShow;
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
}

class ORM {
  private tables: Table[] = [];

  constructor() {}

  createTable(tableName: string): Table {
    const table = new Table(tableName);
    this.tables.push(table);
    return table;
  }

  getTable(tableName: string): string {
    const table = this.table(tableName);
    return JSON.stringify(table);
  }

  table(tableName: string): Table {
    const table = this.tables.find(
      (table) => table.getTableName().localeCompare(tableName) === 0
    );
    if (!table) throw new Error();
    return table;
  }
}

const orm = new ORM();

///////////////// Tests /////////////////

(() => {
  orm
    .createTable("products")
    .field({ name: "id", type: "number", nullable: false, pk: true })
    .field({ name: "name", type: "text", nullable: false })
    .field({ name: "value", type: "number", nullable: false })
    .field({ name: "unit", type: "text", nullable: false });
  console.log(orm.getTable("products"));
})();
/* returns: 
{
    tableName: "products",
    fields: [
        { name: "id", type: "number", nullable: false, pk: true },
        { name: "name", type: "text", nullable: false },
        { name: "value", type: "number", nullable: false },
        { name: "unit", type: "text", nullable: false }
    ]
}
*/
console.log(
  orm.table("products").insert({ name: "apple", value: 5.49, unit: "kg" })
);
// returns: 1 line affected
console.log(
  orm
    .table("products")
    .select(1, { id: true, name: true, value: true, unit: true })
);
// returns: { id: 1, name: "apple", value: 5.49, unit: "kg" }
console.log(
  orm
    .table("products")
    .select(1, { id: false, name: true, value: false, unit: true })
);
// returns: { name: "apple", unit: "kg" }
console.log(orm.table("products").update(1, { name: "banana", value: 2.49 }));
// returns: 1 line affected
console.log(
  orm
    .table("products")
    .select(1, { id: true, name: true, value: true, unit: true })
);
// returns: { id: 1, name: "banana", value: 2.49, unit: "kg" }
console.log(
  orm
    .table("products")
    .select(1, { id: false, name: true, value: true, unit: false })
);
// returns: { name: "banana", value: 2.49 }
console.log(orm.table("products").delete(1));
// returns: 1 line affected
console.log(orm.table("products").selectMany());
// returns: []
