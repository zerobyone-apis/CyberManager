import { IUserStore } from '../types/UserStore.type';
import { USER_ROUTE, USER_SIGN_IN_ROUTE, POST_ENDPOIT } from '../types/Routes.type'; 
import IntegrationBackend from '../utils/IntegrationBackend';
import ResultObject from '../../../backend/src/utils/ResultObject';


export default class UserActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async signUp(userData: IUserStore) {
    try {
      const response: Record<string, any> = await this.backend.send(
        POST_ENDPOIT,
        userData,
        USER_ROUTE
      );
      let responseSignIn: any = await this.backend.send(
        POST_ENDPOIT,
        userData,
        USER_SIGN_IN_ROUTE
      );
      let user: IUserStore = {
        id: responseSignIn.idUser,
        username: userData.username,
        charge: userData.charge,
        isAdmin: userData.isAdmin
      };
      return new ResultObject(200, user);
    } catch (error) {
      return new ResultObject(400, error);
    }
  }
}