import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';

export interface IInputPdf {
  urlLogo: string,
  enterpriseName: string,
  location: string,
  phone: string,
  cellphone: string
}

export default class InputPdf extends Styles {

  generateDoc(enterprise: IEnterprise, order: IOrder) {
    this.init(30, 0);
    let doc = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);
    for (let i = 0; i < 2; i++) {
      // size of all fonts in this document
      let fontSize = 8;

      // end
      this.drawLine(0.1, doc);

      if (enterprise.urlLogo) {
        try {
          let base64 = this.getBase64Image(document.getElementById("imageid"));
          this.insertImage(base64, 30, 30, doc)
        } catch (error) {
          console.log('error cargando imagen - cancelando inclusion')
        }
      }

      this.writeText(enterprise.enterpriseName, fontSize, 'center', doc);

      this.writeText(enterprise.location, fontSize, 'center', doc);
      this.writeText(enterprise.cellphone + '', fontSize, 'center', doc);
      this.writeText(enterprise.phone + '', fontSize, 'center', doc);

      this.writeText('Ordern nro: ' + order.id, fontSize, 'left', doc);
      this.writeText('Fecha: ' + order.admissionDate, fontSize, 'left', doc);

      this.writeText(
        'Nombre del cliente: ' + order.clientName,
        fontSize,
        'left',
        doc
      );
      this.writeText('Telefono: ' + order.clientPhone, fontSize, 'right', doc, true);

      this.drawLine(0.1, doc);

      this.writeText('Articulo: ' + order.article, fontSize, 'left', doc);
      this.writeText('Modelo: ' + order.model, fontSize, 'right', doc, true);
      this.writeText('Marca: ' + order.brand, fontSize, 'center', doc, true);

      this.drawLine(0.1, doc);

      this.writeText('Falla: ', fontSize + 2, 'left', doc);
      this.writeText(order.reportedFailure, fontSize, 'left', doc);

      this.writeText('Observaciones: ', fontSize + 2, 'left', doc);

      this.writeText(
        typeof order.observations == 'undefined' ? '' : order.observations,
        fontSize,
        'left',
        doc
      );

      // this.writeText('Garantia: ', fontSize + 2, 'left', doc);
      // this.writeText(enterprise.garantia, fontSize, 'left', doc);

      this.writeText('', 15, 'center', doc); // space

      this.writeText(
        'Firma del cliente:________________________________ ',
        fontSize,
        'right',
        doc
      );

      this.writeText('', 30, 'center', doc); // space

      this.writeText(enterprise.firstMessage == undefined ? '' : enterprise.secondMessage + '', 7, 'left', doc);

    }

    doc.save(order.admissionDate + '-' + order.id + '.pdf');
  }
}
