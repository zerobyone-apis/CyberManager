import { IEnterprise } from '../types/Enterprise.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import Datetime from '../utils/DateTime';
import { IUserStore } from '@/types/UserStore.type';
import ResultObject from '../../../backend/src/utils/ResultObject';

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
        lastUpdate: new Datetime().convertDatetime(new Datetime().now() || ''),
        email: enterprise.email || '',
        id: enterprise.id
      };
      const response: any = await this.backend.send(
        'put',
        data,
        `/empresa/${enterprise.id}`
      );
      return new ResultObject(200, 'success');
    } catch (error) {
      return new ResultObject(403, 'success');
      console.error(`Error actualizando la empresa.. -> ${error.message}`);
    }
  }

  public async get(userInfo: IUserStore) {
    console.log(userInfo);
    try {
      const response: IEnterprise = await this.backend.send(
        'get',
        undefined,
        `/empresa/${userInfo.id}`
      );
      return response;
    } catch (error) {
      return null;
      console.error(
        'Algo sucedio obteniendo los datos de la empresa observe -> ',
        error
      );
    }
  }
}
