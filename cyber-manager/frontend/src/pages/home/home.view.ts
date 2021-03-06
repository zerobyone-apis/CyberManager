import vue from 'vue';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { IUserStore } from '../../types/UserStore.type';
import { USER_ADMIN, USER_EMPLOYEE } from '../../types/UsersSystem.type';
import {
  USER_ROUTE,
  USER_SIGN_IN_ROUTE,
  POST_ENDPOIT
} from '../../types/Routes.type';
import { IUserSignIn, IUserSignUp } from '../../components/Login/Login.actions';

export default class HomeView extends vue {
  constructor() {
    super();
  }

  private disabledButtons: boolean = false;

  private backend: IntegrationBackend = new IntegrationBackend();
  private charges: string[] = [USER_ADMIN, USER_EMPLOYEE];

  private successAccess(user: IUserStore) {
    this.$store.commit('userInfo', user);
    this.$store.commit('page', 'Identification');
    this.$router.push('/Identification');
  }

  private notification = {
    message: '',
    color: 'grey',
    visible: false
  };

  // Used on UI method.
  private showNotificationSuccess(message: string) {
    this.notification.color = 'green';
    this.notification.message = message;
    this.notification.visible = true;
  }

  private showNotificationFail(message: string) {
    this.notification.color = 'red lighten-1';
    this.notification.message = message;
    this.notification.visible = true;
  }

  //Login
  async signIn(signInUser: any) {
    this.disabledButtons = true;
    let userData = {
      username: signInUser.username,
      passwd: signInUser.password
    };
    try {
      const response: any = await this.backend.send(
        POST_ENDPOIT,
        userData,
        USER_SIGN_IN_ROUTE
      );
      //console.log('Response singIn -> ', response);
      let user: IUserStore = {
        id: response.iduser,
        username: response.username,
        charge: response.charge,
        isAdmin: response.isadmin
      };
      this.successAccess(user);
    } catch (error) {
      console.error(error);
      this.showNotificationFail('El usuario o la contraseña no son correctas');
    }
    this.disabledButtons = false;
  }

  //Create User
  async signUp(signUpUser: IUserSignUp) {
    this.disabledButtons = true;
    let userData = {
      username: signUpUser.username,
      passwd: signUpUser.password,
      charge: signUpUser.charge,
      isAdmin: signUpUser.charge === 'Supervisor' ? true : false
    };
    try {
      await this.backend.send(POST_ENDPOIT, userData, USER_ROUTE);
      let responseSignIn: any = await this.backend.send(
        POST_ENDPOIT,
        userData,
        USER_SIGN_IN_ROUTE
      );
      let user: IUserStore = {
        id: responseSignIn.iduser,
        username: responseSignIn.username,
        charge: responseSignIn.charge,
        isAdmin: responseSignIn.isadmin
      };
      this.successAccess(user);
    } catch (error) {
      this.showNotificationFail('Ocurrio un error inesperado!');
      console.error(error);
    }
    this.disabledButtons = false;
  }
}
