class AppSettingsService {
    GetWebApiBaseUri(): string {
        return process.env.REACT_APP_WEB_API_BASE_URI as string;
    }
    GetMsalClientId(): string {
        return process.env.REACT_APP_MSAL_CLIENT_ID as string;
    }
    GetMsalClientScope(): string {
        return process.env.REACT_APP_MSAL_CLIENT_SCOPE as string;
    }
    GetMsalTenantAuthorityUri(): string {
        return process.env.REACT_APP_MSAL_TENANT_AUTHORITY_URI as string;
    }
    GetMsalCacheLocation(): string {
        return process.env.REACT_APP_MSAL_CACHE_LOCATION as string;
    }
    GetMsalStoreAuthInCookie(): boolean {
        let stringValue = process.env.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE as string;

        if (stringValue.toLowerCase() === 'true') {
            return true;
        }
        else if (stringValue.toLowerCase() === 'false') {
            return false;
        }
        else {
            throw new Error('MSAL_AUTH_STATE_IN_COOKIE setting is not a valid boolean.');
        }
    }
    GetLoginRedirectUri(): string {
        return process.env.REACT_APP_MSAL_LOGIN_REDIRECT_URI as string;
    }
}

export default AppSettingsService;