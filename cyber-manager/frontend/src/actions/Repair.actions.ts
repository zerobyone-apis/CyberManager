import { IRepair } from '../types/Repair.type';
import { IOrder } from '../types/Order.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import Datetime from '../utils/DateTime';
import ResultObject from '../../../backend/src/models/ResultObject';

export default class ReparirActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async saveRepair(repair: IRepair) {
    try {
      console.log(repair.deliverDate, repair.repairDate);

      // formatting
      //..........
      let deliverDateFormat: string | null = repair.deliverDate || null;
      let repairDateFormat: string | null = repair.repairDate || null;

      if (deliverDateFormat != null) {
        if (deliverDateFormat.indexOf('T') != -1) {
          console.log('tipo T');
          deliverDateFormat = deliverDateFormat.split('T')[0] + ' 00:00:00';
        } else {
          deliverDateFormat = `${deliverDateFormat} 00:00:00`;
        }
      }

      if (repairDateFormat != null) {
        if (repairDateFormat.indexOf('T') != -1) {
          console.log('tipo T');
          repairDateFormat = repairDateFormat.split('T')[0] + ' 00:00:00';
        } else {
          repairDateFormat = `${repairDateFormat} 00:00:00`;
        }
      }
      //..........

      let data: IRepair = {
        id: repair.id || -1,
        clientName: repair.clientName,
        article: repair.article,
        isCanceled: false, //

        deliverDate: deliverDateFormat,
        repairDate: repairDateFormat,

        reparation: repair.reparation,
        warranty: repair.warranty,
        price: repair.price,
        status: repair.status
      };
      const response: any = await this.backend.send(
        'put',
        data,
        `/pedido/repair/${repair.id}`
      );
      return repair;
    } catch (error) {
      return null;
      console.error('Error guardar reparacion ->' + error);
    }
  }
}
