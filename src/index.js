import React from 'react';
import { render } from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { Provider } from 'react-redux';
import store from './app/store/configureStore';

// import Root from './app/Root'
import App from './app/App';

import './assets/css/Root.css';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
document.title = 'Github Repo Searcher';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f1f1f1',
    },
    primary: {
      main: '#24292e',
    },
    secondary: {
      main: '#880e4f',
    },
  },
});

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
