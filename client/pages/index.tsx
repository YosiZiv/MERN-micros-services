import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { NextPageContext } from "next";
import buildClient from "../api/build-client";
export default function Index({ currentUser }) {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        {currentUser ? (
          <Typography>You are sign in</Typography>
        ) : (
          <Typography>You are Not sign in</Typography>
        )}
      </Grid>
    </div>
  );
}
Index.getInitialProps = async (context: NextPageContext) => {
  console.log("landing page");

  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};
