import * as Yup from "yup";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { SchemaOf } from "yup";
import { AppLog } from "utils/Util";
import { AgreementField } from "models/api_requests/GetAgreementApi";

let FieldTypes = {
  dropdown: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.object().required(field?.inputType + " field required."),
  text: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string()
      .required(field?.inputType + " is required.")
      .min(3, "Should be atleast 3 characters")
      .max(50, "should be less than 50 characters"),
  checkbox: (field: FormInputFieldData): SchemaOf<any> => {
    AppLog.log("remove warning " + field.inputType);
    return Yup.array().notRequired();
  },
  radio: (field: FormInputFieldData): SchemaOf<any> => {
    AppLog.log("remove warning " + field.inputType);
    return Yup.string().notRequired();
  },
  textarea: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(field?.inputType + " is required."),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  agreement: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().notRequired()
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
