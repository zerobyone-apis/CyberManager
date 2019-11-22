import vue from 'vue';
import Validation from "../../utils/Validation";

// Models
import User from '@/models/usuario';


export default class HomeCode extends vue {

  // my litte class of validation
  private v: Validation = new Validation();

  private newUser = {
    username: '',
    password: '',
    password2: '',
  };

  // vars used for validation into the user
  // [ field-name, type: string, int ]
  private userFields: any = {
    objectName: 'newUser',
    fields: [
      ['username', 'string'],
      ['password', 'string']
    ]
  };

  // control step visible in the stepper
  private wizard = 1;

  async signUp() {
    if (this.v.validateFields(this.newUser, [this.userFields])) {
      if (this.newUser.password == this.newUser.password2) {
        // Integration Backend POST user send()
        const response: any = { statusCode: 200, value: { id: 1 } }
        if (response.statusCode == 200) {
          let userData = {
            id: response.value.id, // change this = response.value.id
            username: this.newUser.username,
          }
          // save in the store the user data
          this['$store'].commit('userInfo', userData)
          // goto Identification page
          this["$router"].push('/Identification');
        }
      } else {
        alert('Las contraseñas no coinciden');
      }
    }
  }

  async signIn() {
    if (this.v.validateFields(this.newUser, [this.userFields])) {
      // Integration Backend POST orders send()
      const response: any = { statusCode: 200, value: { id: 1 } }
      switch (response.statusCode) {
        case 200:
          let userData = {
            id: response.value.id, // change this = response.value.id
            username: this.newUser.username,
          }
          // save in the store the user data
          this['$store'].commit('userInfo', userData)
          // goto Identification page
          this["$router"].push('/Identification');
          break;
        case 401:
            alert('El usuario o la contraseña no son correctas');
          break;
      }
    }
  }

  private goToSignUp() {
    this.v.clearFails();
    this.wizard = 2;
  }
}