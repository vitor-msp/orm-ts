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

  constructor(props: FieldProps) {
    this.name = props.name;
    this.type = props.type;
    if (this.isValidNullable(props)) this.nullable = props.nullable!;
    if (props.pk) {
      this.pk = props.pk;
      this.nullable = false;
    }
  }

  private isValidNullable(props: FieldProps): boolean {
    return typeof props.nullable === "boolean";
  }
}
