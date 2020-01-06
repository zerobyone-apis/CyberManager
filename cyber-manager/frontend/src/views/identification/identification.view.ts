import vue from 'vue';
import Validation from '../../utils/Validation';
import InputPdf from '../../utils/pdfDocuments/InputPDF';
import OutputPdf from '../../utils/pdfDocuments/OutputPDF';
import IntegrationBackend from '../../utils/IntegrationBackend';
import Pedido from '../../../../backend/src/models/pedido';
import EmpresaAction from '../../actions/Empresa.actions';
import PedidoAction from '../../actions/Pedido.actions';

import { PedidoInterface } from '../../../../backend/src/interface/PedidoInterface';
import PedidoList from '../../../../backend/src/models/PedidoList';
import UserStore from '../../types/UserStore';
import Reparacion from '../../types/Reparacion';
import Empresa from '../../../../backend/src/models/empresa';

import Datetime from '../../../../backend/src/utils/Datetime';

export default class IndentificationCode extends vue {
  // user info saved in the store
  private userInfo: UserStore = this.$store.getters.userInfo;
  // Actions
  // ............
  private empresaActions: EmpresaAction = new EmpresaAction();
  public pedidoActions: PedidoAction = new PedidoAction();
  // ............
  public newPedido: PedidoInterface = {
    idOrden: '',
    fechaIngreso: new Datetime().now(),
    nombreCliente: '',
    telCliente: '',
    articulo: '',
    modelo: '',
    marca: '',
    fallReportada: '',
    observaciones: '',
    isCanceled: '',
    fechaReparacion: '',
    fechaEntrega: '',
    reparacion: '',
    precio: '',
    status: ''
  };
  public pedidos: PedidoList = new PedidoList();
  public selectedPedido = -1;
  // ............
  private empresa: Empresa = new Empresa();
  // ............

  public wizard = 1;
  private backend: IntegrationBackend = new IntegrationBackend();
  private v: Validation = new Validation();
  private interactionsMode = {
    order: 0 // 0 = add / 1 = save
  };
  private disabledButtons: boolean = false;
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
  private status: any = {
    // see more colors in: https://vuetifyjs.com/en/styles/colors
    // used in v-select into the v-data-table as Object.keys(status): string[]
    Recibido: 'blue lighten-2',
    Reparacion: 'yellow lighten-1',
    'Confirmando Pago': 'green lighten-1',
    Entregado: 'blue-grey lighten-3',
    'En Taller': 'deep-orange lighten-2'
  };

  private reparacionPedido: any = {
    idPedido: '',
    nombreCliente: '',
    articulo: '',
    modelo: '',
    garantia: '',
    tecnico: '',
    fechaEntrega: '',
    fechaReparacion: '',
    reparacion: '',
    precio: 0,
    status: ''
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
  ordenservice: any;

  // FUNCTIONS ACTIONS-

  async init() {
    this.disabledButtons = true;
    this.pedidos = await this.pedidoActions.getAll();
    this.empresa = await this.empresaActions.get(this.userInfo);
    this.newPedido.idOrden = this.getLastMaxValueOfOrdersPedido();
    this.disabledButtons = false;
  }

  async addPedido() {
    if (
      this.v.validateFields(this.newPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      let responseAddPedido = await this.pedidoActions.add(this.newPedido);
      if (responseAddPedido != null) {
        // if null, error
        this.pedidos.add(responseAddPedido);
        //clear fields pedidos UI
        Object.assign(this.newPedido, this.cleanFields);
      }
      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  // El status de la tabla, al cambiarlo, se cambia en el pedido seleccionado dentro
  // del array pedidos

  async savePedido() {
    if (
      this.v.validateFields(this.newPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      let responseSavePedido = await this.pedidoActions.save(this.newPedido);
      if (responseSavePedido != null) {
        let pSelected: Pedido = this.pedidos.get(this.selectedPedido);
        Object.assign(pSelected, responseSavePedido);
        this.pedidos.set(this.selectedPedido, pSelected);
        // clear fields pedidos UI
        Object.assign(this.newPedido, this.cleanFields);
        this.selectedPedido = -1;
      }

      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  async deletePedido(selectedPedido: any) {
    this.disabledButtons = true;
    await this.pedidoActions.delete(selectedPedido);
    this.pedidos.remove(this.selectedPedido);
    Object.assign(this.newPedido, this.cleanFields);
    this.interactionsMode.order = 0;
    this.selectedPedido = -1;
    this.disabledButtons = false;
  }

  // Reparation
  private showSelectedPedido(pedido: any) {
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
    Object.assign(this.newPedido, this.cleanFields);
    Object.assign(this.newPedido, {
      idOrden: pedido._idOrden,
      fechaIngreso: pedido.fechaIngreso,
      fechaReparacion: pedido.fechaReparacion,
      fechaEntrega: pedido.fechaEntrega,
      nombreCliente: pedido.nombreCliente,
      telCliente: pedido.telCliente,
      articulo: pedido.articulo,
      modelo: pedido.modelo,
      marca: pedido.marca,
      fallReportada: pedido.fallReportada,
      observaciones: pedido.observaciones,
      isCanceled: pedido.isCanceled,
      status: pedido.status,
      precio: pedido.precio
    });

    this.reparacionPedido = {
      idPedido: this.newPedido.idOrden,

      // formatting dates:
      fechaReparacion: new Datetime().convertDatetime(
        this.newPedido.fechaReparacion || ''
      ),
      fechaEntrega: new Datetime().convertDatetime(
        this.newPedido.fechaEntrega || ''
      ),

      nombreCliente: this.newPedido.nombreCliente,
      articulo: this.newPedido.articulo,
      reparacion: this.newPedido.reparacion,
      garantia: this.empresa.garantia,
      tecnico: this.userInfo.username,
      status: this.newPedido.status ? this.newPedido.status : null,
      precio: this.newPedido.precio
      // status: this.newPedido.status
    };
    console.log(this.reparacionPedido.fechaEntrega);

    this.v.clearFails();
    this.interactionsMode.order = 1; // save mode
  }

  async saveRepairPedido() {
    if (
      this.v.validateFields(this.reparacionPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true;
      await this.pedidoActions.saveRepairPedido(
        this.reparacionPedido,
        this.newPedido
      );
      // change status in item selected
      let updatedPedido: Pedido = this.pedidos.get(this.selectedPedido);
      updatedPedido.status = this.reparacionPedido.status;
      this.pedidos.set(this.selectedPedido, updatedPedido);

      this.disabledButtons = false;
      this.interactionsMode.order = 0;
    }
  }

  private cancelSavePedido() {
    if (confirm('Seguro que desea descartar los cambios?')) {
      let updatedPedido: Pedido = this.pedidos.get(this.selectedPedido);
      updatedPedido.status = this.newPedido.status;
      this.pedidos.set(this.selectedPedido, updatedPedido);
      this.newPedido = new Pedido(this.cleanFields);
      this.selectedPedido = -1;

      this.v.clearFails();
      this.interactionsMode.order = 0; // mode new
    }
  }

  private async saveEmpresaInfo() {
    this.disabledButtons = true;
    await this.empresaActions.save();
    this.disabledButtons = false;
  }

  private changeColorToEdit(pedido: Pedido) {
    if (
      this.interactionsMode.order == 1 &&
      this.selectedPedido == this.pedidos.getArray().indexOf(pedido)
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
      inputPdf.generateDoc(this.empresa, new Pedido(this.newPedido));
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
      let pedido = new Pedido(this.newPedido);
      pedido.reparacion = this.reparacionPedido.reparacion;

      outputPdf.generateDoc(this.empresa, pedido);
    } catch (error) {
      console.error('Error generatedDoc -> ', error);
    }
  }

  private filterItems() {
    if (this.search.value == '') {
      return this.pedidos.getArray();
    } else {
      // filter
      let filterKey = this.searchFilters[this.search.filter];
      return this.pedidos
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
      this.empresa.urlLogo = data['result'].toString();
    };
  }

  private getColorByStatus(status: string) {
    return this.status[status] || 'grey';
  }

  //Count of ids and setting order service plus one, 48 + 1 = 49
  private getLastMaxValueOfOrdersPedido() {
    let ordenservice = this.pedidos.getArray();
    let ids: number[] = [];
    ordenservice.map(pedido => {
      ids.push((typeof pedido.idOrden == 'string' ? -1 : pedido.idOrden) || -1);
    });
    let maxId = Math.max(...ids);
    console.log('Maximo id de la lista -> ', maxId);
    return maxId + 1;
  }

  //Clear fields object UI-CLEAN-Pedido
  private cleanFields: PedidoInterface = {
    idOrden: this.getLastMaxValueOfOrdersPedido(),
    fechaIngreso: new Datetime().now(),
    nombreCliente: '',
    telCliente: '',
    articulo: '',
    modelo: '',
    marca: '',
    fallReportada: '',
    observaciones: '',
    isCanceled: '',
    fechaReparacion: '',
    fechaEntrega: '',
    reparacion: '',
    precio: '',
    status: ''
  };
}

/* NO BORRAR

                  <template v-slot:item.status="{ item }">
                    <!-- {{ 'mode:' + interactionsMode.order }}
                    {{ '/unselected:' + (selectedPedido != pedidos.getArray().indexOf(item)) }}
                    {{ '/pos:' + pedidos.getArray().indexOf(item) }}
                    {{ '/selected:' + selectedPedido }}-->
                    <v-select
                      v-model="item.status"
                      :items="Object.keys(status)"
                      @change="changeStatus"
                      :disabled="
                        (interactionsMode.order == 1 &&
                          selectedPedido !=
                            pedidos.getArray().indexOf(item)) ||
                          interactionsMode.order == 0
                      "
                      chips
                      flat
                      attach
                      label="status"
                    >
                      <template v-slot:selection="{ item }">
                        <v-chip :color="getColorByStatus(item)">
                          <span>{{ item }}</span>
                        </v-chip>
                      </template>
                    </v-select>
                  </template>
*/
