import React from 'react';
import IAppProps from './IAppProps';
import './App.css';
import SignedIn from '../SignedIn/SignedIn';
import NotSignedIn from '../NotSignedIn/NotSignedIn';

class App extends React.Component<IAppProps, {}> {
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
                    <NotSignedIn authServiceInstance={this.props.authServiceInstance} />
                </div>
            );
        }
    }
}

export default App;