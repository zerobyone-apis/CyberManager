import IntegrationBackend from '../utils/IntegrationBackend';
import Datetime from '../utils/DateTime';
import { IOrder } from '@/types/Order.type';
import ResultObject from '../../../backend/src/utils/ResultObject';
import {
  ORDER_ROUTE,
  PUT_ENDPOIT,
  GET_ENDPOIT,
  POST_ENDPOIT,
  DELETE_ENDPOIT
} from '../types/Routes.type';
import { IAnalitycs } from '@/types/Analytics.type';

export default class AnalyticsActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async doArqueo(analytics: IAnalitycs) {
    try {
      let responseOrders: ResultObject = await this.backend.send(
        GET_ENDPOIT,
        analytics,
        `${ORDER_ROUTE}/arqueo`
      );
      return responseOrders.value;
    } catch (error) {
      console.error(`Error: Arqueo -> ${error.message}`);
      return null;
    }
  }
}
