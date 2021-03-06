import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Typography,
  Avatar,
  Divider,
  Button,
  Chip,
} from '@material-ui/core';

// MUI Icons
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GithubIcon from '@material-ui/icons/GitHub';
import CodeIcon from '@material-ui/icons/Code';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ErrorIcon from '@material-ui/icons/Error';

// Actions
import { setState, fetchAuthor } from '../store/author/actions';

// App components
import ProfileModal from './ProfileModal';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '4px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(1),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  owner: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  stats: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),

    '& > svg': {
      marginRight: theme.spacing(0.5),
    },
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',

    '& button': {
      margin: theme.spacing(0, 0, 0, 0.5),
    },
    '& a': {
      margin: theme.spacing(0, 0, 0, 0.5),
    },
  },
  chips: {
    '& div': {
      margin: theme.spacing(0, 0.5, 0.5, 0),
    },
  },
}));

export default function DetailExpansionPanel({ data }) {
  const [open, setOpen] = useState(false);
  const authorData = useSelector((state) => state.author);

  const classes = useStyles();
  const dispatch = useDispatch();

  function handleGetAuthor(authorName) {
    setOpen(true);
    dispatch(setState({ state: 'authorName', value: authorName }));
    dispatch(fetchAuthor());
  }

  return (
    <>
      <div className={classes.root}>
        <ExpansionPanel elevation={0} style={{ border: '1px solid #f1f1f1' }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>{data.name}</Typography>
            </div>
            <div className={classes.column}>
              <div className={classes.owner}>
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src={data.owner.avatar_url}
                  className={classes.small}
                />
                <Typography className={classes.secondaryHeading}>
                  {data.owner.login}
                </Typography>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              {data.description}
            </div>
            <div className={clsx(classes.column, classes.helper, classes.chips)}>
              {data.language && (
              <Chip
                label={data.language}
                variant="outlined"
                color="primary"
                icon={<CodeIcon fontSize="small" />}
              />
              )}
              <Chip
                label={data.open_issues_count}
                variant="outlined"
                color="primary"
                icon={<ErrorIcon fontSize="small" />}
              />
              <Chip
                label={data.stargazers_count}
                variant="outlined"
                color="primary"
                icon={<StarIcon fontSize="small" />}
              />
              <Chip
                label={data.forks_count}
                variant="outlined"
                color="primary"
                icon={<CallSplitIcon fontSize="small" />}
              />
              <Chip
                label={data.watchers_count}
                variant="outlined"
                color="primary"
                icon={<VisibilityIcon fontSize="small" />}
              />
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <div className={classes.actions}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                startIcon={<AccountCircleIcon />}
                onClick={() => handleGetAuthor(data.owner.login)}
              >
                Autor
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                startIcon={<GithubIcon />}
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório
              </Button>
            </div>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
      <ProfileModal
        open={open}
        data={authorData.data}
        loading={authorData.loading}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

DetailExpansionPanel.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    watchers_count: PropTypes.number,
    stargazers_count: PropTypes.number,
    html_url: PropTypes.string,
    language: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    forks_count: PropTypes.number,
    open_issues_count: PropTypes.number,

    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
