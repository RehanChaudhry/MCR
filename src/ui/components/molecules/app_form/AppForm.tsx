import { Formik, FormikValues } from "formik";
import React from "react";

export interface AppFormProps {
  children?: React.ReactNode;
  initialValues: FormikValues;
  onSubmit: (values: FormikValues) => void;
  isInitialValid?: boolean;
  validationSchema: FormikValues;
}

type Props = AppFormProps;

const AppForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  isInitialValid,
  children
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      isInitialValid={isInitialValid}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
