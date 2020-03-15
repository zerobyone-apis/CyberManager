import vue from 'vue';
import { IConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog.view';

export interface ITheme {
  theme: string,
  icon: string
}

export default class MiniToolbarView extends vue {

  private showDialogExit: boolean = false;
  private confirmDialogExit: IConfirmDialog = {
    title: 'Cerrar Sesion',
    info: 'Desea cerrar sesion?',
    buttonActivator: '',
    agreeText: 'Salir',
    disagreeText: 'Volver'
  }

  private themes: ITheme[] = [
    {
      theme: 'dark',
      icon: 'nights_stay'
    },
    {
      theme: 'light',
      icon: 'wb_sunny'
    }
  ]

  private currentMode: number = 0;

  private changeVisualMode() {
    this.currentMode = this.currentMode == 1 ? 0 : 1;
    this.$store.commit('setTheme', this.themes[this.currentMode].theme);
  }
  
  private closeSesion() {
    this.$store.commit('clearUserInfo')
    this.$store.commit('page', 'Home');
    this.$router.push('/');
  }

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
}