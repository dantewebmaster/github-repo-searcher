import React from 'react';

// MUI Components
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    textAlign: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="caption">
        Github Repo Searcher v1.0
      </Typography>
    </div>
  );
}
