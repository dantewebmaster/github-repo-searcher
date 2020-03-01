import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// App components
import Container from './components/Container';
import Header from './components/Header';
import Results from './components/Results';
import Footer from './components/Footer';

// Actions
import * as reposActions from './store/repos/actions';

class App extends Component {
  componentDidMount() {
    const results = document.getElementById('results');
    results.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = ({ target }) => {
    const { actions } = this.props;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      actions.fetchMoreRepos();
    }
  }

  render() {
    const { state, actions } = this.props;

    return (
      <Container>
        <Header />
        <Results
          state={state}
          actions={actions}
        />
        <Footer />
      </Container>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    topic: PropTypes.string,
    repos: PropTypes.array,
    page: PropTypes.number,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({
    fetchRepos: PropTypes.func,
    fetchMoreRepos: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  state: state.repos,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...reposActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
