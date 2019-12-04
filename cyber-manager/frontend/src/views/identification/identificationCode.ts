import vue from 'vue';
import Validation from '../../utils/Validation';
import InputPdf from '../../utils/pdfDocuments/InputPDF';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { PedidoInterface } from '../../../../backend/src/interface/PedidoInterface';
import DateTime from '../../../../backend/src/utils/DateTime';

// Models
import Pedido from '../../../../backend/src/models/pedido';
import PedidoList from '../../../../backend/src/models/PedidoList';
import Empresa from '../../../../backend/src/models/empresa';
import { EmpresaInterface } from '../../../../backend/src/interface/EmpresaInterface';

export default class IndentificationCode extends vue {
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
  private pedidos: PedidoList = new PedidoList();
  private selectedPedido: number = -1; // index in orders
  private enterprise: Empresa = new Empresa();

  //Objeto que se muestra en UI-Reparaciones.
  private reparacionPedido: Record<string, any> = {
    idPedido: '',
    nombreCliente: '',
    articulo: '',
    reparacion: '',
    garantia: '',
    tecnico: '',
    status: ''
  };

  //Objecto que se muestra en UI-Pedidos.
  private newPedido: PedidoInterface = {
    idOrden: '',
    fechaIngreso: this.datetime.now(),
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

  // vars used for validation into the newOrder
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

  private status: any = {
    recibido: false,
    reparandose: false,
    confirmando_pago: false,
    entregado: false,
    en_talleres: false
  };

  private validateStatus = (req: any): string | undefined => {
    switch (this.status) {
      case this.status.recibido:
        return this.status.recibido === true ? 'Recibido' : '';
        break;
      case this.status.reparacion:
        return this.status.reparacion === true ? 'Reparacion' : '';

        break;
      case this.status.confirmando_pago:
        return this.status.confirmando_pago === true ? 'Confirmando Pago' : '';

        break;
      case this.status.entregado:
        return this.status.entregado === true ? 'Entregado' : '';

        break;
      case this.status.en_talleres:
        return this.status.en_talleres === true ? 'En Taller' : '';
        break;
    }
  };

  private headerPedido = [
    { text: 'Nro', value: 'idOrden' },
    { text: 'Cliente', value: 'nombreCliente' },
    { text: 'Acciones', value: 'action' },
    { text: 'Fecha Ingreso', value: 'fechaIngreso' },
    { text: 'Articulo', value: 'articulo' },
    { text: 'Status', value: 'status' }
  ];

  // Init fill Methods - Iniciar los metodos de carga de data.
  async init() {
    console.log('accede init');
    this.getAllPedidos();
    this.getEnterpriseInfo();
  }

  private async getAllPedidos() {
    try {
      let allPedidos: PedidoInterface[] = await this.backend.send(
        'get',
        undefined,
        '/pedido'
      );
      //First reconect if response is empty.
      if (!allPedidos.length) {
        setTimeout(this.getAllPedidos, 5000);
        // this.getAllPedidos;
      }

      allPedidos.forEach((pedidoInterface: PedidoInterface) => {

        let fechaIngreso: any = pedidoInterface.fechaIngreso;
        pedidoInterface.fechaIngreso = this.datetime.normalize(fechaIngreso);


        // date: 12-12-2020 11:30


        this.pedidos.add(
          Object.assign(new Pedido(this.newPedido), pedidoInterface)
        );
      });
      //clear fields pedidos UI
      Object.assign(this.newPedido, this.cleanFields);
    } catch (error) {
      alert(`Error cargando los datos de pedidos. Recargando...`);
      //reconect if error 404 not found exception.
      if (error.state === 404 || error) {
        console.log(`Disparando el setTimeout por falla -> ${error.message}`);
        setTimeout(this.getAllPedidos, 5000);
        // this.getAllPedidos;
      }
    }
  }

  private async addNewOrder() {
    if (
      this.v.validateFields(this.newPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true; // DISABLED BUTTONS
      // Integration Backend POST orders send()
      try {
        let data: PedidoInterface = {
          fechaIngreso: this.datetime.now(),
          nombreCliente: this.newPedido.nombreCliente,
          telCliente: this.newPedido.telCliente,
          articulo: this.newPedido.articulo,
          modelo: this.newPedido.modelo,
          marca: this.newPedido.marca,
          fallReportada: this.newPedido.fallReportada,
          observaciones: this.newPedido.observaciones,
          isCanceled: false,
          status: this.validateStatus(this.status) //hay que probarlo bien son las 4:00 am -> :_
        };

        const response: any = await this.backend.send('post', data, '/pedido');
        console.log('add pedido' ,response)
        let createdPedido: Pedido = new Pedido(data);


        // Aca tengo que obtener el id del pedido creado

        createdPedido.idOrden = response.id;
        this.pedidos.add(createdPedido);

        //clear fields pedidos UI
        Object.assign(this.newPedido, this.cleanFields);
      } catch (error) {
        console.error(error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private editNewOrder(pedido: Pedido) {
    //clear fields pedidos UI
    Object.assign(this.newPedido, this.cleanFields);

    Object.assign(this.newPedido, {
      idOrden: pedido.idOrden,
      fechaIngreso: pedido.fechaIngreso,
      nombreCliente: pedido.nombreCliente,
      telCliente: pedido.telCliente,
      articulo: pedido.articulo,
      modelo: pedido.modelo,
      marca: pedido.marca,
      fallReportada: pedido.fallReportada,
      observaciones: pedido.observaciones,
      isCanceled: pedido.isCanceled,
      status: pedido.status
    });

    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
    this.v.clearFails();
    this.interactionsMode.order = 1; // save mode

    //Reparacion Object falta conectar a BD
    this.reparacionPedido = {
      idPedido: this.newPedido.idOrden,
      nombreCliente: this.newPedido.nombreCliente,
      articulo: this.newPedido.articulo,
      reparacion: this.newPedido.reparacion,
      garantia: this.$store.getters.getGarantia,
      tecnico: this.$store.getters.getTecnico,
      status: this.newPedido.status ? this.newPedido.status : null
    };
  }

  private async deleteOrder(pedido: Pedido) {
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      this.disabledButtons = true; // DISABLED BUTTONS
      try {
        // Integration Backend DELETE order send()
        const response: any = await this.backend.send(
          'delete',
          undefined,
          `/pedido/${pedido.idOrden}`
        );
        console.log(response);
        this.pedidos.remove(this.selectedPedido);
        this.selectedPedido = -1;

        //clear fields
        // Object.assign(this.newOrder, new Order());
        // this.interactionsMode.order = 0; // add
      } catch (error) {
        console.error(error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
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

  private async saveOrder() {
    if (
      this.v.validateFields(this.newPedido, [
        this.clientFields,
        this.articleFields
      ])
    ) {
      this.disabledButtons = true; // DISABLED BUTTONS
      try {
        // Integration Backend PUT orders send()
        console.log('este es el put ', this.newPedido);

        let data = {
          nombreCliente: this.newPedido.nombreCliente,
          telCliente: this.newPedido.telCliente,
          articulo: this.newPedido.articulo,
          modelo: this.newPedido.modelo,
          marca: this.newPedido.marca,
          fallReportada: this.newPedido.fallReportada,
          observaciones: this.newPedido.observaciones,
          isCanceled: false,

          // verifico si ingreso algo en fecha de reparacion
          fechaReparacion: (this.newPedido.fechaReparacion == '') ? this.datetime.convert(
            this.datetime.getDate(),
            '00:00:00'
          ) : this.newPedido.fechaReparacion,
          
          reparacion: '',
          precio: 0.0
          /* DEBERIA IR STATUS -> Mañana lo hare.*/ 
          // tienen que ir todos los atributos de reparacion tambien asi no se hace otro metodo para
          // salvar los datos.
        };
        const response: any = await this.backend.send(
          'put',
          data,
          `/pedido/${this.newPedido.idOrden}`
        );

        let pedido: Pedido = this.pedidos.get(this.selectedPedido);
        Object.assign(pedido, this.newPedido);
        this.pedidos.set(this.selectedPedido, pedido);

        //clear fields pedidos UI
        Object.assign(this.newPedido, this.cleanFields);

        this.selectedPedido = -1;
        this.interactionsMode.order = 0; // mode new
      } catch (error) {
        console.error('Error ->' + error);
      }
      this.disabledButtons = false; // DISABLED BUTTONS
    }
  }

  private cancelSaveOrder() {
    if (confirm('Seguro que desea cancelar?')) {
      this.newPedido = new Pedido(this.cleanFields);
      // Object.assign(this.newPedido, new Pedido());
      this.v.clearFails();
      this.selectedPedido = -1;
      this.interactionsMode.order = 0; // mode new
    }
  }

  //Enterprise Saved info,
  private async saveEnterpriseInfo() {
    try {
      let data = {
        nombre: this.enterprise.nombre,
        direccion: this.enterprise.direccion,
        celular: this.enterprise.celular,
        email: this.enterprise.email,
        garantia: this.enterprise.garantia,
        urlLogo: this.enterprise.urlLogo,
        telefono: this.enterprise.telefono,
        primerMsjRecibo: this.enterprise.primerMsjRecibo,
        segundoMsjRecibo: this.enterprise.segundoMsjRecibo
      }
      // Integration Backend PUT orders send()
      const response: any = await this.backend.send(
        'put',
        data,
        `/empresa/${this.enterprise.idEmpresa}`
      );
      console.log(response);
      /* Message success */
      alert(' Empresa Actualizada exitosamente!..');
    } catch (error) {
      console.error(`Error actualizando la empresa.. -> ${error.message}`);
    }
  }

  private async getEnterpriseInfo() {
    try {
      // save in the store the user data
      const userInfo = this.$store.getters.userInfo;

      // Integration Backend Get Empresa By idUser send() Only supervisor can be founded.
      const response: EmpresaInterface = await this.backend.send(
        'get',
        undefined,
        `/empresa/${userInfo.idUser}`
      );
      console.log('route: ', `/empresa/${userInfo.idUser}`)
      console.log('response get Enterprise', response)

      let empresaInfo = {
        idEmpresa: response.idEmpresa,
        garantia: response.garantia,
        tecnico: response.username ? response.username : userInfo.username
      };
      // save in the store the empresaInfo data
      this['$store'].commit('empresaInfo', empresaInfo);

      // Fill fiealds Empresa.
      Object.assign(this.enterprise, response);
      console.log(response);
    } catch (error) {
      console.error(
        'Algo sucedio obteniendo los datos de la empresa observe -> ',
        error.message
      );
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
      inputPdf.generateDoc(this.enterprise, new Pedido(this.newPedido));
    } catch (error) {
      console.error('Error generatedDoc -> ', error);
    }
  }

  //Clear fields object UI-CLEAN-Pedido
  private cleanFields: PedidoInterface = {
    idOrden: '',
    fechaIngreso: this.datetime.now(),
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

  private uploadImage(e: any) {
    console.log(e)
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      let data: any = e.target;
      this.enterprise.urlLogo = data['result'];
    };
  }
}
