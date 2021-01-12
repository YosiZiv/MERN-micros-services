import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from "formik";
import * as yup from "yup";
const useStyle = makeStyles({
  title: {
    textAlign: "center",
    padding: "10px",
  },
  formContainer: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
  },
  input: {
    padding: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    width: "40%",
    padding: "10px",
  },
});

const CustomTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  className,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.touched && meta.error;
  return (
    <TextField
      className={className}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(30),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

export default function Signup() {
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
          pets: [{ type: "cat", name: "jarvis", id: Math.random() }],
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          // async submit
          console.log(data);
          setSubmitting(false);
        }}
        validate={(values) => {
          // custom error handler
          const errors: Record<string, string> = {};
          return errors;
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div className={classes.formContainer}>
              <CustomTextField
                className={classes.input}
                placeholder="Email"
                name="email"
                type="email"
              />
              <CustomTextField
                className={classes.input}
                placeholder="Password"
                name="password"
                type="password"
              />
              <div className={classes.buttonContainer}>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </div>
              {/* <FieldArray name="pets">
                {(arrayHelpers) => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          id: "" + Math.random(),
                          name: "",
                          type: "frog",
                        })
                      }
                    >
                      Add a pet
                    </Button>
                    {values.pets.map((pet, index) => (
                      <div key={pet.id}>
                        <CustomTextField
                          placeholder="Pet name"
                          name={`pets.${index}.name`}
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">Cat</MenuItem>
                          <MenuItem value="Dog">Dog</MenuItem>
                          <MenuItem value="Frog">Frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray> */}
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
