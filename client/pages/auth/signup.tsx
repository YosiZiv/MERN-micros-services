import {
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Avatar,
  Link,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, useField, FieldAttributes } from "formik";
import * as yup from "yup";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";
const useStyle = makeStyles({
  title: {
    textAlign: "center",
    padding: "10px",
  },
  paper: {
    padding: "20px",
    height: "70vh",
    margin: "20px auto",
    width: "280px",
  },
  avatar: {
    backgroundColor: "#1bbd7e",
  },
  input: {
    padding: "5px",
  },
  signinButton: {
    margin: "8px 0",
  },
});

const CustomTextField: React.FC<
  FieldAttributes<{ label: string; fullWidth: boolean }>
> = ({ placeholder, className, label, fullWidth, type, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.touched && meta.error;
  return (
    <TextField
      type={type}
      label={label}
      className={className}
      placeholder={placeholder}
      {...field}
      fullWidth={fullWidth}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  username: yup.string().required().min(2).max(30),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(30),
  repeatPassword: yup
    .string()
    .min(6)
    .max(30)
    .test("passwordMatch", "Password didn't Match", function (value) {
      return value === this.parent.password;
    }),
});

export default function Signup() {
  const classes = useStyle();
  const { doRequest, errors } = useRequest();
  const submitHandler = async ({ username, email, password }) => {
    doRequest({
      url: "/api/users/signup",
      method: "post",
      body: {
        username,
        email,
        password,
      },
      onSuccess: () => Router.push("/"),
    });
  };
  return (
    <Grid>
      <Paper className={classes.paper} elevation={10}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h6">Sign Up</Typography>
        </Grid>
        <Formik
          // init value to form
          initialValues={{
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            await submitHandler(data);
            setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <CustomTextField
                name="username"
                className={classes.input}
                placeholder="Enter Username"
                label="Username"
                type="text"
                fullWidth={true}
              />
              <CustomTextField
                name="email"
                className={classes.input}
                placeholder="Enter Email"
                label="Email"
                type="email"
                fullWidth={true}
              />
              <CustomTextField
                name="password"
                className={classes.input}
                placeholder="Enter Password"
                label="Password"
                type="password"
                fullWidth={true}
              />
              <CustomTextField
                name="repeatPassword"
                className={classes.input}
                placeholder="Enter Password"
                label="Repeat Password"
                type="password"
                fullWidth={true}
              />
              <Button
                className={classes.signinButton}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              {errors}
              <Typography>
                Already have account?
                <Link> Sign in</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
