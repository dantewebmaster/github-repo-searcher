import React, { useState } from 'react';

// MUI components
import {
  AppBar,
  Typography,
  Toolbar,
  InputBase,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

// MUI icons
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(1)
  },
  appTitle: {
    margin: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1.6, 2, 1.6, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
  }
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState('');

  return (
    <div>
      <AppBar position="static" elevation={0} className={classes.header}>
        <div className={classes.appTitle}>
          <Typography align="center" variant="h4" component="h1">
            <GitHubIcon /> Github Repo Searcher
          </Typography>
        </div>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="search"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={({ target }) => setValue(target.value)}
              value={value}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
