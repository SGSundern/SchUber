import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Button onClick={increment} variant="contained">
          Cookie Clicker
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          Hier kannst du testen, wie React funktioniert: {counter} mal geklickt.
        </Typography>
      </Grid>
    </Grid>
  );
};
