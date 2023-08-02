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
    const { name, type } = props;
    this.name = name;
    this.type = type;
    if (typeof props.nullable === "boolean") this.nullable = props.nullable;
    if (props.pk) {
      this.pk = props.pk;
      this.nullable = false;
    }
  }
}
