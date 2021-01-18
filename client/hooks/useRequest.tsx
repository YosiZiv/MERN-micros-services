import { Typography, Grid } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
export default function useRequest() {
  const [errors, setErrors] = useState(null);
  const doRequest = async ({ url, method, body, onSuccess }) => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, body);
      onSuccess && onSuccess(data);
      return data;
    } catch (err) {
      console.log(errors);
      setErrors(
        err.response.data.errors.map((err) => (
          <Grid key={err.message}>
            <Typography style={{ color: "#db2912" }}>{err.message}</Typography>
          </Grid>
        ))
      );
    }
  };
  return { doRequest, errors };
}
