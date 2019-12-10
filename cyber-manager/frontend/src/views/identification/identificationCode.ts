import vue from 'vue';
import Validation from '../../utils/Validation';
import InputPdf from '../../utils/pdfDocuments/InputPDF';
import OutputPdf from '../../utils/pdfDocuments/OutputPDF';
import IntegrationBackend from '../../utils/IntegrationBackend';
import DateTime from '../../utils/DateTime';
import EmpresaFunctions from './EmpresaFunctions';

import PedidoFunctions from './PedidoFunctions';
import Pedido from '../../../../backend/src/models/pedido';

export default class IndentificationCode extends vue {
  private empresa: EmpresaFunctions = new EmpresaFunctions();
  public pedido: PedidoFunctions = new PedidoFunctions();

  // user info saved in the store
  private userInfo = this.$store.getters.userInfo;
  public wizard = 1;
  // Integration Backend
  private backend: IntegrationBackend = new IntegrationBackend();
  // my litte class of validation
  private v: Validation = new Validation();
  // interactionsMode is used for change the state of the buttons
  private interactionsMode = {
    order: 0 // 0 = add / 1 = save
  };
  private datetime: DateTime = new DateTime();
  // Control activity of the buttons of the main actions
  private disabledButtons: boolean = false;

  // vars used for validation
  // [ field-name, type: string, int ]
  private clientFields: Record<string, any> = {
    objectName: 'newPedido',
    fields: [
      ['nombreCliente', 'string'],
      ['telCliente', 'number']
    ]
  };
  private articleFields: Record<string, any> = {
    objectName: 'newPedido',
    fields: [
      ['articulo', 'string'],
      ['marca', 'string'],
      ['modelo', 'string']
    ]
  };
  private headerPedido = [
    { text: 'Nro', value: 'idOrden' },
    { text: 'Cliente', value: 'nombreCliente' },
    { text: 'Acciones', value: 'action' },
    { text: 'Fecha Ingreso', value: 'fechaIngreso' },
    { text: 'Articulo', value: 'articulo' },
    { text: 'Status', value: 'status' }
  ];

  private reparacionPedido: Record<string, any> = {
    idPedido: '',
    nombreCliente: '',
    articulo: '',
    reparacion: '',
    garantia: '',
    tecnico: '',
    status: '',
    fechaReparacion: ''
  };

  private searchFilters: any = {
    nombre: 'nombreCliente',
    status: 'status'
    // 'id': 'idOrden'
  };
  private search: any = {
    filter: 'nombre',
    value: ''
  };

  // FUNCTIONS ACTIONS-

  // Init fill Methods - Iniciar los metodos de carga de data.
  async init() {
    this.pedido.getAll();
    this.empresa.get(this.userInfo);
  }

  async addPedido() {
    if (
      this.v.validateFields(this.pedido.newPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      this.pedido.add();
      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  async savePedido() {
    if (
      this.v.validateFields(this.pedido.newPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      this.pedido.save();
      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  async saveRepairPedido() {
    if (
      this.v.validateFields(this.reparacionPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      this.pedido.saveRepairPedido();
      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  async deletePedido(selectedPedido: any) {
    this.disabledButtons = true;
    this.pedido.delete(selectedPedido);
    this.disabledButtons = false;
  }

  private showSelectedPedido(pedido: any) {
    this.pedido.selectPedido(pedido);

    //Reparacion Object falta conectar a BD
    // esto habria que moverlo a reparacionFunctions
    this.reparacionPedido = {
      idPedido: this.pedido.newPedido.idOrden,

      fechaReparacion: this.pedido.newPedido.fechaReparacion,
      fechaEntrega: this.pedido.newPedido.fechaEntrega,

      nombreCliente: this.pedido.newPedido.nombreCliente,
      articulo: this.pedido.newPedido.articulo,
      reparacion: this.pedido.newPedido.reparacion,
      garantia: this.$store.getters.getGarantia,
      tecnico: this.$store.getters.getTecnico,
      status: this.pedido.newPedido.status ? this.pedido.newPedido.status : null
    };

    this.v.clearFails();
    this.interactionsMode.order = 1; // save mode
  }

  private cancelSavePedido() {
    if (confirm('Seguro que desea descartar los cambios?')) {
      this.pedido.clearNewPedido();
      this.v.clearFails();
      this.interactionsMode.order = 0; // mode new
    }
  }

  private saveEmpresaInfo() {
    this.disabledButtons = true;
    this.empresa.save();
    this.disabledButtons = false;
  }

  private changeColorToEdit(pedido: Pedido) {
    if (
      this.interactionsMode.order == 1 &&
      this.pedido.selectedPedido ==
        this.pedido.pedidos.getArray().indexOf(pedido)
    ) {
      return 'green';
    } else {
      return 'grey';
    }
  }

  private generateInputPdf() {
    let inputPdf: InputPdf = new InputPdf();
    try {
      //Validar que boton llama este metodo en base al WIzard que tenga
      //Si wiazard es uno, imprimir el recibo de ingreso de pedido, con el primer mesnaje recibo
      //Si wiazard es dos, imprimir el recibo de entrega de pedido, con el segundo mesnaje recibo
      /* Tenemos que configurar los parametros ->
              - Primer MSJ Recibo 
              - Segundo MSJ Recibo 
          Que no estan en el PDF y Ajustar los margenes para que no se salgan del A4*/
      inputPdf.generateDoc(
        this.empresa.data,
        new Pedido(this.pedido.newPedido)
      );
    } catch (error) {
      console.error('Error generatedDoc -> ', error);
    }
  }

  private generateOutputPdf() {
    let outputPdf: OutputPdf = new OutputPdf();
    try {
      //Validar que boton llama este metodo en base al WIzard que tenga
      //Si wiazard es uno, imprimir el recibo de ingreso de pedido, con el primer mesnaje recibo
      //Si wiazard es dos, imprimir el recibo de entrega de pedido, con el segundo mesnaje recibo
      /* Tenemos que configurar los parametros ->
              - Primer MSJ Recibo 
              - Segundo MSJ Recibo 
          Que no estan en el PDF y Ajustar los margenes para que no se salgan del A4*/
      outputPdf.generateDoc(
        this.empresa.data,
        new Pedido(this.pedido.newPedido)
      );
    } catch (error) {
      console.error('Error generatedDoc -> ', error);
    }
  }

  private filterItems() {
    if (this.search.value == '') {
      return this.pedido.pedidos.getArray();
    } else {
      // filter
      let filterKey = this.searchFilters[this.search.filter];
      return this.pedido.pedidos
        .getArray()
        .filter(
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
      this.empresa.data.urlLogo = data['result'].toString();
    };
  }
}
