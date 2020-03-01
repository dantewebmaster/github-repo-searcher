import React from 'react';
import PropTypes from 'prop-types';

import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import DetailedExpansionPanel from './DetailExpansionPanel';

const useStyles = makeStyles((theme) => ({
  results: {
    margin: theme.spacing(1, 4, 0, 4),
    padding: theme.spacing(0, 1, 1.6, 1),
    flex: 1,
    overflow: 'auto',
    position: 'relative',
  },
  loader: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999',
  },
  searchTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',

    '& > svg': {
      fontSize: 80,
    },
  },
}));

export default function Results({ state }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.results} id="results">
        {!state.loading && state.repos.length > 0 && state.repos.map((repo) => (
          <DetailedExpansionPanel
            key={repo.id}
            data={repo}
          />
        ))}

        {!state.loading && state.repos.length === 0 && true && (
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <Typography className={classes.searchTitle} align="center" variant="h3" component="h3">
                <SearchIcon />
                <span>
                  Pesquise por
                  <br />
                  repositórios
                </span>
              </Typography>
              <br />
              <Typography align="center" variant="body1" component="p">
                Digite os termos de busca no campo de texto
                <br />
                acima para fazer uma busca por repositórios no github.
              </Typography>
            </CardContent>
          </Card>
        )}

        {!state.loading && false && (
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <Typography align="center" variant="h3" component="h3">
                Errrroww...
              </Typography>
              <Typography align="center" variant="body1" component="p">
                Sua busca não retornou resultados.
                Teste pesquisar novamente com palavras difenrentes
              </Typography>
            </CardContent>
          </Card>
        )}

        {state.loading && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
      </div>

      {state.loadingMore && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}

Results.propTypes = {
  state: PropTypes.shape({
    repos: PropTypes.array,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
  }).isRequired,
};
