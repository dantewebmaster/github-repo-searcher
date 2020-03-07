import React from 'react';
import PropTypes from 'prop-types';

// MUI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

// MUI Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef((props, ref) => (
  <Slide
    direction="up"
    ref={ref}
    {...props} // eslint-disable-line
  />
));

// Styles
const useStyles = makeStyles((theme) => ({
  modal: {
    maxWidth: '780px',
    margin: '0 auto',
  },
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
  loader: {
    display: 'flex',
    minHeight: '200px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalActions: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

export default function ProfileModal({
  open,
  handleClose,
  data,
  loading,
}) {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modal}
      fullWidth
      maxWidth={false}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {loading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      {!loading && data !== null && (
        <>
          <DialogContent>
            <div className={classes.infos}>
              <div className={classes.photo}>
                <Avatar
                  variant="rounded"
                  src={data.avatar_url}
                  className={classes.avatar}
                />
                <Typography
                  variant="h6"
                  component="a"
                  href={data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`@${data.login}`}
                </Typography>
              </div>
              <div className={classes.bio}>
                <Typography variant="h4" component="h2">
                  {data.name}
                </Typography>

                <Typography variant="body2" component="p">
                  {data.bio}
                </Typography>
                <Divider light className={classes.divider} />
                <div className={classes.chips}>
                  <Chip label={`${data.followers} Seguidores`} />
                  <Chip label={`${data.following} Seguindo`} />
                  <Chip label={`${data.public_gists} Gists`} />
                  <Chip label={`${data.public_repos} Repositórios públicos`} />
                </div>
              </div>
            </div>
            {data.company || data.location || data.blog ? (
              <div className={classes.extraInfo}>
                {data.company && (
                  <div className={classes.section}>
                    <AssignmentIndIcon fontSize="small" />
                    <Typography variant="body2" component="span">
                      {data.company}
                    </Typography>
                  </div>
                )}
                {data.location && (
                  <div className={classes.section}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2" component="span">
                      {data.location}
                    </Typography>
                  </div>
                )}
                {data.blog && (
                  <div className={classes.section}>
                    <LanguageIcon fontSize="small" />
                    <a
                      href={data.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.blog}
                    </a>
                  </div>
                )}
              </div>
            ) : <Divider light />}
          </DialogContent>
          <DialogActions className={classes.modalActions}>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
            >
              Fechar
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Perfil Completo
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

ProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    avatar_url: PropTypes.string,
    html_url: PropTypes.string,
    login: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
    blog: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    public_gists: PropTypes.number,
    public_repos: PropTypes.number,
  }),
};

ProfileModal.defaultProps = {
  data: {},
};
