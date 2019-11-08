import XComponent from "../../components/XComponent";
import User from "../../models/User";
import PageData from '../../data/PageData';
import Validation from "../../utils/Validation";
import vue from 'vue';

export default class HomeCode extends vue {
  private data: any = new PageData();
  private v: Validation = new Validation();
  private fieldsError = {};

  private signInData: any = {
    formName: 'signInData',
    username: {
      value: '',
      required: true,
    },
    password: {
      value: '',
      required: true,
    },
  }
  private signInErrors = '';

  private signUpData: any = {
    formName: 'signUpData',
    username: {
      value: '',
      required: true,
    },
    password: {
      value: '',
      required: true,
    },
    password2: {
      value: '',
      required: true,
    },
  }
  private signUpErrors = '';

  private dialogs: any = {
    signIn: false,
    signUp: false
  }

  async register() {
    if (this.v.validateFields(this.signUpData)) {
      if (this.signUpData.password.value == this.signUpData.password2.value) {
        try {
          let response = {
            value: true,
            statusCode: 200,
          }
          if (response.value) {
            let userData = {
              id: 1, // change this = response.value.id
              username: this.signUpData.username.value,
            }
            this['$store'].commit('userInfo', userData)
            this["$router"].push('/Identification');
          } else {
            this.signUpErrors = 'Error ';
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this.signUpErrors = 'Las contraseñas no coinciden';
      }
    }
  }

  async login() {
    if (this.v.validateFields(this.signInData)) {
      try {
        let response = {
          value: true,
          statusCode: 200,
        }
        if (response.value) {
          let userData = {
            id: 1, // change this = response.value.id
            username: this.signInData.username.value,
          }
          this['$store'].commit('userInfo', userData)
          this["$router"].push('/Identification');
        } else {
          this.signInErrors = 'Usuario o la contraseña no son correctas';
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}