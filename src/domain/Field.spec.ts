import { Field, FieldProps } from "./Field";

describe("unit tests for Field class", () => {
  test("ensure set default fields", () => {
    const fieldProps: FieldProps = {
      name: "field",
      type: "text",
    };
    const field = new Field(fieldProps);
    expect(field.name).toEqual(fieldProps.name);
    expect(field.type).toEqual(fieldProps.type);
    expect(field.nullable).toBeTruthy();
    expect(field.pk).toBeFalsy();
  });

  test("ensure set passed fields", () => {
    const fieldProps: FieldProps = {
      name: "field",
      type: "text",
      nullable: true,
      pk: true,
    };
    const field = new Field(fieldProps);
    expect(field.name).toEqual(fieldProps.name);
    expect(field.type).toEqual(fieldProps.type);
    expect(field.nullable).toBeTruthy();
    expect(field.pk).toBeTruthy();
  });
});