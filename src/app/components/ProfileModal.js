import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';

// MUI Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Chip from '@material-ui/core/Chip';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// Styles
const useStyles = makeStyles((theme) => ({
  infos: {
    display: 'flex',
    marginBottom: theme.spacing(1.6),
  },
  bio: {
    margin: theme.spacing(2),

    '& p': {
      color: theme.palette.text.secondary,
    },
  },
  extraInfo: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    borderRadius: 4,
    justifyContent: 'space-evenly',
  },
  section: {
    display: 'flex',
    marginRight: theme.spacing(1),

    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
  photo: {
    textAlign: 'center',

    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  avatar: {
    width: theme.spacing(28),
    height: theme.spacing(28),
  },
  divider: {
    margin: theme.spacing(1.5, 0),
  },
  chips: {
    '& div': {
      margin: theme.spacing(0, 0.5, 0.5, 0),
    },
  },
}));

export default function ProfileModal({ open, handleClose, data }) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className={classes.infos}>
          <div className={classes.photo}>
            <Avatar
              variant="rounded"
              src="https://avatars1.githubusercontent.com/u/9997161?s=460&v=4"
              className={classes.avatar}
            />
            <Typography
              variant="h6"
              component="a"
              href="https://github.com/dantewebmaster"
              target="_blank"
              rel="noopener noreferrer"
            >
              @dantewebmaster
            </Typography>
          </div>
          <div className={classes.bio}>
            <Typography variant="h4" component="h2">Dante Webmaster</Typography>

            <Typography variant="body2" component="p">
              I am a Web Developer focused on Front-end and Wordpress CMS.
              And now getting deeper into the Javascript universe.
            </Typography>
            <Divider light className={classes.divider} />
            <div className={classes.chips}>
              <Chip label="12 Seguidores" />
              <Chip label="32 Seguindo" />
              <Chip label="24 Gists" />
              <Chip label="80 Repositórios públicos" />
            </div>
          </div>
        </div>
        <div className={classes.extraInfo}>
          <div className={classes.section}>
            <AssignmentIndIcon fontSize="small" />
            <Typography variant="body2" component="span">
              Avanade
            </Typography>
          </div>
          <div className={classes.section}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2" component="span">
              Brazil, São Paulo, SP
            </Typography>
          </div>
          <div className={classes.section}>
            <LanguageIcon fontSize="small" />
            <a
              href="https://dantewebmaster.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://dantewebmaster.github.io/
            </a>
          </div>
        </div>
      </DialogContent>
      {/* <Divider light /> */}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
        <Button onClick={handleClose} color="primary">
          Perfil Completo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
