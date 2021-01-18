import { Grid, Typography } from "@material-ui/core";
import Router from "next/router";
import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";

export default function Signout() {
  const { doRequest, errors } = useRequest();
  useEffect(() => {
    doRequest({
      url: "/api/users/signout",
      method: "post",
      body: {},
      onSuccess: () => Router.push("/"),
    });
  }, []);
  return (
    <Grid>
      <Typography>Signing you out...</Typography>
    </Grid>
  );
}
