import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';
import { IRepair } from '@/types/Repair.type';

export default class OutputPdf extends Styles {
  generateDoc(enterprise: IEnterprise, order: IOrder, repair: IRepair) {
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
      this.drawVerticalLinesItemsOutput(doc);
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
      this.writeText('', 2, 'center', doc);
      this.drawLine(0.1, doc);

      this.writeText('  Articulo: ' + order.article, fontSize, 'left', doc);
      this.writeText(
        'Modelo: ' + order.model + '  ',
        fontSize,
        'right',
        doc,
        true
      );
      this.writeText(
        ' Marca: ' + order.brand + '  ',
        fontSize,
        'center',
        doc,
        true
      );

      this.drawLine(0.1, doc);

      this.writeText('  Falla Reportada: ', fontSize + 2, 'left', doc);
      this.drawLine(0.1, doc);
      this.writeText(
        ' - ' + order.reportedfailure || '',
        fontSize,
        'left',
        doc
      );
      this.writeText('', 5, 'center', doc);

      this.drawLine(0.2, doc);
      this.writeText('  Reparacion: ', fontSize + 2, 'left', doc);
      this.drawLine(0.1, doc);
      this.writeText(' - ' + order.reparation || '', fontSize, 'left', doc);
      this.writeText('', 5, 'center', doc);

      this.drawLine(0.2, doc);
      this.writeText(' Garantia: ', fontSize + 2, 'center', doc);
      this.drawLine(0.1, doc);
      this.writeText(repair.warranty || '', fontSize, 'center', doc);

      this.drawLine(0.1, doc);
      this.writeText(
        '  Total a pagar: ' + order.price,
        fontSize + 3,
        'left',
        doc
      );
      this.drawLine(0.1, doc);

      this.writeText('', 5, 'center', doc); // space

      this.writeText(
        'Firma de Cliente:________________',
        fontSize,
        'left',
        doc
      );

      this.writeText(
        'Firma de Tecnico:________________ ',
        fontSize,
        'right',
        doc,
        true
      );

      this.writeText('', 5, 'center', doc); // space
      this.writeText(enterprise.secondmessage || '', 8, 'center', doc);
      this.drawLine(0.1, doc);
      this.writeText('', 5, 'center', doc); // space
    }
    doc.save(order.deliverydate + '-' + order.id + '.pdf');
  }
}
