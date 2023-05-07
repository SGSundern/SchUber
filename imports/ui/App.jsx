import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Links } from "./Links.jsx";

export const App = () => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant="h1">
        Hi! Willkommen bei der großartigen SchUber App
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Hello />
    </Grid>
    <Grid item xs={12}>
      <Links />
    </Grid>
  </Grid>
);
