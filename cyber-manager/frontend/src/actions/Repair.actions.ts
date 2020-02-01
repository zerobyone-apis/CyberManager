import { IRepair } from '../types/Repair.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import { REPARIR_ROUTE, PUT_ENDPOIT } from '../types/Routes.type'; 

export default class ReparirActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async saveRepair(repair: IRepair) {
    try {
      console.log(repair.deliverDate, repair.repairDate);

      // formatting
      // ..........
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
        replacementPrice: repair.replacementPrice,
        status: repair.status
      };
      const response: any = await this.backend.send(
        PUT_ENDPOIT,
        data,
        `${REPARIR_ROUTE}/${repair.id}`
      );
      return repair;
    } catch (error) {
      return null;
      console.error('Error guardar reparacion ->' + error);
    }
  }
}
