import { ORM } from "./Orm";
import { Table } from "./Table";

describe("integration tests for Orm class", () => {
  const generateOrm = (): ORM => {
    const tableName = "table";
    const orm = new ORM();
    orm.createTable(tableName);
    return orm;
  };

  test("ensure create a table", () => {
    const tableName = "table";
    const orm = new ORM();
    const table = orm.createTable(tableName);
    expect(table instanceof Table).toBeTruthy();
    const tables = orm.getTables();
    expect(tables.length).toEqual(1);
    expect(tables[0].tableName).toEqual(tableName);
  });

  test("ensure throw error when getted a inexistent table", () => {
    const tableName = "inexistent";
    const orm = generateOrm();
    expect(() => orm.table(tableName)).toThrow(Error);
  });

  test("ensure get a table", () => {
    const tableName = "table";
    const orm = generateOrm();
    const table = orm.table(tableName);
    expect(table instanceof Table).toBeTruthy();
    const tables = orm.getTables();
    expect(tables.length).toEqual(1);
    expect(tables[0].tableName).toEqual(tableName);
  });
});
