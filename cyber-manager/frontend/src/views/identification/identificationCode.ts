import vue from 'vue';
import Validation from "../../utils/Validation";
import InputPdf from '../../utils/pdfDocuments/InputPDF';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { PedidoInterface } from '../../interface/PedidoInterface';
import Datetime from '../../utils/TimeFunctions';

// Models
import Order from "@/models/Order";
import OrderList from "@/models/OrderList";
import Empresa from '@/models/empresa';
import { Watch } from 'vue-property-decorator';

export default class IndentificationCode extends vue {

  private wizard = 1;

  // Integration Backend
  private backend: IntegrationBackend = new IntegrationBackend();

  // my litte class of validation
  private v: Validation = new Validation();

  // interactionsMode is used for change the state of the buttons
  private interactionsMode = {
    order: 0 // 0 = add / 1 = save
  }

  // Control activity of the buttons of the main actions
  private disabledButtons: boolean = false;

  private newOrder: Order = new Order();
  private orders: OrderList = new OrderList();
  private selectedOrder: number = -1; // index in orders

  private enterprise: Empresa = new Empresa();

  // vars used for validation into the newOrder
  // [ field-name, type: string, int ]
  private clientFields: any = {
    objectName: 'newOrder',
    fields: [
      ['clientName', 'string'],
      ['clientPhone', 'string']
    ]
  };
  private articleFields: any = {
    objectName: 'newOrder',
    fields: [
      ['article', 'string'],
      ['brand', 'string'],
      ['model', 'string'],
    ]
  }

  private others: any = {
    repair: false,
    pay: false,
    deliver: false,
    other: false,
  }

  private headerOrders = [
    { text: 'Nro', value: 'id' },
    { text: 'Cliente', value: '_clientName' },
    { text: "Acciones", value: 'action' }
  ]


  //cosss a quitar porque son de reparacion
  private serviceNumber: number = 1;
  private client = {
    name: ''
  }
  private article = {
    name: ''
  }
  //

  // Methods
  async init() {
    let response: PedidoInterface[] = await this.backend.send('get', undefined, '/pedido');
    response.forEach((item: PedidoInterface) => {
      let order: Order = new Order();
      order.id = item.idOrden;
      order.clientName = item.nombreCliente;
      order.clientPhone = item.telCliente;
      order.article = item.articulo || '';
      order.brand = item.marca || '';
      order.model = item.modelo || '';
      order.failReported = item.fallReportada;
      order.observations = item.observaciones;
      order.startDate = item.fechaIngreso;

      order.isCancelled = Boolean(item.isCanceled);
      order.repairDate = item.fechaReparacion;
      order.deliveryDate = item.fechaEntrega;
      order.reparation = item.reparacion;
      order.price = item.precio;

      this.orders.add(order);
    });
  }

  private async addNewOrder() {
    if (this.v.validateFields(this.newOrder, [this.clientFields, this.articleFields])) {
      this.disabledButtons = true; // DISABLED BUTTONS
      let order: Order = new Order();
      order.clientName = this.newOrder.clientName;
      order.clientPhone = this.newOrder.clientPhone;
      order.article = this.newOrder.article;
      order.model = this.newOrder.model;
      order.brand = this.newOrder.brand;
      order.failReported = this.newOrder.failReported;
      order.observations = this.newOrder.observations;

      let orderData: PedidoInterface = {
        idOrden: 0,
        nombreCliente: order.clientName,
        telCliente: order.clientPhone,
        articulo: order.article,
        marca: order.brand,
        modelo: order.model,
        fallReportada: order.failReported,
        observaciones: order.observations,
        fechaIngreso: new Datetime().now(),
        isCanceled: false,
        //change the below code
        fechaEntrega: new Datetime().now(),
        fechaReparacion: new Datetime().now(),
        precio: 100,
        reparacion: ''
      }

      // Integration Backend POST orders send()
      try {
        const response: any = await this.backend.send('post', orderData, '/pedido');
        console.log(response)

        order.id = response[0].insertId;
        this.orders.add(order);
        //clear fields
        Object.assign(this.newOrder, new Order());
      } catch (error) {
        console.error(error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private editNewOrder(item: any) {
    Object.assign(this.newOrder, item);
    this.selectedOrder = this.orders.getArray().indexOf(item);
    this.v.clearFails();
    this.interactionsMode.order = 1; // save mode
    // save in the store the selected order - this active the buttons of the toolbar)
  }

  private async deleteOrder(item: any) {
    this.selectedOrder = this.orders.getArray().indexOf(item);
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      this.disabledButtons = true; // DISABLED BUTTONS
      try {
        // Integration Backend DELETE order send()
        const response: any = await this.backend.send('delete', undefined, `/pedido/${item['_id']}`);
        console.log(response)
        this.orders.remove(this.selectedOrder);
        this.selectedOrder = -1;
        //clear fields
        // Object.assign(this.newOrder, new Order());
        // this.interactionsMode.order = 0; // add
      } catch (error) {
        console.error(error)
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private changeColorToEdit(item: any) {
    //if (this.selectedOrder == this.orders.getArray().indexOf(item)) {
    if ((this.interactionsMode.order == 1) && (this.selectedOrder == this.orders.getArray().indexOf(item))) {
      return 'green';
    } else {
      return 'grey';
    }
  }

  private async saveOrder() {
    if (this.v.validateFields(this.newOrder, [this.clientFields, this.articleFields])) {
      this.disabledButtons = true; // DISABLED BUTTONS
      let orderData: PedidoInterface = {
        nombreCliente: this.newOrder.clientName,
        idOrden: this.newOrder.id,
        telCliente: this.newOrder.clientPhone,
        articulo: this.newOrder.article,
        marca: this.newOrder.brand,
        modelo: this.newOrder.model,
        fallReportada: this.newOrder.failReported,
        observaciones: this.newOrder.observations,
        fechaIngreso: this.newOrder.startDate,
        isCanceled: false,
        fechaEntrega: new Datetime().now(),
        fechaReparacion: new Datetime().now(),
        precio: 100,
        reparacion: ''
      }
      try {
        // Integration Backend PUT orders send()
        const response: any = await this.backend.send('put', orderData, `/pedido/${orderData.idOrden}`);
        console.log(response)

        let order: Order = this.orders.get(this.selectedOrder);
        Object.assign(order, this.newOrder);
        this.orders.set(this.selectedOrder, order);
        Object.assign(this.newOrder, new Order());
        this.selectedOrder = -1;
        this.interactionsMode.order = 0; // mode new
      } catch (error) {
        console.error(error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private cancelSaveOrder() {
    if (confirm('Seguro que desea cancelar?')) {
      Object.assign(this.newOrder, new Order());
      this.v.clearFails();
      this.selectedOrder = -1;
      this.interactionsMode.order = 0; // mode new 
    }
  }

  private generateInputPdf() {
    let inputPdf: InputPdf = new InputPdf();
    let data = {
      enterprise: {
        name: 'CyberPunk',
        location: 'Enrique Rodo 2344',
        phone: '093 333 443',
        web: 'www.coso.com',
      },
      order: {
        number: this.newOrder.id,
        date: this.newOrder.startDate,
        problem: this.newOrder.failReported,
        notes: this.newOrder.observations
      },
      client: {
        name: this.newOrder.clientName,
        phone: this.newOrder.clientPhone
      },
      article: {
        name: this.newOrder.article,
        brand: this.newOrder.brand,
        model: this.newOrder.model
      }
    }
    inputPdf.generateDoc(data);
  }
}