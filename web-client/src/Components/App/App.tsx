import React from 'react';
import IAppProps from './IAppProps';
import IAppState from './IAppState';
import './App.css';
import SignedIn from '../SignedIn/SignedIn';
import NotSignedIn from '../NotSignedIn/NotSignedIn';

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            apiResult: '',
            apiError: ''
        }
    }

    invokeSignInEvent = () => {
        this.props.authServiceInstance.SignIn();
    }

    invokeUnauthenticatedApiCall = () => {
        this.props.apiService.InvokeNoAuthApiCall().then((response: any) => {
            this.setState({'apiResult': response, 'apiError': ''});
        }).catch((error: any) => {
            this.setState({'apiResult': '', 'apiError': error.message});
        });
    }

    invokeUserEndpointApiCall = () => {
        this.props.apiService.InvokeUserApiCall().then((response: any) => {
            this.setState({'apiResult': response, 'apiError': ''});
        }).catch((error: any) => {
            this.setState({'apiResult': '', 'apiError': error.message});
        });
    }

    invokeAdminEndpointApiCall = () => {
        this.props.apiService.InvokeAdminApiCall().then((response: any) => {
            this.setState({'apiResult': response, 'apiError': ''});
        }).catch((error: any) => {
            this.setState({'apiResult': '', 'apiError': error.message});
        });
    }

    render() {
        if (this.props.authServiceInstance.account) {
            return (
                <div className="App">
                    <SignedIn
                        authServiceInstance={this.props.authServiceInstance}
                        apiUnauthenticatedButtonClicked={this.invokeUnauthenticatedApiCall}
                        apiUserEndpointButtonClicked={this.invokeUserEndpointApiCall}
                        apiAdminEndpointButtonClicked={this.invokeAdminEndpointApiCall} />
                    {
                        this.state.apiResult &&
                        <div>API Operation Output: {this.state.apiResult}</div>
                    }
                    {
                        this.state.apiError &&
                        <div>API Operation Error: {this.state.apiError}</div>
                    }
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <NotSignedIn
                        authServiceInstance={this.props.authServiceInstance} 
                        loginButtonClicked={this.invokeSignInEvent} />
                </div>
            );
        }
    }
}

export default App;