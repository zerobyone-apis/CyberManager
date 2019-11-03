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
    username: {
      value: '',
      error: '',
      required: true,
    },
    password: {
      value: '',
      error: '',
      required: true,
    },
  }
  private signInErrors = '';

  private signUpData: any = {
    username: '',
    email: '',
    password: ''
  }
  private signUpErrors = '';

  private dialogs: any = {
    signIn: false,
    signUp: false
  }

  async register() {
  }

  async login() {
    if(this.v.validateFields(this.signInData)) {
      // make the fetch
      let userData = {
        id: 1, // change this = response.value.id
        username: this.signInData.username.value,
      }
      this['$store'].commit('userInfo', userData)
      this["$router"].push('/Repairs');
    }
  }
}