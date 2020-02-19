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
        enterpriseName: enterprise.enterpriseName,
        location: enterprise.location,
        cellphone: enterprise.cellphone,
        enterpriseRules: enterprise.enterpriseRules,
        urlLogo: enterprise.urlLogo || '',
        phone: enterprise.phone,
        firstMessage: enterprise.firstMessage,
        secondMessage: enterprise.secondMessage,
        lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: enterprise.email || '',
        id: enterprise.id
      };
      const response: any = await this.backend.send(
        PUT_ENDPOIT,
        data,
        `${ENTERPRISE_ROUTE}/${enterprise.id}`
      );
      return new ResultObject(200, 'success');
    } catch (error) {
      return new ResultObject(403, 'success');
      console.error(`Error actualizando la empresa.. -> ${error.message}`);
    }
  }

  public async get(userInfo: IUserStore) {
    try {
      const response: IEnterprise = await this.backend.send(
        GET_ENDPOIT,
        undefined,
        `${ENTERPRISE_ROUTE}/${userInfo.id}`
      );
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
