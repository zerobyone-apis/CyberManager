import { IRepair } from '../types/Repair.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import { REPARIR_ROUTE, PUT_ENDPOIT } from '../types/Routes.type';

export default class ReparirActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async saveRepair(repair: IRepair) {
    try {
      // formatting
      // ..........
      let deliverydateFormat: string | null = repair.deliverydate || null;
      let repairDateFormat: string | null = repair.repairdate || null;
      //console.log('Se envio la request Update Raparation.');

      if (deliverydateFormat != null) {
        if (deliverydateFormat.indexOf('T') != -1) {
          deliverydateFormat = deliverydateFormat.split('T')[0] + ' 00:00:00';
        } else {
          deliverydateFormat = `${deliverydateFormat} 00:00:00`;
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
        clientname: repair.clientname,
        article: repair.article,
        iscanceled: false, //

        deliverydate: deliverydateFormat,
        repairdate: repairDateFormat,

        reparation: repair.reparation,
        warranty: repair.warranty,
        price: repair.price,
        replacementprice: repair.replacementprice,
        status: repair.status
      };
      await this.backend.send(
        PUT_ENDPOIT,
        data,
        `${REPARIR_ROUTE}/${repair.id}`
      );
      return repair;
    } catch (error) {
      console.error('Error guardar reparacion ->' + error);
      return null;
    }
  }
}
