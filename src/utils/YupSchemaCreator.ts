import * as Yup from "yup";
import { AppLog } from "utils/Util";

export function createYupSchema(schema: any, config: any) {
  let { id, inputType, isRequired } = config;

  if (inputType === "checkbox") {
    return schema;
  }
  let validator = Yup.string();

  // @ts-ignore
  if (!validator[isRequiredField(isRequired)]) {
    return;
  }

  // @ts-ignore
  validator = validator[isRequiredField(isRequired)]("Field is required");

  schema[id] = validator;

  // @ts-ignore
  AppLog.logForcefully("is null " + JSON.stringify(validator.required()));
  return schema;
}

export function isRequiredField(isRequired: number): string {
  if (isRequired === 1) {
    return "required";
  } else {
    return "notrequired";
  }
}
