import * as Yup from "yup";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
export const createYupSchema = (fields: FormInputFieldData[]) => {
  // let validator: Schema<any> = Yup.string();

  let FieldTypes = {
    dropdown: () => Yup.object().required("Dropdown field required."),
    text: () => Yup.string().required("Field is required."),
    checkbox: () => Yup.object().notRequired(),
    textarea: () => Yup.string().required("TextArea is required.")
  };

  const schema = fields.reduce((_schema, field) => {
    return field.isRequired === 1
      ? {
          ..._schema,
          // @ts-ignore
          [field.id]: FieldTypes.text()
        }
      : _schema;
  }, {});

  return Yup.object().shape(schema);
};
