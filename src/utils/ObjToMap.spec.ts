import { ObjToMap } from "./ObjToMap";

describe("unit tests for ObjToMap class", () => {
  test("ensure convert obj to map", () => {
    const obj: any = {
      key1: "value1",
      key2: "value2",
    };
    const map = ObjToMap.convert(obj);
    const keys = map.keys();
    const values = map.values();
    expect(keys.next().value).toEqual("key1");
    expect(values.next().value).toEqual("value1");
    expect(keys.next().value).toEqual("key2");
    expect(values.next().value).toEqual("value2");
  });
});
