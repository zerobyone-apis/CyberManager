import vue from 'vue';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { PedidoInterface } from '../../../../backend/src/interface/PedidoInterface';
import DateTime from '../../utils/DateTime';

// Models
import Pedido from '../../../../backend/src/models/pedido';
import PedidoList from '../../../../backend/src/models/PedidoList';

export default class PedidoFunctions {

  private backend: IntegrationBackend = new IntegrationBackend();
  private datetime: DateTime = new DateTime();
  public pedidos: PedidoList = new PedidoList();
  public selectedPedido: number = -1; // index in orders
  //Objecto que se muestra en UI-Pedidos.
  public newPedido: PedidoInterface = {
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
  public status: any = {
    recibido: false,
    reparandose: false,
    confirmando_pago: false,
    entregado: false,
    en_talleres: false
  };
  
  // METHODS

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

  public async getAll() {
    try {
      let allPedidos: PedidoInterface[] = await this.backend.send(
        'get',
        undefined,
        '/pedido'
      );
      //First reconect if response is empty.
      if (!allPedidos.length) {
        // setTimeout(this.getAll, 5000);
      }
      allPedidos.forEach((pedidoInterface: PedidoInterface) => {
        let fechaIngreso: any = pedidoInterface.fechaIngreso;
        pedidoInterface.fechaIngreso = this.datetime.normalize(fechaIngreso);
        
        // formatting date
        let fReparacion: any = pedidoInterface.fechaReparacion;
        let fEntrega: any = pedidoInterface.fechaEntrega;
        // let fIngreso: any = pedidoInterface.fechaIngreso; 
        fReparacion = this.datetime.normalize(fReparacion);
        fEntrega = this.datetime.normalize(fEntrega);
        // fIngreso = this.datetime.normalize(fIngreso);
        pedidoInterface.fechaReparacion = fReparacion;
        pedidoInterface.fechaEntrega = fEntrega;
        // pedidoInterface.fechaIngreso = fIngreso;

        // for (let i = 0; i < 10; i++) {
          this.pedidos.add(
            Object.assign(new Pedido(this.newPedido), pedidoInterface)
          );  
        // }
      });

      this.pedidos.getArray().forEach(item => {
        // console.log('reparacion:',item.idOrden, item.fechaReparacion)
        // console.log('entrega:',item.idOrden, item.fechaEntrega)
      });

      //clear fields pedidos UI
      Object.assign(this.newPedido, this.cleanFields);
    } catch (error) {
      alert(`Error cargando los datos de pedidos. Recargando...`);
      //reconect if error 404 not found exception.
      if (error.state === 404 || error) {
        // console.log(`Disparando el setTimeout por falla -> ${error.message}`);
        // setTimeout(this.getAll, 5000);
      }
    }
  }

  public async add() {
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
      let createdPedido: Pedido = new Pedido(data);
      // Aca tengo que obtener el id del pedido creado
      createdPedido.idOrden = response.idOrden;
      this.pedidos.add(createdPedido);
      //clear fields pedidos UI
      Object.assign(this.newPedido, this.cleanFields);
    } catch (error) {
      console.error(error);
    }
  }

  public async delete(pedido: Pedido) {
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      try {
        // Integration Backend DELETE order send()
        const response: any = await this.backend.send(
          'delete',
          undefined,
          `/pedido/${pedido.idOrden}`
        );
        this.pedidos.remove(this.selectedPedido);
        this.selectedPedido = -1;
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async save() {
    try {
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
    } catch (error) {
      console.error('Error ->' + error);
    }
  }

  public selectPedido(pedido: Pedido) {
    Object.assign(this.newPedido, this.cleanFields);
    Object.assign(this.newPedido, {
      idOrden: pedido.idOrden,

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
    });
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
  }

  public clearNewPedido() {
    this.newPedido = new Pedido(this.cleanFields);
    this.selectedPedido = -1;
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

}