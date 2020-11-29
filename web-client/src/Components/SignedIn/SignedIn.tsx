import React from 'react';
import ISignedInProps from './ISignedInProps';
import './SignedIn.css'

class SignedIn extends React.Component<ISignedInProps, {}> {
    render() {
        return (
            <div>
                <p>
                    Logged in as user: {this.props.authServiceInstance.account?.username}
                </p>
                <div className="buttonDiv">
                    <button onClick={this.props.apiUnauthenticatedButtonClicked}>Invoke API: Unauthenticated endpoint</button>
                </div>
                <div className="buttonDiv">
                    <button onClick={this.props.apiUserEndpointButtonClicked}>Invoke API: User endpoint</button>
                </div>
                <div className="buttonDiv">
                    <button onClick={this.props.apiAdminEndpointButtonClicked}>Invoke API: Admin endpoint</button>
                </div>
                <div className="buttonDiv">
                    <button onClick={this.props.logoutButtonClicked}>Sign Out</button>
                </div>
            </div>
        );
    }
}

export default SignedIn;