import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAPI } from "../hooks/useAPI";

/**
 * Diese Komponente zeigt, wie der Data Tracker Datensätze aus
 * der MongoDB holt und aktuell hält.
 *
 * Hat nichts mit SQL zu tun.
 * @returns Komponente
 */
export const Links = () => {
  const { loading, data } = useAPI(
    Meteor.settings.public.rootUrl + "/api/v1/links",
    "GET"
  );

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">Learn Meteor!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          Diese Daten kommen aus der SQL Datenbank:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {data.map((link) => (
            <ListItem key={link._id}>
              <ListItemIcon>
                <OpenInNewIcon />
              </ListItemIcon>
              <ListItemButton href={link.url} target="_blank">
                <ListItemText primary={link.title} secondary={link.url} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
