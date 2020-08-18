import AuthService from "../../Services/AuthService";

interface INotSignedInProps {
    authServiceInstance: AuthService;
    loginButtonClicked: React.MouseEventHandler;
};
  
export default INotSignedInProps;