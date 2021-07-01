import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '145966379389-5130jfga6gsdu2883ii56clp0o6nm9i2.apps.googleusercontent.com',
                    scope: 'email',
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) this.props.signIn(this.auth.currentUser.get().getId());
        else this.props.signOut(this.auth.currentUser.get().getId());
    };

    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };
    renderAuthButton = (isSignedIn) => {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className='sign-out' onClick={this.onSignOutClick}>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className='sign-in' onClick={this.onSignInClick}>
                    Sign In With Google
                </button>
            );
        }
    };
    render() {
        return <div> {this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
