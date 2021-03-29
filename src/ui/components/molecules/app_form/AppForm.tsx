import { Formik, FormikValues } from "formik";
import React from "react";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export interface AppFormProps {
  children?: React.ReactNode;
  initialValues: FormikValues;
  onSubmit: (values: FormikValues) => void;
  validationSchema: FormikValues;
}

type Props = AppFormProps;

const AppForm = optimizedMemo<Props>(
  ({ initialValues, onSubmit, validationSchema, children }) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {() => <>{children}</>}
      </Formik>
    );
  }
);

export default AppForm;
