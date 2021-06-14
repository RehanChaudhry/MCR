import * as Yup from "yup";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { SchemaOf } from "yup";
import { AgreementField } from "models/api_requests/GetAgreementApi";

let FieldTypes = {
  text: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string()
      .required(computeValidationMessage(field))
      .min(3, "Should be atleast 3 characters")
      .max(50, "should be less than 50 characters"),
  dropdown: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.object().required(computeValidationMessage(field)),
  checkbox: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.array().required(computeValidationMessage(field)),
  radio: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(computeValidationMessage(field)),
  textarea: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(computeValidationMessage(field)),
  agreement: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(computeValidationMessage(field))
};

export const createYupSchema = (
  fields: FormInputFieldData[] | AgreementField[]
) => {
  const schema = (fields as (
    | FormInputFieldData
    | AgreementField
  )[]).reduce<FormInputFieldData | AgreementField>((_schema, field) => {
    return field.isRequired === 1
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
  return field?.name?.[0] + field.name?.slice(1) + " is required";
}
