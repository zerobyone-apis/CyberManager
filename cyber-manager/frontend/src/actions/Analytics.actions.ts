import IntegrationBackend from '../utils/IntegrationBackend';
import ResultObject from '../utils/ResultObject';
import { ORDER_ROUTE, PATCH_ENDPOIT } from '../types/Routes.type';
import { IAnalitycs } from '@/types/Analytics.type';

export default class AnalyticsActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async doArqueo(analytics: IAnalitycs) {
    console.log('object analytics -> ', analytics);
    let data: IAnalitycs = {
      startDate: analytics.startDate + ' 00:00:00',
      endDate: analytics.endDate + ' 00:00:00'
    };
    try {
      let resultArqueo: ResultObject = await this.backend.send(
        PATCH_ENDPOIT,
        data,
        `${ORDER_ROUTE}/arqueo`
      );
      return resultArqueo.value;
    } catch (error) {
      console.error(`Error: Arqueo -> ${error.message}`);
      return null;
    }
  }
}
