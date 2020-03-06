import vue from 'vue';
export default class MiniToolbarView extends vue {

  /////////
  private visualModes = ['wb_sunny', 'nights_stay'];
  private currentMode: number = 1;

  private changeVisualMode() {
    this.currentMode = this.currentMode == 1 ? 0 : 1;
  }
  /////////

  private closeSesion() {
    if (confirm('Seguro de que desea cerrar sesion?')) {
      this.$store.commit('clearUserInfo')
      this.$store.commit('page', 'Home');
      this.$router.push('/');
    }
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