import vue from 'vue';
import Validation from "../../utils/Validation";
import InputPdf from '../../utils/pdfDocuments/InputPDF';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { PedidoInterface } from '../../interface/PedidoInterface';
import Datetime from '../../utils/TimeFunctions';

// Models
import Pedido from "@/models/Pedido";
import PedidoList from "@/models/PedidoList";
import Empresa from '@/models/Empresa';
import { Watch } from 'vue-property-decorator';
import { EmpresaInterface } from '@/interface/EmpresaInterface';

export default class IndentificationCode extends vue {

  public wizard = 1;

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

  private newPedido: Pedido = new Pedido();
  private pedidos: PedidoList = new PedidoList();
  private selectedPedido: number = -1; // index in orders
  
  private enterprise: Empresa = new Empresa();

  // vars used for validation into the newOrder
  // [ field-name, type: string, int ]
  private clientFields: any = {
    objectName: 'newPedido',
    fields: [
      ['nombreCliente', 'string'],
      ['telCliente', 'string']
    ]
  };
  private articleFields: any = {
    objectName: 'newPedido',
    fields: [
      ['articulo', 'string'],
      ['marca', 'string'],
      ['modelo', 'string'],
    ]
  }

  private others: any = {
    repair: false,
    pay: false,
    deliver: false,
    other: false,
  }

  private headerPedido = [
    { text: 'Nro', value: 'idOrden' },
    { text: 'Cliente', value: 'nombreCliente' },
    { text: "Acciones", value: 'action' }
  ]

  // Methods
  async init() {
    console.log('accede init')
    let responseOrders: PedidoInterface[] = await this.backend.send('get', undefined, '/pedido');
    responseOrders.forEach((pedidoInterface: PedidoInterface) => {
      this.pedidos.add(new Pedido(pedidoInterface));
    });
  }

  private async addNewOrder() {
    if (this.v.validateFields(this.newPedido, [this.clientFields, this.articleFields])) {
      this.disabledButtons = true; // DISABLED BUTTONS
      // Integration Backend POST orders send()
      try {
        const response: any = await this.backend.send('post', this.newPedido.getData(), '/pedido');
        this.newPedido.setIdOrden = response[0].insertId;
        this.pedidos.add(this.newPedido);
        //clear fields
        Object.assign(this.newPedido, new Pedido());
      } catch (error) {
        console.error(error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private editNewOrder(pedido: Pedido) {
    Object.assign(this.newPedido, pedido); // show data
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
    this.v.clearFails();
    this.interactionsMode.order = 1; // save mode
    // save in the store the selected order - this active the buttons of the toolbar)
  }

  private async deleteOrder(pedido: Pedido) {
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      this.disabledButtons = true; // DISABLED BUTTONS
      try {
        // Integration Backend DELETE order send()
        const response: any = await this.backend.send('delete', undefined, `/pedido/${pedido['idOrden']}`);
        console.log(response)
        this.pedidos.remove(this.selectedPedido);
        this.selectedPedido = -1;
        //clear fields
        // Object.assign(this.newOrder, new Order());
        // this.interactionsMode.order = 0; // add
      } catch (error) {
        console.error(error)
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private changeColorToEdit(pedido: Pedido) {
    if ((this.interactionsMode.order == 1) &&
      (this.selectedPedido == this.pedidos.getArray().indexOf(pedido))) {
      return 'green';
    } else {
      return 'grey';
    }
  }

  private async saveOrder() {
    if (this.v.validateFields(this.newPedido, [this.clientFields, this.articleFields])) {
      this.disabledButtons = true; // DISABLED BUTTONS
      try {
        // Integration Backend PUT orders send()
        const response: any =
          await this.backend.send('put', this.newPedido.getData(), `/pedido/${this.newPedido.getIdOrden}`);

        let pedido: Pedido = this.pedidos.get(this.selectedPedido);
        Object.assign(pedido, this.newPedido);
        this.pedidos.set(this.selectedPedido, pedido);
        Object.assign(this.newPedido, new Pedido()); // clear

        this.selectedPedido = -1;
        this.interactionsMode.order = 0; // mode new
      } catch (error) {
        console.error('Error 149'+error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private cancelSaveOrder() {
    if (confirm('Seguro que desea cancelar?')) {
      this.newPedido = new Pedido();
      // Object.assign(this.newPedido, new Pedido());
      this.v.clearFails();
      this.selectedPedido = -1;
      this.interactionsMode.order = 0; // mode new 
    }
  }

  private async saveEnterpriseInfo() {
    try {
      // Integration Backend PUT orders send()
      const response: any = await this.backend.send('put', this.enterprise.getData(), `/empresa/${this.enterprise.getIdEmpresa}`);
      console.log(response)

      // let order: Order = this.orders.get(this.selectedOrder);
      // Object.assign(order, this.newOrder);
      // this.orders.set(this.selectedOrder, order);
      // Object.assign(this.newOrder, new Order());
      // this.selectedOrder = -1;
      // this.interactionsMode.order = 0; // mode new
    } catch (error) {
      console.error(error);
    }
  }

  private generateInputPdf() {
    let inputPdf: InputPdf = new InputPdf();
    inputPdf.generateDoc(this.enterprise, this.newPedido);
  }
}