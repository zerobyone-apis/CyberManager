import vue from 'vue';
import moment from 'moment';

import Validation from '../../utils/Validation';

import InputPdf from '../../utils/pdfDocuments/InputPDF';
import OutputPdf from '../../utils/pdfDocuments/OutputPDF';

import EnterpriseAction from '../../actions/Enterprise.actions';
import OrderAction from '../../actions/Order.actions';
import RepairAction from '../../actions/Repair.actions';
import ResultObject from '../../utils/ResultObject';
import { IUserStore } from '../../types/UserStore.type';
import { IEnterprise } from '../../types/Enterprise.type';
import { IRepair } from '../../types/Repair.type';
import { IOrder } from '../../types/Order.type';
import { USER_ADMIN } from '../../types/UsersSystem.type';
import { Watch } from 'vue-property-decorator';
import { IConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog.view';

import {
  ORDER_CONFIRM,
  ORDER_DELIVERED,
  ORDER_RECIVED,
  ORDER_REPAIR,
  ORDER_WORKSHOP
} from '../../types/OrderStatus.type';
import { IAnalitycs } from '@/types/Analytics.type';
import Analitycs from '../../actions/Analytics.actions';

export default class IndentificationView extends vue {
  private userInfo: IUserStore = this.$store.getters.userInfo;
  private theme: string = this.$store.getters.theme;

  private showDialogDelete: boolean = false;
  private confirmDialogDelete: IConfirmDialog = {
    title: 'Eliminar orden',
    info: 'Desea borrar la orden seleccionada?',
    buttonActivator: '',
    agreeText: 'Eliminar',
    disagreeText: 'Cancelar'
  };
  private showDialogCancelOrder: boolean = false;
  private confirmDialogCancelOrder: IConfirmDialog = {
    title: 'Cancelar cambios',
    info: 'Desea cancelar los cambios de la orden seleccionada?',
    buttonActivator: 'cancelar',
    agreeText: 'Cancelar Cambios',
    disagreeText: 'Volver'
  };

  private enterpriseActions: EnterpriseAction = new EnterpriseAction();
  public orderActions: OrderAction = new OrderAction();
  public repairActions: RepairAction = new RepairAction();
  public analyticsActions: Analitycs = new Analitycs();

  public newOrder: IOrder = {
    id: 0,
    admissiondate: '',
    admissionDateFront: moment().format('L h:mm:ss'),
    clientname: '',
    clientphone: '',
    article: '',
    model: '',
    brand: '',
    reportedfailure: '',
    observations: '',
    iscanceled: false,
    deliverydate: '',
    status: ''
  };
  private repair: IRepair = {
    id: -1,
    clientname: '',
    article: '',
    warranty: '',
    technical: '',
    deliverydate: '',
    repairdate: '',
    reparation: '',
    price: 0,
    replacementprice: 0,
    status: ''
  };
  private enterprise: IEnterprise = {
    id: -1,
    createddate: '',
    enterprisename: '',
    email: '',
    phone: 0,
    cellphone: 0,
    location: '',
    enterpriserules: '',
    firstmessage: '',
    secondmessage: '',
    urllogo: '',
    lastupdate: '',
    username: ''
  };
  private analitycs: IAnalitycs = {
    startDate: '',
    endDate: '',
    result: ''
  };

  public orders: IOrder[] = [];
  public selectedOrder = -1;

  private wizard: number = 0;
  private v: Validation = new Validation();
  private interactionsMode = {
    order: 0 // 0 = add / 1 = save
  };
  private clientFields: Record<string, any> = {
    objectName: 'newOrder',
    fields: [
      ['clientname', 'string'],
      ['clientphone', 'number']
    ]
  };
  private articleFields: Record<string, any> = {
    objectName: 'newOrder',
    fields: [
      ['article', 'string'],
      ['brand', 'string'],
      ['model', 'string']
    ]
  };

  private disabledButtons: boolean = false;

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

  private headerOrder = [
    { text: 'Nro', value: 'id' },
    { text: 'Cliente', value: 'clientname' },
    { text: 'Ingreso', value: 'admissionDateFront' },
    { text: 'Articulo', value: 'article' },
    { text: 'Status', value: 'status' }
  ];

  private status = [
    ORDER_CONFIRM,
    ORDER_DELIVERED,
    ORDER_RECIVED,
    ORDER_REPAIR,
    ORDER_WORKSHOP
  ];

  private getColorByStatus(
    selectedStatus: string | { text: string; color: string }
  ) {
    let color: string = 'grey';
    this.status.forEach(item => {
      if (typeof selectedStatus === 'object') {
        if (item.text == selectedStatus.text) {
          color = selectedStatus.color;
        }
      } else {
        if (item.text == selectedStatus) {
          color = item.color;
        }
      }
    });
    return color;
  }

  private searchFilters: any = {
    Nombre: 'clientname',
    Articulo: 'article',
    Status: 'status'
  };
  private search: any = {
    filter: 'Nombre',
    value: ''
  };

  // 0 = descendente
  // 1 = ascendente.
  // Sort by ID`s of order
  private modeSortId: number = 0;
  changeSortId() {
    this.modeSortId = this.modeSortId ? 0 : 1;
    switch (this.modeSortId) {
      case 0:
        this.orders.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        break;
      case 1:
        this.orders
          .sort((a: any, b: any) => {
            return a.id - b.id;
          })
          .reverse();
        break;
    }
  }

  /**
   * @description Minitoolbar Functions
   * miniToolbar: buttons array
   * execMiniToolbar(index) Execute the correspond action of the specify index
   * @Watch('selectedorder') Listen this vars for changes in buttons
   * @Watch('wizard')
   */
  public miniToolbar = [
    {
      text: 'Lista de ordenes',
      icon: 'people',
      disabled: false,
      visible: true
    },
    { text: 'Reparacion', icon: 'settings', disabled: true, visible: true },
    { text: 'Ingreso de orden', icon: 'input', disabled: true, visible: true },
    { text: 'Entrega de orden', icon: 'send', disabled: true, visible: true },
    {
      text: 'Empresa',
      icon: 'home',
      disabled: false,
      visible: this.$store.getters.getCharge === USER_ADMIN
    },
    {
      text: 'Arqueo',
      icon: 'trending_up',
      disabled: false,
      visible: this.$store.getters.getCharge === USER_ADMIN
    }
  ];

  async execMiniToolbarAction(index: number) {
    switch (index) {
      case 2:
        new InputPdf().generateDoc(
          this.enterprise,
          this.orders[this.selectedOrder]
        );
        break;
      case 3:
        new OutputPdf().generateDoc(
          this.enterprise,
          this.orders[this.selectedOrder],
          this.repair
        );
        break;
      default:
        this.wizard = index;
        break;
    }
  }

  @Watch('selectedOrder')
  onChangeSelectedOrder() {
    if (this.selectedOrder != -1) {
      this.miniToolbar[1].disabled = false;
      this.miniToolbar[2].disabled = false;
    } else {
      this.miniToolbar[1].disabled = true;
      this.miniToolbar[2].disabled = true;
    }
  }

  @Watch('wizard')
  onChangeWizard() {
    switch (this.wizard) {
      case 0:
        this.miniToolbar[3].disabled = true;
        if (this.selectedOrder != -1) {
          this.miniToolbar[2].disabled = false;
          // reset when go reparation to identification
          this.interactionsMode.order = 0;
          this.selectedOrder = -1;
          Object.assign(this.newOrder, this.cleanFields);
          this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
        } else {
          this.miniToolbar[2].disabled = true;
        }
        break;
      case 1:
        this.miniToolbar[2].disabled = true;
        this.miniToolbar[3].disabled = false;
        break;
    }
  }

  async init() {
    this.disabledButtons = true;
    this.orders = await this.orderActions.getAll();
    this.orders.forEach(order =>
      !order.price ? (order.price = 0) : (order.price = order.price)
    );
    this.changeSortId();
    this.enterprise =
      (await this.enterpriseActions.get(this.userInfo)) || this.enterprise;
    this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
    this.disabledButtons = false;
  }

  async addOrder() {
    if (
      this.v.validateFields(this.newOrder, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      let responseAddOrder: ResultObject = await this.orderActions.add(
        this.newOrder
      );
      if (responseAddOrder.statusCode === 200) {
        responseAddOrder.value.admissionDateFront = this.newOrder.admissionDateFront;

        if (this.modeSortId) {
          this.orders.unshift(responseAddOrder.value);
        } else {
          this.orders.push(responseAddOrder.value);
        }

        Object.assign(this.newOrder, this.cleanFields);
        this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
        this.showNotificationSuccess('Orden creada exitosamente!');
      } else {
        this.showNotificationFail('Ocurrio un error guardando los cambios');
        console.log('Error add order', responseAddOrder);
      }
      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  async saveOrder() {
    if (
      this.v.validateFields(this.newOrder, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      let responseSaveOrder = await this.orderActions.save(this.newOrder);
      if (responseSaveOrder != null) {
        let pSelected: IOrder = this.orders[this.selectedOrder];

        Object.assign(pSelected, responseSaveOrder);
        this.orders[this.selectedOrder] = pSelected;
        //console.log(this.orders[this.selectedOrder]);

        Object.assign(this.newOrder, this.cleanFields);
        this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
        this.selectedOrder = -1;
        this.showNotificationSuccess('Orden guardados exitosamente!');
      }
      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  async saveRepair() {
    if (
      this.v.validateFields(this.repair, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      let responseSaveRepair = await this.repairActions.saveRepair(this.repair);
      if (responseSaveRepair != null) {
        let oSelected: IOrder = this.orders[this.selectedOrder];
        oSelected.status = responseSaveRepair.status;
        this.newOrder.status = responseSaveRepair.status;
        Object.assign(oSelected, responseSaveRepair);
        this.orders[this.selectedOrder] = oSelected;
        this.showNotificationSuccess('Cambios guardados exitosamente!');
      } else {
        this.showNotificationFail('Ocurrio un error guardando los cambios');
      }
      this.disabledButtons = false;
    }
  }

  private async saveEnterprise() {
    this.disabledButtons = true;
    let responseSaveEnterprise: ResultObject = await this.enterpriseActions.save(
      this.enterprise
    );
    if (responseSaveEnterprise.statusCode === 200) {
      this.showNotificationSuccess('Empresa guardada exitosamente!');
    } else {
      this.showNotificationFail('Ocurrio un error guardando los cambios');
    }
    this.disabledButtons = false;
  }

  private async getEnterprise() {
    this.enterprise =
      (await this.enterpriseActions.get(this.userInfo)) || this.enterprise;
  }

  private changeColorToEdit(order: IOrder) {
    if (
      this.interactionsMode.order == 1 &&
      this.selectedOrder == this.orders.indexOf(order)
    ) {
      return 'green';
    } else {
      return 'grey';
    }
  }

  async deleteOrder(selectedOrder: IOrder, action: boolean) {
    if (action) {
      this.disabledButtons = true;
      let responseDelete: boolean | null = await this.orderActions.delete(
        selectedOrder
      );
      if (responseDelete) {
        this.orders.splice(this.selectedOrder, 1);
        Object.assign(this.newOrder, this.cleanFields);
        this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
        this.interactionsMode.order = 0;
        this.selectedOrder = -1;
        this.showNotificationSuccess('Orden eliminada exitosamente!');
      }
    }
    this.disabledButtons = false;
  }

  private showSelectedOrder(order: IOrder) {
    this.selectedOrder = this.orders.indexOf(order);
    Object.assign(this.newOrder, this.cleanFields);
    Object.assign(this.newOrder, {
      id: order.id,
      admissionDate: order.admissiondate,
      admissionDateFront: order.admissionDateFront,
      deliveryDate: order.deliverydate,
      clientname: order.clientname,
      clientphone: order.clientphone,
      article: order.article,
      model: order.model,
      brand: order.brand,
      reportedfailure: order.reportedfailure,
      observations: order.observations,
      iscanceled: order.iscanceled,
      status: order.status
    });
    this.loadRepair(order);
    this.v.clearFails();
    this.interactionsMode.order = 1;
  }

  loadRepair(order: IOrder) {
    this.repair = {
      id: order.id || -1,
      repairdate: order.repairdate || '',
      deliverydate: order.deliverydate || '',
      clientname: this.newOrder.clientname,
      article: this.newOrder.article,
      reparation: order.reparation || '',
      warranty: order.warranty,
      technical: this.userInfo.username,
      status: this.newOrder.status || ORDER_RECIVED.text,
      price: order.price || 0,
      replacementprice: order.replacementprice || 0
    };
  }

  private cancelSaveOrder() {
    let updatedOrder: IOrder = this.orders[this.selectedOrder];
    updatedOrder.status = this.newOrder.status;
    this.orders[this.selectedOrder] = updatedOrder;
    Object.assign(this.newOrder, this.cleanFields);
    this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
    this.selectedOrder = -1;
    this.v.clearFails();
    this.interactionsMode.order = 0; // mode new
  }

  private async beginAnalitycs() {
    if (this.analitycs.startDate && this.analitycs.endDate) {
      if (
        new Date(this.analitycs.startDate) < new Date() &&
        new Date(this.analitycs.endDate) > new Date(this.analitycs.startDate)
      ) {
        this.disabledButtons = true;
        let responseArqueo: any = await this.analyticsActions.doArqueo(
          this.analitycs
        );
        let result: any = responseArqueo;
        this.analitycs.result = `Articulos: ${
          result.cantarticles === null ? 0 : result.cantarticles
        }, 
                                 Precio Total: $${
                                   result.totalprice === null
                                     ? 0
                                     : result.totalprice
                                 }, 
                                 Precio total de reparacion: $${
                                   result.totalreplacementprice === null
                                     ? 0
                                     : result.totalreplacementprice
                                 }, 
                                 Precio Neto: $${
                                   result.netoprice === null
                                     ? 0
                                     : result.netoprice
                                 }`;
        this.disabledButtons = false;
      } else {
        this.showNotificationFail(
          'Lo sentimos la fecha final debe ser mayor que la fecha inicial. Intentelo nuevamente.'
        );
      }
    } else {
      this.showNotificationFail(
        'Lo sentimos los campos no pueden estar vacios para esta operación. Intentelo nuevamente.'
      );
    }
  }

  private resetAnalitycs() {
    this.analitycs.startDate = '';
    this.analitycs.endDate = '';
    this.analitycs.result = '';
  }

  private filterItems() {
    if (this.search.value == '') {
      return this.orders;
    } else {
      // filter
      let filterKey = this.searchFilters[this.search.filter];
      return this.orders.filter(
        (order: any) =>
          (order[filterKey] || '')
            .toLowerCase()
            .indexOf(this.search.value.toLowerCase()) != -1
      );
    }
  }

  private uploadImage(e: any) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      let data: any = e.target;
      this.enterprise.urllogo = data['result'].toString();
    };
  }

  //Clear fields object UI-CLEAN-order
  private cleanFields: IOrder = {
    id: 0,
    admissiondate: moment().format('L h:mm:ss'),
    admissionDateFront: moment().format('L h:mm:ss'),
    clientname: '',
    clientphone: '',
    article: '',
    model: '',
    brand: '',
    reportedfailure: '',
    observations: '',
    iscanceled: false,
    repairdate: '',
    deliverydate: '',
    reparation: '',
    price: 0,
    replacementprice: 0,
    status: ''
  };
}
