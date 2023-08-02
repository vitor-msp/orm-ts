import { ObjToMap } from "./ObjToMap";

describe("unit tests for ObjToMap class", () => {
  test("ensure convert obj to map", () => {
    const obj: any = {
      key1: "value1",
      key2: "value2",
    };
    const map = ObjToMap.convert(obj);
    const field1 = map.keys().next();
    expect(field1).toEqual("key1");
    expect(field1.value).toEqual("value1");
    const field2 = map.keys().next();
    expect(field2).toEqual("key2");
    expect(field2.value).toEqual("value2");
  });
});
