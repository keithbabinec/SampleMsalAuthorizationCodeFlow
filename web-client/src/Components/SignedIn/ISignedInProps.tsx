import AuthService from "../../Services/AuthService";

interface ISignedInProps {
    authServiceInstance: AuthService;
    apiUnauthenticatedButtonClicked: React.MouseEventHandler;
    apiUserEndpointButtonClicked: React.MouseEventHandler;
    apiAdminEndpointButtonClicked: React.MouseEventHandler;
    logoutButtonClicked: React.MouseEventHandler;
};
  
export default ISignedInProps;