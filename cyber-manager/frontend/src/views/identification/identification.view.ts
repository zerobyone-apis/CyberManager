import vue from 'vue';
import Datetime from '../../utils/DateTime';
import Validation from '../../utils/Validation';
import InputPdf from '../../utils/pdfDocuments/InputPDF';
import OutputPdf from '../../utils/pdfDocuments/OutputPDF';
import IntegrationBackend from '../../utils/IntegrationBackend';

import EnterpriseAction from '../../actions/Enterprise.actions';
import OrderAction from '../../actions/Order.actions';
import RepairAction from '../../actions/Repair.actions';

import { IUserStore } from '../../types/UserStore.type';
import { IEnterprise } from '../../types/Enterprise.type';
import { IRepair } from '../../types/Repair.type';
import { IOrder } from '../../types/Order.type';

import { Watch } from 'vue-property-decorator';
import ResultObject from '../../../../backend/src/models/ResultObject';

import htmlToImage from 'html-to-image';

/*

  TODO
  agregar nuevos attbs en order, reparation y en base de dato: 

  garantia: string
  Estara ubicado en reparacion, bajo status

  costoRepuesto: number
  Estara abajo de precio

  Solo el USER_ADMIN podra ver estos dos campos

  ARQUEO:

  (fechaInicio a fechaFin) => obtiene la diferencia entre 
  ganancia de los pedidos entregados en ese rango de tiempo
  
  SELECT sum(o.price) AS TOTAL_PRICE, 
  sum(o.costoRepuesto) AS TOTAL_COSTO_REPUESTO 
  FROM orders o WHERE fechaEntrega 
  BETWEEN(fechaInicio, fechaFin)

  Solo podra verla el supervisor, es una tool 

*/

import {
  ORDER_CONFIRM,
  ORDER_DELIVERED,
  ORDER_RECIVED,
  ORDER_REPAIR,
  ORDER_WORKSHOP
} from '../../types/OrderStatus.type';
import { IAnalitycs } from '@/types/Analytics.type';

export default class IndentificationView extends vue {
  private userInfo: IUserStore = this.$store.getters.userInfo;

  private enterpriseActions: EnterpriseAction = new EnterpriseAction();
  public orderActions: OrderAction = new OrderAction();
  public repairActions: RepairAction = new RepairAction();

  public newOrder: IOrder = {
    id: 0,
    admissionDate: '',
    admissionDateFront: new Datetime().now(),
    clientName: '',
    clientPhone: '',
    article: '',
    model: '',
    brand: '',
    reportedFailure: '',
    observations: '',
    isCanceled: false,
    deliverDate: '',
    status: ''
  };
  private repair: IRepair = {
    id: -1,
    clientName: '',
    article: '',
    warranty: '',
    technical: '',
    deliverDate: '',
    repairDate: '',
    reparation: '',
    price: 0,
    status: ''
  };
  private enterprise: IEnterprise = {
    id: -1,
    createdDate: '',
    enterpriseName: '',
    email: '',
    phone: 0,
    cellphone: 0,
    location: '',
    enterpriseRules: '',
    firstMessage: '',
    secondMessage: '',
    urlLogo: '',
    lastUpdate: '',
    username: ''
  };
  private analitycs: IAnalitycs = {
    startDate: '',
    endDate: ''
  };

  public orders: IOrder[] = [];
  public selectedOrder = -1;

  private wizard: number = 1;
  private backend: IntegrationBackend = new IntegrationBackend();
  private v: Validation = new Validation();
  private interactionsMode = {
    order: 0 // 0 = add / 1 = save
  };
  private clientFields: Record<string, any> = {
    objectName: 'newOrder',
    fields: [
      ['clientName', 'string'],
      ['clientPhone', 'number']
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
    { text: 'Cliente', value: 'clientName' },
    { text: 'Fecha Ingreso', value: 'admissionDateFront' },
    { text: 'Articulo', value: 'article' },
    { text: 'Status', value: 'status' },
    { text: 'Acciones', value: 'action' }
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
    nombre: 'clientName',
    articulo: 'article',
    status: 'status'
  };
  private search: any = {
    filter: 'nombre',
    value: ''
  };

  /**
   * @description Minitoolbar Functions
   * miniToolbar: buttons array
   * execMiniToolbar(index) Execute the correspond action of the specify index
   * @Watch('selectedPedido') Listen this vars for changes in buttons
   * @Watch('wizard')
   */
  public miniToolbar = [
    { text: 'Identificacion', icon: 'people', disabled: false, visible: true },
    { text: 'Reparacion', icon: 'settings', disabled: true, visible: true },
    { text: 'Entrada', icon: 'input', disabled: true, visible: true },
    { text: 'Salida', icon: 'send', disabled: true, visible: true },
    {
      text: 'Empresa',
      icon: 'home',
      disabled: false,
      visible: this.$store.getters.getCharge == 'Supervisor'
    },
    {
      text: 'Arqueo',
      icon: 'trending_up',
      disabled: false,
      visible: this.$store.getters.getCharge == 'Supervisor'
    }
  ];

  async execMiniToolbarAction(index: number) {
    this.wizard = index + 1;
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
      case 1:
        this.miniToolbar[2].disabled = false;
        this.miniToolbar[3].disabled = true;
        break;
      case 2:
        this.miniToolbar[2].disabled = true;
        this.miniToolbar[3].disabled = false;
        break;
    }
  }

  async init() {
    this.disabledButtons = true;
    this.orders = await this.orderActions.getAll();
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
        this.orders.push(responseAddOrder.value);
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
        console.log(this.orders[this.selectedOrder]);
        this.orders[this.selectedOrder] = pSelected;
        console.log(this.orders[this.selectedOrder]);

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

  async deleteOrder(selectedOrder: IOrder) {
    this.disabledButtons = true;
    await this.orderActions.delete(selectedOrder);
    this.orders.splice(this.selectedOrder, 1);
    Object.assign(this.newOrder, this.cleanFields);
    this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
    this.interactionsMode.order = 0;
    this.selectedOrder = -1;
    this.disabledButtons = false;
  }

  private showSelectedOrder(order: IOrder) {
    this.selectedOrder = this.orders.indexOf(order);
    Object.assign(this.newOrder, this.cleanFields);
    Object.assign(this.newOrder, {
      id: order.id,
      admissionDate: order.admissionDate,
      admissionDateFront: order.admissionDateFront,
      deliverDate: order.deliverDate,
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      article: order.article,
      model: order.model,
      brand: order.brand,
      reportedFailure: order.reportedFailure,
      observations: order.observations,
      isCanceled: order.isCanceled,
      status: order.status
    });
    this.loadRepair(order);
    this.v.clearFails();
    this.interactionsMode.order = 1;
  }

  loadRepair(order: IOrder) {
    this.repair = {
      id: order.id || -1,
      repairDate: order.repairDate || '',
      deliverDate: order.deliverDate || '',
      clientName: this.newOrder.clientName,
      article: this.newOrder.article,
      reparation: order.reparation || '',
      warranty: order.warranty,
      technical: this.userInfo.username,
      status: this.newOrder.status || ORDER_RECIVED.text,
      price: order.price || 0
    };
  }

  private cancelSaveOrder() {
    if (confirm('Seguro que desea descartar los cambios?')) {
      let updatedOrder: IOrder = this.orders[this.selectedOrder];
      updatedOrder.status = this.newOrder.status;
      this.orders[this.selectedOrder] = updatedOrder;
      Object.assign(this.newOrder, this.cleanFields);
      this.newOrder.id = this.orderActions.getMaxIdOfOrders(this.orders);
      this.selectedOrder = -1;
      this.v.clearFails();
      this.interactionsMode.order = 0; // mode new
    }
  }

  private beginAnalitycs() {}

  private resetAnalitycs() {}

  // private generateInputPdf() {
  //   // let inputPdf: InputPdf = new InputPdf();
  //   try {
  //     let node: any = document.getElementsByClassName('invoice-box')[0];
  //     htmlToImage.toPng(node)
  //       .then(function (dataUrl) {
  //         var img = new Image();
  //         img.src = dataUrl;
  //         (document.getElementById('invoice-capture') || document.body).appendChild(img);
  //         // inputPdf.generateDoc(img);
  //       })
  //       .catch(function (error) {
  //         console.error('error generando captura del input pdf', error);
  //       });
  //   } catch (error) {
  //     console.error('Error generatedDoc Identification -> ', error);
  //   }
  // }

  // private generateOutputPdf() {
  //   let outputPdf: OutputPdf = new OutputPdf();
  //   try {
  //     let order = this.newOrder;
  //     order.reparation = this.repair.reparation;
  //     // outputPdf.generateDoc(this.enterprise, order);
  //   } catch (error) {
  //     console.error('Error generatedDoc -> ', error);
  //   }
  // }

  private filterItems() {
    if (this.search.value == '') {
      return this.orders;
    } else {
      // filter
      let filterKey = this.searchFilters[this.search.filter];
      return this.orders.filter(
        (pedido: any) =>
          (pedido[filterKey] || '')
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
      this.enterprise.urlLogo = data['result'].toString();
    };
  }

  //Clear fields object UI-CLEAN-Pedido
  private cleanFields: IOrder = {
    id: 0,
    admissionDate: new Datetime().now(),
    admissionDateFront: new Datetime().now(),
    clientName: '',
    clientPhone: '',
    article: '',
    model: '',
    brand: '',
    reportedFailure: '',
    observations: '',
    isCanceled: false,
    repairDate: '',
    deliverDate: '',
    reparation: '',
    price: 0,
    status: ''
  };
}
