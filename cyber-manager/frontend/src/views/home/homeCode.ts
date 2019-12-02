import vue from 'vue';
import Validation from '../../utils/Validation';
import IntegrationBackend from '../../utils/IntegrationBackend';

// Models
import User from '../../../../backend/src/models/usuario';
import { UserInterface } from '../../../../backend/src/interface/UserInterface';

export default class HomeCode extends vue {
  // Utils + Backend
  private backend: IntegrationBackend = new IntegrationBackend();
  // Validation Fields
  private v: Validation = new Validation();

  //usuario de prueba con Interfaces
  /* private newUser: UserInterface = {
      username: '',
      passwd: '',
      cargo: '',
      isAdmin: false
    }; */

  //Instancia de la clase Model User, Constructor.
  private user: User = new User({
    username: '',
    passwd: '',
    cargo: '',
    isAdmin: '' //if supervisor true
  });

  //Si el cargo no esta vacio y no es Empleado entonces es Admin.
  private isAdmin() {
    this.user.isAdmin =
      this.user.cargo != 'Empleado' && this.user.cargo != '' ? true : false;
  }

  //Register usuario
  public createUser = {
    username: '',
    passwd: '',
    passwd2: '',
    cargo: '',
    isAdmin: false //if supervisor true
  };

  private charges = ['Empleado', 'Supervisor'];

  // vars used for validation into the user
  // [ field-name, type: string, int ]
  private userFields: any = {
    objectName: 'user',
    fields: [
      ['username', 'string'],
      ['passwd', 'string'],
      ['cargo', 'string']
    ]
  };

  // control step visible in the stepper
  private wizard = 1;

  async signUp() {
    this.isAdmin();
    console.log(this.createUser);
    if (this.v.validateFields(this.createUser, [this.userFields])) {
      try {
        const userFiltered: {
          succes: boolean;
          object?: UserInterface;
          message?: string;
        } = this.getUserValidated(this.createUser);

        userFiltered.succes == true
          ? userFiltered
          : (err: Error) => {
              console.error(err.message);
              throw new Error(err.message);
            };

        console.log(`user filtered -> ${userFiltered}`);

        // Integration Backend POST user send()
        const response: Record<string, any> = await this.backend.send(
          'post',
          userFiltered.object,
          `/user`
        );
        let user = {
          id: response[0].insertId,
          username: this.user.username,
          charge: this.user.cargo,
          isAdmin: this.user.isAdmin
        };
        // save in the store the user data
        this['$store'].commit('userInfo', user);
        // goto Identification page
        this['$router'].push('/Identification');
      } catch (error) {
        console.error(
          'Algo malo sucedio :( este fue el error -> ',
          error.message
        );
        alert('Las contraseñas no coinciden');
      }
    }
  }

  async signIn() {
    this.isAdmin();
    if (this.v.validateFields(this.user, [this.userFields])) {
      try {
        let userData: UserInterface = {
          username: this.user.username,
          passwd: this.user.passwd,
          cargo: this.user.cargo,
          isAdmin: this.user.isAdmin
        };
        // Integration Backend POST user send()
        const response: any = await this.backend.send(
          'post',
          userData,
          '/user/signin'
        );

        console.log('Respuesta de Usuario', response);

        //User Store info.
        let user = {
          idUser: response[0].idUser,
          username: userData.username,
          charge: userData.cargo,
          isAdmin: userData.isAdmin
        };
        // save in the store the user data
        this['$store'].commit('userInfo', user);
        // goto Identification page
        this['$router'].push('/Identification');
      } catch (error) {
        console.error('error causado por -> ', error);
        alert('El usuario o la contraseña no son correctas');
      }
    }
  }

  private goToStep(index: number) {
    this.v.clearFails();
    this.wizard = index;
  }

  /* Function to validate password */
  private getUserValidated = (
    object: Record<string, any>
  ): {
    succes: boolean;
    object?: UserInterface;
    message?: string;
  } => {
    /*  let passs = object.passs; */
    if (object.passwd === object.passwd2) {
      let userFiltered: UserInterface = {
        username: object.username,
        passwd: object.passwd,
        cargo: object.cargo,
        isAdmin: object.isAdmin
      };
      return {
        object: userFiltered,
        succes: true
      };
    } else {
      console.log(`Error en contraseña, intente nuevamente.`);
      return {
        succes: false,
        message: `Error en contraseña, intente nuevamente.`
      };
    }
  };
}
