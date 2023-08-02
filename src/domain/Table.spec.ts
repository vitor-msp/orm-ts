import { FieldProps } from "./Field";
import { Table } from "./Table";

describe("integration tests for Table class", () => {
  test("ensure add field to table", () => {
    const fieldProps: FieldProps = {
      name: "id",
      type: "number",
      pk: true,
    };
    const table = new Table("table").field(fieldProps);
    expect(table.tableName).toEqual("table");
    const fields = table.getFields();
    expect(fields.length).toEqual(1);
    expect(fields[0].name).toEqual(fieldProps.name);
    expect(fields[0].type).toEqual(fieldProps.type);
    expect(fields[0].nullable).toBeFalsy();
    expect(fields[0].pk).toEqual(fieldProps.pk);
  });

  test("ensure insert registry to table", () => {
    const data: any = {
      name: "name",
      age: 24,
    };
    const table = new Table("table")
      .field({ name: "id", type: "number", pk: true })
      .field({ name: "name", type: "string", nullable: false })
      .field({ name: "age", type: "number" });
    const response = table.insert(data);
    expect(response).toEqual("1 line affected");
    const registries = table.getRegistries();
    expect(registries.length).toEqual(1);
    expect(registries[0].id).toEqual(1);
    expect(registries[0].name).toEqual(data.name);
    expect(registries[0].age).toEqual(data.age);
  });
});
