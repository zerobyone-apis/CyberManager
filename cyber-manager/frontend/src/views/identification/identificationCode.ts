import vue from 'vue';
import Validation from "../../utils/Validation";
import InputPdf from '../../utils/pdfDocuments/InputPDF';

// Models
import Order from "@/models/Order";
import OrderList from "@/models/OrderList";


export default class IndentificationCode extends vue {

  // my litte class of validation
  private v: Validation = new Validation();

  // interactionsMode is used for change the state of the buttons
  private interactionsMode = {
    order: 0 // 0 = add / 1 = save
  }

  private newOrder: Order = new Order();
  private orders: OrderList = new OrderList();
  private selectedOrder: number = -1; // index in orders

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
      // ['failReported', 'string'], not required
      // ['observations', 'string']
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

  // Methods
  private addNewOrder() {
    if (this.v.validateFields(this.newOrder, [this.clientFields, this.articleFields])) {
      let order: Order = new Order();
      order.clientName = this.newOrder.clientName;
      order.clientPhone = this.newOrder.clientPhone;
      order.article = this.newOrder.article;
      order.model = this.newOrder.model;
      order.brand = this.newOrder.brand;
      order.failReported = this.newOrder.failReported;
      order.observations = this.newOrder.observations;

      // Integration Backend POST orders send()
      const response: any = { statusCode: 200, value: { id: 1 } }
      if (response.statusCode == 200) {
        order.id = response.value.id;
        this.orders.add(order);
        //clear fields
        Object.assign(this.newOrder, new Order());
      }
    }
  }

  private editNewOrder(item: any) {
    Object.assign(this.newOrder, item);
    this.selectedOrder = this.orders.getArray().indexOf(item);
    this.interactionsMode.order = 1; // save mode
  }

  private deleteOrder(item: any) {
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      // Integration Backend DELETE order send()
      const response: any = { statusCode: 200, value: { id: 1 } }
      if (response.statusCode == 200) {
        this.orders.remove(this.selectedOrder);
      }
    }
  }

  private saveOrder() {
    if (this.v.validateFields(this.newOrder, [this.clientFields, this.articleFields])) {
      // Integration Backend POST orders send()
      const response: any = { statusCode: 200, value: { id: 1 } }
      if (response.statusCode == 200) {
        let order: Order = this.orders.get(this.selectedOrder);
        Object.assign(order, this.newOrder);
        this.orders.set(this.selectedOrder, order);
        Object.assign(this.newOrder, new Order());
        this.selectedOrder = -1;
        this.interactionsMode.order = 0; // mode new 
      }
    }
  }

  private cancelSaveOrder() {
    if (confirm('Seguro que desea cancelar?')) {
      Object.assign(this.newOrder, new Order());
      this.selectedOrder = -1;
      this.interactionsMode.order = 0; // mode new 
    }
  }

  private changeColorToEdit(item: any) {
    if(this.selectedOrder == this.orders.getArray().indexOf(item)) {
      return 'green';
    }else{
      return 'grey';
    }
  }

  private generatePdf() {
    let inputPdf: InputPdf = new InputPdf();
    let data = {
      enterprise: {
        name: 'CyberPunk',
        location: 'Enrique Rodo 2344',
        phone: '093 333 443',
        web: 'www.coso.com',
      },
      order: {
        number: 123232,
        date: '12/12/20 12:23',
        problem: 'Pantalla rota, cambio de vidrio y carcasa',
        notes: 'pide agregarle vidrio gorilla glass 2334'
      },
      client: {
        name: 'Damian Rodriguez',
        phone: '099 999 999'
      },
      article: {
        name: 'celular',
        brand: 'Alcatel',
        model: 'P344'
      }
    }
    inputPdf.generateDoc(data);
  }
}