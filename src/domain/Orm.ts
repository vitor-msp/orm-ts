import { Table } from "./Table";

export class ORM {
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
      (table) => table.tableName.localeCompare(tableName) === 0
    );
    if (!table) throw new Error();
    return table;
  }
}
