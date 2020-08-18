import React from 'react';
import INotSignedInProps from './INotSignedInProps';

class NotSignedIn extends React.Component<INotSignedInProps, {}> {
    render() {
        return (
            <div>
                <p>
                    User is not logged in.
                </p>
                <button onClick={this.props.loginButtonClicked} >Sign In</button>
            </div>
        );
    }
}

export default NotSignedIn;