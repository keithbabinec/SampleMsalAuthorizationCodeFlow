import { AuthenticationResult } from '@azure/msal-browser';
import axios, { AxiosInstance } from 'axios';
import AuthService from './AuthService';

class ApiService {

    // constructor that requires a base URI.
    constructor(baseUri: string, authService: AuthService) {
        if (!baseUri) {
            throw new Error('the base uri was not provided');
        }
        if (!authService) {
            throw new Error('the auth service was not provided');
        }

        this.AuthorizationService = authService;

        this.AuthenticatedApi = axios.create({
            baseURL: baseUri,
            // will inject auth header on-demand later as needed.
            headers: { 
                'Content-Type': 'application/json',
            }
        });
    }

    // the authenticated api
    AuthenticatedApi: AxiosInstance;

    // the authorization service
    // wrapper around MSAL
    AuthorizationService: AuthService;

    // an api operation that calls one of the anonymous / no-auth endpoints.
    InvokeNoAuthApiCall() {
        return this.AuthenticatedApi.get('/test/noauth')
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                throw Error('An error has occurred calling the api: ' + error);
            });
    }

    InvokeUserApiCall() {
        return this.AuthorizationService.GetToken()
            .then((response: AuthenticationResult) => {
                return this.AuthenticatedApi.get('/test/standard', {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                })
                .then((response: any) => {
                    return response.data;
                })
                .catch((error: any) => {
                    throw Error('An error has occurred calling the web api: ' + error);
                });
            })
            .catch((error: any) => {
                throw Error('An error has occurred: ' + error);
            });
    }

    // an api operation that calls one of the admin user authorized endpoints.
    InvokeAdminApiCall() {
        return this.AuthorizationService.GetToken()
            .then((response: AuthenticationResult) => {
                return this.AuthenticatedApi.get('/test/admin', {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                })
                .then((response: any) => {
                    return response.data;
                })
                .catch((error: any) => {
                    throw Error('An error has occurred calling the web api: ' + error);
                });
            })
            .catch((error: any) => {
                throw Error('An error has occurred: ' + error);
            });
    }
}

export default ApiService;