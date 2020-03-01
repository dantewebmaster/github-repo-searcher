import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// MUI Icons
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GithubIcon from '@material-ui/icons/GitHub';

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
    flexBasis: '33.33%',
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
  },
}));

export default function DetailExpansionPanel({ data }) {
  const classes = useStyles();

  return (
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
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Linguagem:
              {data.language}
              <br />
              <a
                className={classes.link}
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar repositório
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <StarIcon fontSize="small" />
              {data.stargazers_count}
            </div>
            <div className={classes.stat}>
              <VisibilityIcon fontSize="small" />
              {data.watchers_count}
            </div>
          </div>
          <div className={classes.actions}>
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

    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
