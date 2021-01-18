import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import NextLink from "next/link";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar({ currentUser }) {
  const classes = useStyles();
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map((link) => (
      <NextLink href={link.href} key={link.href}>
        <Link style={{ cursor: "pointer", padding: "10px" }} color="inherit">
          {link.label}{" "}
        </Link>
      </NextLink>
    ));
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Ticketing</Typography>

        <Grid container justify="flex-end">
          {links}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
