import vue from 'vue';
export type VForm = vue & { validate: () => boolean };

export interface IUserSignIn {
  username: string;
  password: string;
}

export interface IUserSignUp {
  username: string;
  charge: string;
  password: string;
  repeatPassword: string;
  isadmin?: boolean;
}

export default class LoginActions extends vue {
  private ON_SIGNIN: string = 'onSignIn';
  private ON_SIGNUP: string = 'onSignUp';

  private disabledButtons: boolean = false;

  private wizard: number = 0;

  private fieldRules: any = [
    (v: string) =>
      (!!v && this.disabledButtons == false) || 'Este campo es requerido!'
  ];
  private passwordRules: any = [
    (fieldValue: string) =>
      fieldValue === this.userSignUp.password ||
      'Las contraseñas deben coincidir!!'
  ];
  private emailRules: any = [
    (fieldValue: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue) ||
      'El email no es valido!',
    (fieldValue: string) =>
      (!!fieldValue && this.disabledButtons == true) ||
      'Este campo es requerido!'
  ];

  private userSignIn: IUserSignIn = {
    username: '',
    password: ''
  };

  private userSignUp: IUserSignUp = {
    username: '',
    charge: '',
    password: '',
    repeatPassword: ''
  };

  private signIn() {
    this.disabledButtons = true;
    let formSignIn: any = this.$refs[this.ON_SIGNIN];
    if (formSignIn.validate()) {
      this.$emit(this.ON_SIGNIN, this.userSignIn);
    }
    this.disabledButtons = false;
  }

  private signUp() {
    this.disabledButtons = true;
    let formSignUp: any = this.$refs[this.ON_SIGNUP];
    if (formSignUp.validate()) {
      if (this.userSignUp.password == this.userSignUp.repeatPassword) {
        this.$emit(this.ON_SIGNUP, this.userSignUp);
      }
    }
    this.disabledButtons = false;
  }
}
