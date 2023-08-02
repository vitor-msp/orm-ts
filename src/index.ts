import { ORM } from "./domain/Orm";

const orm = new ORM();

///////////////// Tests /////////////////

(() => {
  orm
    .createTable("products")
    .field({ name: "id", type: "number", nullable: false, pk: true })
    .field({ name: "name", type: "string", nullable: false })
    .field({ name: "value", type: "number", nullable: false })
    .field({ name: "unit", type: "string", nullable: false });
  console.log(orm.table("products").selectMany());
})();
/* returns: 
[
    { name: "id", type: "number", nullable: false, pk: true },
    { name: "name", type: "string", nullable: false },
    { name: "value", type: "number", nullable: false },
    { name: "unit", type: "string", nullable: false }
]
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
