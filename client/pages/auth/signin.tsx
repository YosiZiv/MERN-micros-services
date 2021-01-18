import {
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, useField, FieldAttributes } from "formik";
import * as yup from "yup";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
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
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(30),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

export default function Signin() {
  const classes = useStyle();
  const { doRequest, errors } = useRequest();
  const submitHandler = async ({ email, password }) => {
    doRequest({
      url: "/api/users/signin",
      method: "post",
      body: {
        email,
        password,
      },
      onSuccess: () => Router.push("/"),
    });
  };
  return (
    <Grid>
      <Paper className={classes.paper} elevation={10}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h6">Sign In</Typography>
          </Grid>

          <Grid item>
            <Formik
              // init value to form
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async ({ email, password }, { setSubmitting }) => {
                setSubmitting(true);
                submitHandler({ email, password });
                setSubmitting(false);
              }}
            >
              {() => (
                <Form>
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

                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedA}
                        // onChange={handleChange}
                        name="Remember Me"
                      />
                    }
                    label="Remember Me"
                  />

                  <Grid item>
                    <Button
                      className="signinButton"
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>

          <Grid item>
            <Typography>
              <Link href="#">Forget Password?</Link>
            </Typography>

            <Typography>
              don't have account?
              <Link href="/signup"> Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
