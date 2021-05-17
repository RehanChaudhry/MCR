import * as Yup from "yup";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { SchemaOf } from "yup";
import { AppLog } from "utils/Util";

let FieldTypes = {
  dropdown: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.object().required(field?.inputType + " field required."),
  text: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(field?.inputType + " is required."),
  checkbox: (field: FormInputFieldData): SchemaOf<any> => {
    AppLog.log("remove warning " + field.inputType);
    return Yup.object().notRequired();
  },
  radio: (field: FormInputFieldData): SchemaOf<any> => {
    AppLog.log("remove warning " + field.inputType);
    return Yup.object().optional();
  },
  textarea: (field: FormInputFieldData): SchemaOf<any> =>
    Yup.string().required(field?.inputType + " is required.")
};

export const createYupSchema = (fields: FormInputFieldData[]) => {
  const schema = fields.reduce(
    (_schema, field) =>
      field.isRequired === 1
        ? {
            ..._schema,
            // @ts-ignore
            [field.id]: FieldTypes[field.inputType](field)
          }
        : _schema,
    {}
  );

  return Yup.object().shape(schema);
};
