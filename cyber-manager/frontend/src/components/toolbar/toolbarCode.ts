import { Component, Prop, Vue } from 'vue-property-decorator';
import MenuItems from '../../utils/menuItems';

@Component({})
export default class ToolbarCode extends MenuItems {
  private reservationDialog: boolean = false;

  private closeSesion() {
    if(confirm('Seguro de que desea cerrar sesion?')) {
      this.$store.commit('clearUserInfo')
      this.$store.commit('page', 'Home');
      this.pageRouter('/');
    }
  }
}