import React from 'react';
import IAppProps from './IAppProps';
import './App.css';
import SignedIn from '../SignedIn/SignedIn';
import NotSignedIn from '../NotSignedIn/NotSignedIn';

class App extends React.Component<IAppProps, {}> {

    handleSignInEvent = () => {
        this.props.authServiceInstance.SignIn();
    }

    render() {
        if (this.props.authServiceInstance.userName) {
            return (
                <div className="App">
                    <SignedIn authServiceInstance={this.props.authServiceInstance} />
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <NotSignedIn authServiceInstance={this.props.authServiceInstance} loginButtonClicked={this.handleSignInEvent} />
                </div>
            );
        }
    }
}

export default App;