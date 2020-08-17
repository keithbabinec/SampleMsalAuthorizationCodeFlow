import React from 'react';
import INotSignedInProps from './INotSignedInProps';

class NotSignedIn extends React.Component<INotSignedInProps, {}> {
    render() {
        return (
            <div>
                <p>
                    User is not logged in.
                </p>
            </div>
        );
    }
}

export default NotSignedIn;