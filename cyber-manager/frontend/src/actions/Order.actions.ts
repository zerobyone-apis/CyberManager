import IntegrationBackend from '../utils/IntegrationBackend';
// import Datetime from '../utils/DateTime';
import moment from 'moment';
import { IOrder } from '@/types/Order.type';
import ResultObject from '../utils/ResultObject';
import {
  ORDER_ROUTE,
  PUT_ENDPOIT,
  GET_ENDPOIT,
  POST_ENDPOIT,
  DELETE_ENDPOIT
} from '../types/Routes.type';
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
        GET_ENDPOIT,
        undefined,
        ORDER_ROUTE
      );
      responseOrders.forEach((order: IOrder) => {
        order.admissionDateFront = moment(order.admissiondate).format(
          'DD/MM/YYYY hh:mm:ss'
        );
        orders.unshift(order);
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
        admissiondate: moment(order.admissionDateFront).format(
          'YYYY-MM-DD hh:mm:ss'
        ),
        clientname: order.clientname,
        clientphone: order.clientphone,
        deliverydate: undefined,
        repairdate: undefined,
        article: order.article,
        model: order.model,
        brand: order.brand,
        reportedfailure: order.reportedfailure,
        observations: order.observations,
        iscanceled: false,
        status: ORDER_RECIVED.text
      };
      const response: { id: number }[] = await this.backend.send(
        POST_ENDPOIT,
        data,
        ORDER_ROUTE
      );
      let newOrder: IOrder = {
        id: response[0].id,
        admissiondate: data.admissiondate,

        deliverydate: data.deliverydate,
        repairdate: data.repairdate,

        article: data.article,
        reportedfailure: data.reportedfailure,
        iscanceled: data.iscanceled,
        brand: data.brand,
        model: data.model,
        clientname: data.clientname,
        observations: data.observations,
        price: data.price,
        status: data.status,
        clientphone: data.clientphone,
        reparation: data.reparation
      };
      return new ResultObject(200, newOrder);
    } catch (error) {
      console.error('Error Order.actions method add -> ', error.message);
      return new ResultObject(404, error);
    }
  }

  public async save(order: IOrder) {
    try {
      let data: IOrder = {
        clientname: order.clientname,
        clientphone: order.clientphone,
        article: order.article,
        model: order.model,
        brand: order.brand,
        reportedfailure: order.reportedfailure,
        observations: order.observations,
        iscanceled: false,
        repairdate:
          order.repairdate == ''
            ? moment().format('YYYY-MM-DD hh:mm:ss')
            : order.repairdate,
        status: order.status != '' ? order.status : ORDER_RECIVED.text
      };
      const response: any = await this.backend.send(
        PUT_ENDPOIT,
        data,
        `${ORDER_ROUTE}/${order.id}`
      );
      return order;
    } catch (error) {
      console.error('Ocurrio un error actualizando el pedido -> ', error);
      return null;
    }
  }

  public async delete(pedido: IOrder) {
    try {
      const response: any = await this.backend.send(
        DELETE_ENDPOIT,
        undefined,
        `${ORDER_ROUTE}/${pedido.id}`
      );
      return true;
    } catch (error) {
      console.error('Error borrando pedidio => ', error);
      return null;
    }
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

  public orderBase: IOrder = {
    id: 1,
    admissiondate: moment().format('YYYY-MM-DD hh:mm:ss'),
    clientname: '',
    clientphone: '',
    article: '',
    model: '',
    brand: '',
    reportedfailure: '',
    observations: '',
    iscanceled: false,
    repairdate: '',
    deliverydate: '',
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
}
