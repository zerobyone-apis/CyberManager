import XComponent from "../../components/XComponent";
import User from "../../models/User";
import PageData from '../../data/PageData';
import Validation from "../../utils/Validation";
import vue from 'vue';

export default class HomeCode extends vue {

  private serviceNumber: number = 1;
  private client = {
    name: ''
  }
  private article = {
    name: ''
  }
  private others = {
    repair: false,
    pay: false,
    deliver: false,
    other: false,
  }

  // private data: any = new PageData();
  // private v: Validation = new Validation();
  // private fieldsError = {};

  // private signInData: any = {
  //   username: {
  //     value: '',
  //     error: '',
  //     required: true,
  //   },
  //   password: {
  //     value: '',
  //     error: '',
  //     required: true,
  //   },
  // }
  // private signInErrors = '';

  // private signUpData: any = {
  //   username: '',
  //   email: '',
  //   password: ''
  // }
  // private signUpErrors = '';

  // private dialogs: any = {
  //   signIn: false,
  //   signUp: false
  // }

}