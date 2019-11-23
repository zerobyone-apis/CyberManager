import vue from 'vue';
import Validation from "../../utils/Validation";
import IntegrationBackend from '../../utils/IntegrationBackend';

// Models
import User from '@/models/usuario';

export default class HomeCode extends vue {

  // Integration Backend
  private backend: IntegrationBackend = new IntegrationBackend();

  // my litte class of validation
  private v: Validation = new Validation();

  private newUser = {
    username: '',
    password: '',
    password2: '',
    charge: ''
  };

  private charges = ['Empleado', 'Supervisor'];

  // vars used for validation into the user
  // [ field-name, type: string, int ]
  private userFields: any = {
    objectName: 'newUser',
    fields: [
      ['username', 'string'],
      ['password', 'string'],
      ['password2', 'string'],
      ['charge', 'string']
    ]
  };

  // control step visible in the stepper
  private wizard = 1;

  async signUp() {
    if (this.v.validateFields(this.newUser, [this.userFields])) {
      if (this.newUser.password == this.newUser.password2) {
        let userData = {
          username: this.newUser.username,
          passwd: this.newUser.password,
          cargo: this.newUser.charge
        }
        try {
          // Integration Backend POST user send()
          const response: any = await this.backend.send('post', userData, `/user`);
          console.log(response);
          let user = {
            id: response[0].insertId,
            username: userData.username,
            charge: userData.cargo
          }
          // save in the store the user data
          this['$store'].commit('userInfo', user)
          // goto Identification page
          this["$router"].push('/Identification');
        } catch (error) {
          console.error(error)
        }
      } else {
        alert('Las contraseñas no coinciden');
      }
    }
  }

  async signIn() {
    if (this.v.validateFields(this.newUser, [this.userFields])) {
      let userData = {
        username: this.newUser.username,
        passwd: this.newUser.password,
      }
      try {
        // Integration Backend POST user send()
        const response: any = await this.backend.send('post', userData, '/user/signin');
        console.log(response);
        let user = {
          id: response[0].insertId,
          username: userData.username,
          charge: userData.cargo
        }
        // save in the store the user data
        this['$store'].commit('userInfo', userData)
        // goto Identification page
        this["$router"].push('/Identification');
      } catch (error) {
        alert('El usuario o la contraseña no son correctas');
      }
    }
  }

  private goToStep(index: number) {
    this.v.clearFails();
    this.wizard = index;
  }
}