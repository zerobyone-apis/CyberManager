import { IEnterprise } from '../types/Enterprise.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import moment from 'moment';
import { IUserStore } from '@/types/UserStore.type';
import ResultObject from '../utils/ResultObject';
import {
  ENTERPRISE_ROUTE,
  PUT_ENDPOIT,
  GET_ENDPOIT
} from '../types/Routes.type';

export default class EnterpriseActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  public async save(enterprise: IEnterprise) {
    try {
      let data: IEnterprise = {
        enterprisename: enterprise.enterprisename,
        location: enterprise.location,
        cellphone: enterprise.cellphone,
        enterpriserules: enterprise.enterpriserules,
        urllogo: enterprise.urllogo || '',
        phone: enterprise.phone,
        firstmessage: enterprise.firstmessage,
        secondmessage: enterprise.secondmessage,
        lastupdate: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: enterprise.email || '',
        id: enterprise.id
      };
      const response: any = await this.backend.send(
        PUT_ENDPOIT,
        data,
        `${ENTERPRISE_ROUTE}/${enterprise.id}`
      );
      //console.log('Response Empresa creada -> ', response);
      return new ResultObject(200, 'success');
    } catch (error) {
      console.error(`Error actualizando la empresa.. -> ${error.message}`);
      return new ResultObject(403, 'success');
    }
  }

  public async get(userInfo: IUserStore) {
    try {
      const response: IEnterprise = await this.backend.send(
        GET_ENDPOIT,
        undefined,
        `${ENTERPRISE_ROUTE}/${userInfo.id}`
      );
      //console.log('Response Empresa encontrada -> ', response);
      return response;
    } catch (error) {
      console.error(
        'Algo sucedio obteniendo los datos de la empresa observe -> ',
        error
      );
      return null;
    }
  }
}
