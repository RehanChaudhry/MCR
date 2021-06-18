import * as Yup from "yup";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { SchemaOf } from "yup";
import { AgreementField } from "models/api_requests/GetAgreementApi";
import { pattern } from "utils/Util";

let FieldTypes = {
  text: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string()
      .required(computeValidationMessage(field))
      .min(3, "Should be atleast 3 characters")
      .max(50, "should be less than 50 characters"),
  dropdown: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.object().required(computeValidationMessage(field)),
  checkbox: (_: FormInputFieldData): SchemaOf<any> =>
    Yup.array()
      .required("Please pick atleast one item")
      .min(1, "Please pick atleast one item"),
  radio: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(computeValidationMessage(field)),
  textarea: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(computeValidationMessage(field)),
  agreement: (_: FormInputFieldData): SchemaOf<any> =>
    Yup.bool().oneOf([true], "Please accept roommate terms."),
  url: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string()
      .test(
        "custom error", //method name for yup
        `Please enter valid ${field.label?.toLowerCase()}.`,
        (value: string | undefined): boolean => {
          if (!value) {
            return true;
          } else {
            return pattern.test(value);
          }
        }
      )
      .nullable()
};

export const createYupSchema = (
  fields: FormInputFieldData[] | AgreementField[]
) => {
  const schema = (fields as (
    | FormInputFieldData
    | AgreementField
  )[]).reduce<FormInputFieldData | AgreementField>((_schema, field) => {
    return field.isRequired === 1 || field.inputType === "url"
      ? {
          ..._schema,
          // @ts-ignore
          [field.id]: FieldTypes[field.inputType](field)
        }
      : _schema;
  }, {} as any);

  return Yup.object().shape(schema as any);
};

function computeValidationMessage(field: FormInputFieldData) {
  return field?.label + " is required";
}
