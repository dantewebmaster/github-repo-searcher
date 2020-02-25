import React, { useState, useEffect, useRef } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

// MUI components
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  CircularProgress,
  Card, CardContent, CssBaseline,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

// icons
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';

// components
import DetailExpansionPanel from './components/DetailExpansionPanel'
import { searchRepos } from './services/github.service'
import useDebounce from './utils/hooks/useDebounce';

import '../assets/css/Root.css'

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f1f1f1"
    },
    primary: {
      main: '#24292e',
    },
    secondary: {
      main: '#880e4f',
    },
  },
});


// @temp
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  appTitle: {
    margin: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
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
  },
  results: {
    margin: theme.spacing(1, 4, 0, 4),
    padding: theme.spacing(0, 1, 1.6, 1),
    flex: 1,
    overflow: 'scroll',
  },
  loader: {
    display: 'flex',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: theme.spacing(1)
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    textAlign: 'center',
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
    }
  },
}));

export default function Root() {

  // @temp
  const resultsRef = useRef(null)
  const classes = useStyles();

  const [value, setValue] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [empty, setEmpty] = useState(false)

  const [hasNextPage, setHasNextPage] = useState();
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(value, 800);

  // window.innerHeight + document.documentElement.scrollTop
  //   === document.documentElement.offsetHeight
  // console.log(resultsRef.current && resultsRef.current.offsetTop)

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.addEventListener('scroll', () => {
        if (
          resultsRef.current.scrollTop + resultsRef.current.clientHeight >=
          resultsRef.current.scrollHeight
        ) {
          console.log('Load more items...')
          setLoadingMore(true);

          // Some API call to fetch the next page
          searchRepos(debouncedSearchTerm, page)
            .then(newPage => {
              setLoadingMore(false);
              setHasNextPage(true);
              setRepos([...repos, ...newPage.data.items]);
              setPage(page + 1)
            })
            .catch(err => setRepos([]))
        }
      })
    }
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Set isSearching state
      setEmpty(false)
      setLoading(true)

      // Fire off our API call
      searchRepos(debouncedSearchTerm)
        .then(results => {
          // Set back to false since request finished
          setLoading(false)
          // Set results state

          setEmpty(results.data.items.length === 0)

          setRepos(results.data.items);

          setPage(2)
        });
    } else {
      setRepos([]);
    }

    // getRepos()
  }, [debouncedSearchTerm])

  function handleLoadMore() {
    setLoading(true);
    // Some API call to fetch the next page
    searchRepos(debouncedSearchTerm, page).then(newPage => {
      setLoading(false);
      setHasNextPage(true);
      setRepos(prevRepos => ([...prevRepos, ...newPage.data.items]));
      setPage(prevPage => prevPage + 1)
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.container}>
        <div>
          <AppBar position="static" elevation={0} className={classes.header}>
            <div className={classes.appTitle}>
              <Typography align="center" variant="h4" component="h1">
                <GitHubIcon /> Github Repo Search
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
        <div ref={resultsRef} className={classes.results} id="infinite-scroll">
          {!loading && repos.length > 0 && repos.map(repo => (
            <DetailExpansionPanel
              key={repo.id}
              data={repo}
            />
            ))}

          {loading && (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          )}

          {!loading && empty && (
            <Card elevation={0} className={classes.card}>
              <CardContent>
                <Typography align="center" variant="h3" component="h3">
                  Errrroww...
                </Typography>
                <Typography align="center" variant="body1" component="p">
                  Sua busca não retornou resultados. Teste pesquisar novamente com palavras difenrentes
                </Typography>
              </CardContent>
            </Card>
          )}

          {!loading && !empty && repos.length === 0 && (
            <Card elevation={0} className={classes.card}>
              <CardContent>
                <Typography className={classes.searchTitle} align="center" variant="h3" component="h3">
                  <SearchIcon /> <span>Pesquise por <br />repositórios</span>
                </Typography>
                <br />
                <Typography align="center" variant="body1" component="p">
                  Digite os termos de busca no campo de texto<br /> acima para fazer uma busca por repositórios no github.
                </Typography>
              </CardContent>
            </Card>
          )}

          {loadingMore && (
            <CircularProgress />
          )}
        </div>
        <div className={classes.footer}>
          <Typography variant="caption" align="right">
            Github Repo Searcher v1.0
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  )
}
