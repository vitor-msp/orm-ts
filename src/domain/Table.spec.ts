import { FieldProps } from "./Field";
import { Table } from "./Table";

describe("integration tests for Table class", () => {
  const generateTable = (): Table => {
    const table = new Table("table")
      .field({ name: "id", type: "number", pk: true })
      .field({ name: "name", type: "string", nullable: false })
      .field({ name: "age", type: "number" });
    table.insert({
      name: "name",
      age: 24,
    });
    return table;
  };

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

  test("ensure select show only selected fields", () => {
    const table = generateTable();
    let response: string;
    response = table.select(1, { id: false, name: true, age: true });
    expect(response).toEqual(
      JSON.stringify({
        name: "name",
        age: 24,
      })
    );
    response = table.select(1, { name: true, age: true });
    expect(response).toEqual(
      JSON.stringify({
        name: "name",
        age: 24,
        id: 1,
      })
    );
    expect(table.getRegistries().length).toEqual(1);
  });

  test("ensure that select not found inexistent registry", () => {
    const table = generateTable();
    const response = table.select(2, {});
    expect(response).toEqual("");
    expect(table.getRegistries().length).toEqual(1);
  });

  test("ensure that update not found inexistent registry", () => {
    const table = generateTable();
    const response = table.update(2, {});
    expect(response).toEqual("0 lines affected");
    expect(table.getRegistries().length).toEqual(1);
  });

  test("ensure not update a registry with invalid age", () => {
    const table = generateTable();
    const response = table.update(1, {
      age: "age",
    });
    expect(response).toEqual("0 lines affected");
    const registries = table.getRegistries();
    expect(registries.length).toEqual(1);
    expect(registries[0].id).toEqual(1);
    expect(registries[0].name).toEqual("name");
    expect(registries[0].age).toEqual(24);
  });

  test("ensure update a registry", () => {
    const table = generateTable();
    const response = table.update(1, {
      name: "edited",
    });
    expect(response).toEqual("1 line affected");
    const registries = table.getRegistries();
    expect(registries.length).toEqual(1);
    expect(registries[0].id).toEqual(1);
    expect(registries[0].name).toEqual("edited");
    expect(registries[0].age).toEqual(24);
  });

  test("ensure that delete not found inexistent registry", () => {
    const table = generateTable();
    const response = table.delete(2);
    expect(response).toEqual("0 lines affected");
    expect(table.getRegistries().length).toEqual(1);
  });

  test("ensure delete a registry", () => {
    const table = generateTable();
    const response = table.delete(1);
    expect(response).toEqual("1 line affected");
    expect(table.getRegistries().length).toEqual(0);
  });

  test("ensure select all registries", () => {
    const table = generateTable();
    const response = table.selectMany();
    expect(response).toEqual(
      JSON.stringify([
        {
          name: "name",
          age: 24,
          id: 1,
        },
      ])
    );
    expect(table.getRegistries().length).toEqual(1);
  });

  test("ensure get table schema", () => {
    const schema = generateTable().getSchema();
    expect(schema).toEqual({
      tableName: "table",
      fields: [
        { name: "id", type: "number", nullable: false, pk: true },
        { name: "name", type: "string", nullable: false, pk: false },
        { name: "age", type: "number", nullable: true, pk: false },
      ],
    });
  });
});
