import Vue from 'vue';

export default class MenuItems extends Vue {
  private menu: any = {
    options: [
      {
        name: 'Identificacion',
        icon: 'people',
        href: '/',
        route: '/Identification',
        toolbar: true
      },
      {
        name: 'Reparacion',
        icon: 'settings',
        href: '/',
        route: '/Repairs',
        toolbar: true
      },
      {
        name: 'Entrada',
        icon: 'input',
        href: '/',
        route: '/Repairs',
        toolbar: true
      },
      {
        name: 'Salida',
        icon: 'send',
        href: '/',
        route: '/Repairs',
        toolbar: true
      }
    ]
  };

  //go to the route
  public pageRouter(route: string) {
    if (route != '') {
      this['$router'].push(route);
    }
  }

  //find the option by search menu
  get filteredConf() {
    return this.menu.options;
  }
}
