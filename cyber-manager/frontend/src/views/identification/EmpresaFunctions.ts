import vue from 'vue';
import Empresa from '../../../../backend/src/models/empresa';
import { EmpresaInterface } from '../../../../backend/src/interface/EmpresaInterface';
import IntegrationBackend from '../../utils/IntegrationBackend';

export default class EmpresaFunctions extends vue {

  public data: Empresa = new Empresa();
  private backend: IntegrationBackend = new IntegrationBackend();

  public async save() {
    try {
      let data = {
        nombre: this.data.nombre,
        direccion: this.data.direccion,
        celular: this.data.celular,
        email: this.data.email,
        garantia: this.data.garantia,
        urlLogo: this.data.urlLogo,
        telefono: this.data.telefono,
        primerMsjRecibo: this.data.primerMsjRecibo,
        segundoMsjRecibo: this.data.segundoMsjRecibo
      }
      // Integration Backend PUT orders send()
      const response: any = await this.backend.send(
        'put',
        data,
        `/empresa/${this.data.idEmpresa}`
      );
      console.log(response);
      /* Message success */
      alert(' Empresa Actualizada exitosamente!..');
    } catch (error) {
      console.error(`Error actualizando la empresa.. -> ${error.message}`);
    }
  }

  public async get(userInfo: any) {
    try {
      // Integration Backend Get Empresa By idUser send() Only supervisor can be founded.
      const response: EmpresaInterface = await this.backend.send(
        'get',
        undefined,
        `/empresa/${userInfo.id}`
      );
      let empresaInfo = {
        idEmpresa: response.idEmpresa,
        garantia: response.garantia,
        tecnico: response.username ? response.username : userInfo.username
      };
      // save in the store the empresaInfo data
      // this.$store.commit('empresaInfo', empresaInfo);
      Object.assign(this.data, response);
    } catch (error) {
      console.error(
        'Algo sucedio obteniendo los datos de la empresa observe -> ',
        error.message
      );
    }
  }

}