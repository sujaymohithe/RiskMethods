import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { INVALID_CREDENTIALS } from '../../AppConstants';

const Auth = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(userName, password);
    };

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = INVALID_CREDENTIALS;
    }

    return <div className="Auth">
        {authRedirect}
        <div className="col-sm-3 ml-auto mr-auto pt-5">
            <form onSubmit={submitHandler}>
                <FormGroup controlId="message">
                    <FormLabel className="danger"><b>{errorMessage}</b></FormLabel>
                </FormGroup>
                <FormGroup controlId="username">
                    <FormLabel><b>Email address</b></FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={userName}
                        name="username"
                        placeholder="Enter your email address"
                        onChange={event => {
                            setUserName(event.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel><b>Password</b></FormLabel>
                    <FormControl
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                </FormGroup>
                <Button
                    block
                    className="col-sm-6 offset-sm-4 mt-4"
                    type="submit" disabled={props.loading}>
                    {props.loading ? 'Please Wait...' : 'Login'}
                </Button>
            </form>
        </div>
    </div>
}

//method that copies part of the state to the props of this component.
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

//these functions will be accessible via props in child components
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) =>
            dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);