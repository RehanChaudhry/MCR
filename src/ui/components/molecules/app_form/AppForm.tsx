import { Formik, FormikValues } from "formik";
import React from "react";

export interface AppFormProps {
  children?: React.ReactNode;
  initialValues: FormikValues;
  onSubmit: (values: FormikValues) => void;
  validationSchema: FormikValues;
}

type Props = AppFormProps;

const AppForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
