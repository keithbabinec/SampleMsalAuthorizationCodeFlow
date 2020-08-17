import AppSettingsService from './AppSettingsService';
import * as msal from "@azure/msal-browser"

class AuthService {

    constructor() {
        this.appSettings = new AppSettingsService();
        
        let msalConfig = this.GetMsalClientConfiguration();
        this.msalApplication = new msal.PublicClientApplication(msalConfig);
    }

    // msal application object
    msalApplication: msal.PublicClientApplication;

    // settings service
    appSettings: AppSettingsService;

    userName: string = "";

    HandlePageLoadEvent(): Promise<void> {
        // let exceptions bubble up to the caller to handle
        return this.msalApplication.handleRedirectPromise().then((authResult: msal.AuthenticationResult | null) => {
            this.HandleRedirectResponse(authResult);
        });
    }

    HandleRedirectResponse(authResult: msal.AuthenticationResult | null): void {
        // if this page load is redirect from the Microsoft Identity platform then the
        // authResult will be populated. Otherwise null on other page loads.

        if (authResult !== null) {
            // update the username.
            this.userName = authResult.account.username;
        }
        else {
            // see if we have cached accounts.
            const currentAccounts = this.msalApplication.getAllAccounts();

            if (currentAccounts === null) {
                // no cached accounts. 
                // user will need to click the sign-in button and redirect to login.
                return;
            }
            else if (currentAccounts.length > 1) {
                // there are some situations where the user may have multiple (different) cached logins.
                // this code sample does not cover that scenario but just logs a warning here.
                // this conditional block would need to be updated to support multiple accounts.
                console.warn("Multiple accounts detected in MSAL account cache.");
            }
            else if (currentAccounts.length === 1) {
                // we have exactly 1 cached account.
                // set the username. user may not need to sign in.
                this.userName = currentAccounts[0].username;
            }
        }
    }

    GetMsalClientConfiguration(): msal.Configuration {
        return {
            auth: {
                clientId: this.appSettings.GetMsalClientId(),
                authority: this.appSettings.GetMsalTenantAuthorityUri(),
                redirectUri: this.appSettings.GetLoginRedirectUri()
            },
            cache: {
                cacheLocation: this.appSettings.GetMsalCacheLocation(),
                storeAuthStateInCookie: this.appSettings.GetMsalStoreAuthInCookie()
            }
        }
    }

    SignIn() {
        let loginRedirectRequestPayload: msal.RedirectRequest = {
            scopes: [ "openid", "profile", "User.Read" ],
            prompt: "select_account"
        }

        // this will redirect the web application to the Microsoft Identity platform sign in pages.
        // no code will execute after this point.
        this.msalApplication.loginRedirect(loginRedirectRequestPayload);
    }

    SignOut() {
        let accountInfo: msal.AccountInfo | null = this.msalApplication.getAccountByUsername(this.userName);

        if (accountInfo !== null) {
            let logoutRequestPayload: msal.EndSessionRequest = {
                account: accountInfo
            }
    
            this.msalApplication.logout(logoutRequestPayload)
        }
    }
}

export default AuthService;