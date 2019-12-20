import vue from 'vue';
import IntegrationBackend from '../utils/IntegrationBackend';
import { PedidoInterface } from '../../../backend/src/interface/PedidoInterface';
import ReparacionInterface from '@/types/Reparacion';
import Datetime from '../utils/DateTime';

// Models
import Pedido from '../../../backend/src/models/pedido';
import PedidoList from '../../../backend/src/models/PedidoList';

export default class PedidoFunctions {
  private backend: IntegrationBackend = new IntegrationBackend();
  public pedidoBase: PedidoInterface = {
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
    let pedidos: PedidoList = new PedidoList();
    try {
      let responseAllPedidos: PedidoInterface[] = await this.backend.send(
        'get',
        undefined,
        '/pedido'
      );

      responseAllPedidos.forEach((pedido: PedidoInterface) => {
        // formatting date
        pedido.fechaIngreso = new Datetime().normalize(
          (pedido.fechaIngreso || '').toString()
        );
        pedido.fechaReparacion = new Datetime().normalize(
          (pedido.fechaReparacion || '').toString()
        );
        pedido.fechaEntrega = new Datetime().normalize(
          (pedido.fechaEntrega || '').toString()
        );

        pedidos.add(Object.assign(new Pedido(this.pedidoBase), pedido));
      });

      return pedidos;
    } catch (error) {
      console.error(`Error: getAll-> ${error.message}`);
      alert(`Error cargando los datos de pedidos. Recargando...`);
      return pedidos;
    }
  }

  public async add(pedido: PedidoInterface) {
    try {
      let data: PedidoInterface = {
        fechaIngreso: new Datetime().now(),
        nombreCliente: pedido.nombreCliente,
        telCliente: pedido.telCliente,
        articulo: pedido.articulo,
        modelo: pedido.modelo,
        marca: pedido.marca,
        fallReportada: pedido.fallReportada,
        observaciones: pedido.observaciones,
        isCanceled: false,
        status: 'Recibido'
      };
      const response: any = await this.backend.send('post', data, '/pedido');
      let createdPedido: Pedido = new Pedido(data);
      createdPedido.idOrden = response.value.idOrden;
      return createdPedido;
    } catch (error) {
      return null;
      console.error('Ocurrio un error creando el pedido. -> ', error.message);
      alert(`Ocurrio un error creando el pedido. -> ${error.message}`);
    }
  }

  public async save(pedido: PedidoInterface) {
    console.log('pedido save status: ', pedido.status);
    try {
      let data: PedidoInterface = {
        nombreCliente: pedido.nombreCliente,
        telCliente: pedido.telCliente,
        articulo: pedido.articulo,
        modelo: pedido.modelo,
        marca: pedido.marca,
        fallReportada: pedido.fallReportada,
        observaciones: pedido.observaciones,
        isCanceled: false,
        // verifico si ingreso algo en fecha de reparacion
        fechaReparacion:
          pedido.fechaReparacion == ''
            ? new Datetime().getDate()
            : pedido.fechaReparacion,
        status: pedido.status != '' ? pedido.status : 'Recibido'
      };
      const response: any = await this.backend.send(
        'put',
        data,
        `/pedido/${pedido.idOrden}`
      );
      console.log(response);
      alert(' Pedido Actualizada exitosamente!..');
      return pedido;
    } catch (error) {
      return null;
      console.error('Ocurrio un error actualizando el pedido -> ', error);
    }
  }

  public async delete(pedido: PedidoInterface) {
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      try {
        // Integration Backend DELETE order send()
        const response: any = await this.backend.send(
          'delete',
          undefined,
          `/pedido/${pedido.idOrden}`
        );
      } catch (error) {
        console.error('Error borrando pedidio => ', error);
      }
    }
  }

  public async saveRepairPedido(
    reparacionPedido: ReparacionInterface,
    pedidoSelected: PedidoInterface
  ) {
    try {
      const idOrden = pedidoSelected.idOrden;

      let data: PedidoInterface = {
        nombreCliente: pedidoSelected.nombreCliente,
        articulo: pedidoSelected.articulo,
        isCanceled: pedidoSelected.isCanceled,

        // Fucking dates
        fechaEntrega: reparacionPedido.fechaEntrega,
        fechaReparacion: reparacionPedido.fechaReparacion,

        reparacion: reparacionPedido.reparacion,
        precio: reparacionPedido.precio,
        status: reparacionPedido.status
      };
      const response: any = await this.backend.send(
        'put',
        data,
        `/pedido/repair/${idOrden}`
      );
      alert(' Reparacion guardada exitosamente!..');
    } catch (error) {
      console.error('Error guardar reparacion ->' + error);
    }
  }
}
