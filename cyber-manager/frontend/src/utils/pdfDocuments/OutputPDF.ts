import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';
import { IRepair } from '@/types/Repair.type';

export default class OutputPdf extends Styles {
  generateDoc(enterprise: IEnterprise, order: IOrder, repair: IRepair) {
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

      this.writeText('Problema reportado: ', fontSize + 2, 'left', doc);
      this.writeText(order.reportedFailure || '', fontSize, 'left', doc);

      // this.writeText('Repuesto: ', fontSize + 2, 'left', doc);
      // this.writeText((order.reparacion || ''), fontSize, 'left', doc);

      this.writeText('Reparacion: ', fontSize + 2, 'left', doc);
      this.writeText((order.reparation || ''), fontSize, 'left', doc);

      this.writeText('Garantia: ', fontSize + 2, 'left', doc);
      this.writeText(repair.warranty || '', fontSize, 'left', doc);


      this.drawLine(0.1, doc);
      this.writeText('Total a pagar: ' + order.price, fontSize + 2, 'left', doc);
      this.drawLine(0.1, doc);

      this.writeText('', 10, 'center', doc); // space

      this.writeText(
        'Firma del responsable:________________________________ ',
        fontSize,
        'left',
        doc
      );

      this.writeText(
        'Firma del cliente:________________________________ ',
        fontSize,
        'right',
        doc,
        true
      );

      this.writeText('', 20, 'center', doc); // space

      this.writeText((enterprise.secondMessage || ''), 7, 'left', doc);

    }

    doc.save(order.deliverDate + '-' + order.id + '.pdf');
  }
}
 