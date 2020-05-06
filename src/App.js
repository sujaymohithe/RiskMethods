import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainRouter from './MainRouter';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const App = props => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);


  return (
    <div>
      <Header {...props} />
      <MainRouter {...props} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
