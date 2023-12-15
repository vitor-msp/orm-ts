export type FieldProps = {
  name: string;
  type: "string" | "number";
  nullable?: boolean;
  pk?: boolean;
};

export class Field {
  readonly name: string;
  readonly type: "string" | "number";
  readonly nullable: boolean = true;
  readonly pk: boolean = false;

  constructor(fieldProps: FieldProps) {
    this.name = fieldProps.name;
    this.type = fieldProps.type;
    if (this.isValidNullable(fieldProps)) this.nullable = fieldProps.nullable!;
    if (fieldProps.pk) {
      this.pk = fieldProps.pk;
      this.nullable = false;
    }
  }

  private isValidNullable(props: FieldProps): boolean {
    return typeof props.nullable === "boolean";
  }
}
