import ResultObject from '../../../backend/src/models/ResultObject';
import IntegrationBackend from '../utils/IntegrationBackend';
import Datetime from '../utils/DateTime';
import { IOrder } from '@/types/Order.type';
import {
  ORDER_CONFIRM,
  ORDER_DELIVERED,
  ORDER_RECIVED,
  ORDER_REPAIR,
  ORDER_WORKSHOP
} from '../types/OrderStatus.type';

export default class OrderActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async getAll() {
    let orders: IOrder[] = [];
    try {
      let responseOrders: IOrder[] = await this.backend.send(
        'get',
        undefined,
        '/pedido'
      );
      responseOrders.forEach((order: IOrder) => {
        order.admissionDateFront = new Datetime().normalize(
          (order.admissionDate || '').toString()
        );

        orders.push(order);
      });
      return orders;
    } catch (error) {
      console.error(`Error: getAll-> ${error.message}`);
      return orders;
    }
  }

  public async add(order: IOrder) {
    try {
      let data: IOrder = {
        admissionDate: new Datetime().convertDatetime(
          order.admissionDateFront || ''
        ),
        clientName: order.clientName,
        clientPhone: order.clientPhone,

        deliverDate: undefined,
        repairDate: undefined,

        article: order.article,
        model: order.model,
        brand: order.brand,
        reportedFailure: order.reportedFailure,
        observations: order.observations,
        isCanceled: false,
        status: ORDER_RECIVED.text
      };
      const response: { id: number }[] = await this.backend.send(
        'post',
        data,
        '/pedido'
      );
      let newOrder: IOrder = {
        id: response[0].id,
        admissionDate: data.admissionDate,

        deliverDate: data.deliverDate,
        repairDate: data.repairDate,

        article: data.article,
        reportedFailure: data.reportedFailure,
        isCanceled: data.isCanceled,
        brand: data.brand,
        model: data.model,
        clientName: data.clientName,
        observations: data.observations,
        price: data.price,
        status: data.status,
        clientPhone: data.clientPhone,
        reparation: data.reparation
      };
      return new ResultObject(200, newOrder);
    } catch (error) {
      return new ResultObject(404, error);
      console.error('Error Order.actions method add -> ', error.message);
    }
  }

  public async save(order: IOrder) {
    try {
      let data: IOrder = {
        clientName: order.clientName,
        clientPhone: order.clientPhone,
        article: order.article,
        model: order.model,
        brand: order.brand,
        reportedFailure: order.reportedFailure,
        observations: order.observations,
        isCanceled: false,
        repairDate:
          order.repairDate == '' ? new Datetime().getDate() : order.repairDate,
        status: order.status != '' ? order.status : ORDER_RECIVED.text
      };
      const response: any = await this.backend.send(
        'put',
        data,
        `/pedido/${order.id}`
      );
      return order;
    } catch (error) {
      return null;
      console.error('Ocurrio un error actualizando el pedido -> ', error);
    }
  }

  public async delete(pedido: IOrder) {
    if (confirm('Seguro que desea eliminar la orden seleccionada?')) {
      try {
        const response: any = await this.backend.send(
          'delete',
          undefined,
          `/pedido/${pedido.id}`
        );
      } catch (error) {
        console.error('Error borrando pedidio => ', error);
      }
      return true;
    }
    return false;
  }

  getMaxIdOfOrders(orders: IOrder[]) {
    let ids: number[] = [];
    orders.map(order => {
      let id: number = order.id || -1;
      ids.push(id);
    });
    let maxId: number = Math.max(...ids);
    return maxId === -Infinity ? 0 : maxId + 1;
  }

  public orderBase: IOrder = {
    id: 1,
    admissionDate: new Datetime().now(),
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

  public status: any = {
    recibido: false,
    reparandose: false,
    confirmando_pago: false,
    entregado: false,
    en_talleres: false
  };

  private validateStatus = (req: any): string | undefined => {
    switch (this.status) {
      case this.status.recibido:
        return this.status.recibido === true ? ORDER_RECIVED.text : '';
        break;
      case this.status.reparacion:
        return this.status.reparacion === true ? ORDER_REPAIR.text : '';
        break;
      case this.status.confirmando_pago:
        return this.status.confirmando_pago === true ? ORDER_CONFIRM.text : '';
        break;
      case this.status.entregado:
        return this.status.entregado === true ? ORDER_DELIVERED.text : '';
        break;
      case this.status.en_talleres:
        return this.status.en_talleres === true ? ORDER_WORKSHOP.text : '';
        break;
    }
  };
}