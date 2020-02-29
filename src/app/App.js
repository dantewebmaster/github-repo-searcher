import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './components/Header'
import Results from './components/Results'
import Footer from './components/Footer';

import * as reposActions from './store/repos/actions'

class App extends Component {
  componentDidMount() {
    const { actions } = this.props;

    const results = document.getElementById('results')
    results.addEventListener('scroll', this.handleScroll)

    actions.fetchRepos('redux')
  }

  handleScroll = ({ target }) => {
    const { actions } = this.props;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      actions.fetchMoreRepos('redux')
    }
  }

  render() {
    const { state, actions } = this.props;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <Header />
        <Results
          state={state}
          actions={actions}
        />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.repos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...reposActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
