import vue from 'vue';
import Validation from '../../utils/Validation';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { IUserStore } from '../../types/UserStore.type';
import { USER_ADMIN, USER_EMPLOYEE } from '../../types/UsersSystem.type';
import Datetime from '../../utils/DateTime';
import { USER_ROUTE, USER_SIGN_IN_ROUTE, POST_ENDPOIT } from '../../types/Routes.type';

export default class HomeView extends vue {
  private backend: IntegrationBackend = new IntegrationBackend();
  private v: Validation = new Validation();

  private user: IUserStore = {
    username: '',
    passwd: '',
    charge: '',
    isAdmin: false
  };

  public createUser: IUserStore = {
    username: '',
    passwd: '',
    passwd2: '',
    charge: '',
    isAdmin: false
  };

  private notification = {
    message: '',
    color: 'grey',
    visible: false
  };
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

  private charges: string[] = [USER_ADMIN, USER_EMPLOYEE];

  private userFields: any = {
    objectName: 'user',
    fields: [
      ['username', 'string'],
      ['passwd', 'string'],
      ['charge', 'string']
    ]
  };
  private userFieldsSignUp: any = {
    objectName: 'createUser',
    fields: [
      ['username', 'string'],
      ['passwd', 'string'],
      ['charge', 'string']
    ]
  };

  private wizard: number = 1;

  private isAdmin() {
    this.user.isAdmin =
      this.user.charge != USER_EMPLOYEE && this.user.charge != ''
        ? true
        : false;

    this.user.isAdmin != false
      ? (this.createUser.isAdmin = true)
      : (this.createUser.isAdmin = false);
  }

  async signUp() {
    this.isAdmin();
    if (this.v.validateFields(this.createUser, [this.userFieldsSignUp])) {
      if (this.createUser.passwd == this.createUser.passwd2) {
        try {
          const userFiltered: {
            succes: boolean;
            object?: IUserStore;
            message?: string;
          } = this.getUserValidated(this.createUser);

          userFiltered.succes == true
            ? userFiltered
            : (err: Error) => {
                console.error(err.message);
                throw new Error(err.message);
              };
          console.log('filtered object user .> ', userFiltered.object);
          const response: Record<string, any> = await this.backend.send(
            POST_ENDPOIT,
            userFiltered.object,
            USER_ROUTE
          );
          let responseSignIn: any = await this.backend.send(
            POST_ENDPOIT,
            userFiltered.object,
            USER_SIGN_IN_ROUTE
          );
          let user: IUserStore = {
            id: responseSignIn.idUser,
            username: this.createUser.username,
            charge: this.createUser.charge,
            isAdmin: this.user.isAdmin
          };

          this['$store'].commit('userInfo', user);
          this.$store.commit('page', 'Identification');
          this['$router'].push('/Identification');
        } catch (error) {
          console.error(
            'Algo malo sucedio :( este fue el error -> ',
            error.message
          );
          this.showNotificationFail('Ocurrio un error!, vuelva a intentarlo');
        }
      } else {
        this.showNotificationFail('Las contraseñas no coinciden');
      }
    }
  }

  async signIn() {
    this.isAdmin();
    if (this.v.validateFields(this.user, [this.userFields])) {
      try {
        let userData: IUserStore = {
          username: this.user.username,
          passwd: this.user.passwd,
          charge: this.user.charge,
          isAdmin: this.user.isAdmin
        };
        let response: IUserStore = await this.backend.send(
          POST_ENDPOIT,
          userData,
          USER_SIGN_IN_ROUTE
        );
        console.log(response);
        let user: IUserStore = {
          id: response.id,
          username: userData.username,
          charge: userData.charge,
          isAdmin: userData.isAdmin
        };

        this['$store'].commit('userInfo', user);
        this.$store.commit('page', 'Identification');
        this['$router'].push('/Identification');
      } catch (error) {
        console.log('error causado por -> ', error);
        this.showNotificationFail(
          'Error iniciando sesion, verifique usuario y contraseña'
        );
      }
    }
  }

  private goToStep(index: number) {
    this.v.clearFails();
    this.wizard = index;
  }

  private getUserValidated = (
    object: Record<string, any>
  ): {
    succes: boolean;
    object?: IUserStore;
    message?: string;
  } => {
    if (object.passwd === object.passwd2) {
      let userFiltered: IUserStore = {
        username: object.username,
        passwd: object.passwd,
        charge: object.charge,
        isAdmin: object.isAdmin,
        createOn: new Datetime().convertDatetime(new Datetime().now() || '')
      };
      return {
        object: userFiltered,
        succes: true
      };
    } else {
      this.showNotificationFail('Error en contraseña, intente nuevamente');
      return {
        succes: false,
        message: `Error en contraseña, intente nuevamente.`
      };
    }
  };
}
