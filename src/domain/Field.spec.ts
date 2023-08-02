import { Field, FieldProps } from "./Field";

describe("unit tests for Field class", () => {
  test("ensure set default fields", () => {
    const fieldProps: FieldProps = {
      name: "field",
      type: "string",
    };
    const field = new Field(fieldProps);
    expect(field.name).toEqual(fieldProps.name);
    expect(field.type).toEqual(fieldProps.type);
    expect(field.nullable).toBeTruthy();
    expect(field.pk).toBeFalsy();
  });

  test("ensure set passed fields and nullable true", () => {
    const fieldProps: FieldProps = {
      name: "field",
      type: "string",
      nullable: true,
      pk: false,
    };
    const field = new Field(fieldProps);
    expect(field.name).toEqual(fieldProps.name);
    expect(field.type).toEqual(fieldProps.type);
    expect(field.nullable).toBeTruthy();
    expect(field.pk).toBeFalsy();
  });

  test("ensure set passed fields and nullable false", () => {
    const fieldProps: FieldProps = {
      name: "field",
      type: "string",
      nullable: false,
      pk: false,
    };
    const field = new Field(fieldProps);
    expect(field.name).toEqual(fieldProps.name);
    expect(field.type).toEqual(fieldProps.type);
    expect(field.nullable).toBeFalsy();
    expect(field.pk).toBeFalsy();
  });

  test("ensure set nulablle automatically when field is pk", () => {
    const fieldProps: FieldProps = {
      name: "field",
      type: "string",
      pk: true,
    };
    const field = new Field(fieldProps);
    expect(field.name).toEqual(fieldProps.name);
    expect(field.type).toEqual(fieldProps.type);
    expect(field.nullable).toBeFalsy();
    expect(field.pk).toBeTruthy();
  });
});
