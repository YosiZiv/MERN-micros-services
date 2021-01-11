import { Button, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, useField, FieldAttributes } from "formik";
import * as yup from "yup";

const CustomTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.touched && meta.error;
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(256),
});

export default () => {
  const classes = useStyle();
  return (
    <div>
      <div className={classes.title}>
        <Typography className={classes.title} variant="h4">
          Sign Up
        </Typography>
      </div>
      <Formik
        // init value to form
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          // async submit
          console.log(data);
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.email.includes("test")) {
            errors.email = "test";
          }
          return errors;
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div className={classes.formContainer}>
              <CustomTextField placeholder="Email" name="email" type="email" />
              <CustomTextField
                placeholder="Password"
                name="password"
                type="password"
              />

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const useStyle = makeStyles({
  title: {
    textAlign: "center",
    padding: "10px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
