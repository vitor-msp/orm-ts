import { Table } from "./Table";

export class ORM {
  private tables: Table[] = [];

  constructor() {}

  createTable(tableName: string): Table {
    const table = new Table(tableName);
    this.tables.push(table);
    return table;
  }

  table(tableName: string): Table {
    const table = this.tables.find((table) => table.tableName === tableName);
    if (!table) throw new Error();
    return table;
  }

  getTables(): Table[] {
    return this.tables;
  }
}
