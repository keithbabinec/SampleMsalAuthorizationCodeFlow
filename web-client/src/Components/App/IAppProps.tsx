import ApiService from "../../Services/ApiService";
import AuthService from "../../Services/AuthService";

interface IAppProps {
    authServiceInstance: AuthService;
    apiService: ApiService;
};
  
export default IAppProps;