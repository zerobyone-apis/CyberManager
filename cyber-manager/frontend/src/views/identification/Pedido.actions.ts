import vue from 'vue';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { PedidoInterface } from '../../../../backend/src/interface/PedidoInterface';
import DateTime from '../../utils/DateTime';

// Models
import Pedido from '../../../../backend/src/models/pedido';
import PedidoList from '../../../../backend/src/models/PedidoList';

export default class PedidoFunctions {
  [x: string]: any;

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

  // METHODS

  private validateStatus = (req: any): string | undefined => {
    switch (req.status) {
      case 'Recibido':
        return 'Recibido';
        break;
      case 'Reparacion':
        return 'Reparacion';
        break;
      case 'Confirmando Pago':
        return 'Confirmando Pago';
        break;
      case 'Entregado':
        return 'Entregado';
        break;
      case 'En Taller':
        return 'En Taller';
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
      console.log('Whole pedidos.. ', allPedidos);
      let index;
      allPedidos.map((pedido: any, index: number) => {
        let fixedDated = this.normalizeDatesPedidos(pedido);
        this.pedidos.add(new Pedido(fixedDated));
        /* this.pedidos.set(index + 1, new Pedido(fixedDated)); */
        console.log('This array -> ', index);
      });
      debugger;
      console.log('accede');
      this.pedidos.getArray().forEach(item => {
        console.log('id:', item.idOrden);
        console.log('status:', item.status);
      });

      //clear fields pedidos UI
      Object.assign(this.newPedido, this.cleanFields);
    } catch (error) {
      console.error(`Disparando el setTimeout por falla -> ${error.message}`);
      alert(`Error cargando los datos de pedidos. Recargando...`);
    }
  }

  /*  Normalize the Dates and Status of TablePedidos */
  private normalizeDatesPedidos(pedidoInterface: PedidoInterface) {
    let fechaIngreso: any = pedidoInterface.fechaIngreso;
    pedidoInterface.fechaIngreso = this.datetime.normalize(fechaIngreso);

    // formatting date
    let fReparacion: any = pedidoInterface.fechaReparacion;
    let fEntrega: any = pedidoInterface.fechaEntrega;
    fReparacion = this.datetime.normalize(fReparacion);
    fEntrega = this.datetime.normalize(fEntrega);

    pedidoInterface.fechaReparacion = fReparacion;
    pedidoInterface.fechaEntrega = fEntrega;
    pedidoInterface.status = this.validateStatus(pedidoInterface);
    return pedidoInterface;
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
        status: 'Recibido'
      };

      const response: any = await this.backend.send('post', data, '/pedido');

      let createdPedido: Pedido = new Pedido(data);
      // Agrego id de pedido creado para mostrarlo en la tabla
      createdPedido.idOrden = response.idOrden;
      this.pedidos.add(createdPedido);

      //clear fields pedidos UI
      Object.assign(this.newPedido, this.cleanFields);
    } catch (error) {
      console.error('Ocurrio un error creando el pedido. -> ', error.message);
      alert(`Ocurrio un error creando el pedido. -> ${error.message}`);
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

  public setStatus(item: any) {
    this.newPedido.status = item.status;
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
        fechaReparacion:
          this.newPedido.fechaReparacion == ''
            ? this.datetime.getDate()
            : this.newPedido.fechaReparacion,

        status: this.validateStatus(this.newPedido)
      };
      console.log('data to update -> ', data);
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
      console.error('Ocurrio un error actualizando el pedido -> ', error);
    }
  }

  public async saveRepairPedido(reparacionPedido: any) {
    console.log('saveRepair');
    console.log(
      'fecha reparacion ',
      reparacionPedido.fechaReparacion + ' ' + this.datetime.getHour()
    );
    console.log(
      'fecha entrega ',
      reparacionPedido.fechaEntrega + ' ' + this.datetime.getHour()
    );

    console.log('save repair pedido', reparacionPedido);
    try {
      // Integration Backend PUT orders send()
      const idOrden = this.newPedido.idOrden;

      let data: PedidoInterface = {
        nombreCliente: this.newPedido.nombreCliente,
        articulo: this.newPedido.articulo,
        isCanceled: this.newPedido.isCanceled,

        fechaEntrega:
          reparacionPedido.fechaEntrega == ''
            ? ''
            : reparacionPedido.fechaEntrega,

        fechaReparacion:
          reparacionPedido.fechaReparacion + ' ' + this.datetime.getHour()
            ? reparacionPedido.fechaReparacion
            : this.newPedido.fechaReparacion,

        reparacion: reparacionPedido.reparacion,
        precio: this.newPedido.precio == '' ? 0.0 : this.newPedido.precio,
        status: this.validateStatus(reparacionPedido)
      };
      console.log('reparacion pedido : ', this.newPedido.fechaEntrega);
      console.log('Repair Pedido ', data);
      const response: any = await this.backend.send(
        'put',
        data,
        `/pedido/repair/${idOrden}`
      );
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
      status: pedido.status
    });
    this.selectedPedido = this.pedidos.getArray().indexOf(pedido);
  }

  public clearNewPedido() {
    // set original values
    let updatedPedido: Pedido = this.pedidos.get(this.selectedPedido);
    updatedPedido.status = this.newPedido.status;
    this.pedidos.set(this.selectedPedido, updatedPedido);
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
