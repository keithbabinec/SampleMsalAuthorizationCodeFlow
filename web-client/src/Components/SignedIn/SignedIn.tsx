import React from 'react';
import ISignedInProps from './ISignedInProps';

class SignedIn extends React.Component<ISignedInProps, {}> {
    render() {
        return (
            <div>
                <p>
                    Logged in as user: {this.props.authServiceInstance.userName}
                </p>
            </div>
        );
    }
}

export default SignedIn;