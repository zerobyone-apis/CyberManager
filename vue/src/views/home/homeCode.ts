import XComponent from "../../components/XComponent";
import User from "../../models/User";
import PageData from '../../data/PageData';

export default class HomeCode extends XComponent {
    private data: any = new PageData();

    private signInData: any = {
        email: '',
        password: '',
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
        // check success input data in register dialog
        // const result: any = await this.backend.send('post:signUp', { user: this.signUpData })
        // if (result.statusCode == 200) {
        //   this.dialogs.signUp = false;
        //   const userData = {
        //     id: result.value.id,
        //     token: result.value.token,
        //     username: this.signUpData.username,
        //   }
        //   this.$store.commit('userInfo', userData)
        //   this["$router"].push('/Events');
        // } else {
        //   this.signUpErrors = 'No debe dejar los campos vacios'
        // }
      }
    
      async login() {
        // check success input data in login dialog
        // const result: any = await this.backend.send('post:signIn', { user: this.signInData });
        // const userData = {
        //   id: result.value.id,
        //   token: result.value.token,
        //   username: result.value.username,
        // }
        // this.$store.commit('userInfo', userData);
        // this["$router"].push('/Events');
      }
}