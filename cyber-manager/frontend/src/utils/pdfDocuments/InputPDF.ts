import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';

export interface IInputPdf {
  urlLogo: string;
  enterpriseName: string;
  location: string;
  phone: string;
  cellphone: string;
}

export default class InputPdf extends Styles {
  generateDoc(enterprise: IEnterprise, order: IOrder) {
    this.init(80, 40);
    let doc = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);
    for (let i = 0; i < 2; i++) {
      // size of all fonts in this document
      let fontSize = 8;

      if (enterprise.urllogo) {
        try {
          let base64 = this.getBase64Image(document.getElementById('imageid'));
          this.insertImage(base64, 40, 40, doc);
        } catch (error) {
          console.log('error cargando imagen - cancelando inclusion');
        }
      }

      // DRAW LINES ON THE PDF CONTENT
      this.drawVerticalLinePrincipal(doc);
      this.drawVerticalLinesItemsInput(doc);
      // END DRAW LINES

      this.writeText(
        'Fecha: ' + order.admissionDateFront,
        fontSize + 2,
        'left',
        doc
      );
      this.writeText(
        enterprise.enterprisename,
        fontSize + 2,
        'right',
        doc,
        true
      );
      this.writeText('Ordern N°: ' + order.id, fontSize + 2, 'left', doc);
      this.writeText(enterprise.location, fontSize, 'right', doc, true);
      this.writeText(
        'Nombre del cliente: ' + order.clientname,
        fontSize + 2,
        'left',
        doc
      );
      this.writeText(
        'Cel: ' + enterprise.cellphone + '',
        fontSize,
        'right',
        doc,
        true
      );
      this.writeText('Tel: ' + enterprise.phone + '', fontSize, 'right', doc);
      this.writeText('', 5, 'center', doc);

      this.drawLine(0.1, doc);
      this.writeText(' Articulo: ' + order.article, fontSize + 2, 'left', doc);
      this.writeText(
        'Modelo: ' + order.model + '  ',
        fontSize + 2,
        'right',
        doc,
        true
      );
      this.writeText(
        ' Marca: ' + order.brand,
        fontSize + 2,
        'center',
        doc,
        true
      );

      this.drawLine(0.1, doc);
      this.writeText(' Falla Reportada: ', fontSize + 2, 'left', doc);
      this.drawLine(0.1, doc);
      this.writeText(' - ' + order.reportedfailure, fontSize, 'left', doc);
      this.writeText('', 20, 'left', doc);
      this.drawLine(0.1, doc);
      //Observations
      this.writeText(' Observaciones: ', fontSize + 2, 'left', doc);
      this.drawLine(0.1, doc);
      this.writeText(
        typeof order.observations == 'undefined'
          ? ''
          : ' - ' + order.observations,
        fontSize,
        'left',
        doc
      );
      this.writeText('', 15, 'left', doc); // space
      this.drawLine(0.1, doc);
      this.writeText('', 5, 'left', doc); // space
      this.writeText(
        'Firma del cliente:________________________________ ',
        fontSize,
        'right',
        doc
      );
      this.writeText('', 10, 'left', doc);
      this.writeText(
        enterprise.firstmessage == undefined
          ? ''
          : enterprise.secondmessage + '',
        7,
        'center',
        doc
      );
      this.writeText('', 5, 'left', doc);
      this.drawLine(0.1, doc);
      this.writeText('', 5, 'left', doc);
    }
    doc.save(order.admissiondate + '-' + order.id + '.pdf');
  }
}
