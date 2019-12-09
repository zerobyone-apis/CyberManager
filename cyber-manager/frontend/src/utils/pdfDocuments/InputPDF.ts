import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import Pedido from '../../../../backend/src/models/pedido';
import Empresa from '../../../../backend/src/models/empresa';

export default class InputPdf extends Styles {
  generateDoc(enterprise: Empresa, order: Pedido) {
    this.init(30, 0);
    let doc = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);
    for (let i = 0; i < 2; i++) {
      // size of all fonts in this document
      let fontSize = 8;

      // end
      this.drawLine(0.1, doc);

      this.insertImage(typeof enterprise.urlLogo == 'undefined' ? '' : enterprise.urlLogo, 30, 30, doc)

      this.writeText(enterprise.nombre, fontSize, 'center', doc);

      this.writeText(enterprise.direccion, fontSize, 'center', doc);
      this.writeText(enterprise.celular + '', fontSize, 'center', doc);
      this.writeText(enterprise.telefono + '', fontSize, 'center', doc);

      this.writeText('Ordern nro: ' + order.idOrden, fontSize, 'left', doc);
      this.writeText('Fecha: ' + order.fechaIngreso, fontSize, 'left', doc);

      // this.writeText('', 12, 'center', doc); // space
      this.writeText(
        'Nombre del cliente: ' + order.nombreCliente,
        fontSize,
        'left',
        doc
      );
      this.writeText('Telefono: ' + order.telCliente, fontSize, 'right', doc, true);

      this.drawLine(0.1, doc);

      this.writeText('Articulo: ' + order.articulo, fontSize, 'left', doc);
      this.writeText('Modelo: ' + order.modelo, fontSize, 'right', doc, true);
      this.writeText('Marca: ' + order.marca, fontSize, 'center', doc, true);

      this.drawLine(0.1, doc);

      this.writeText('Falla: ', fontSize + 2, 'left', doc);
      this.writeText(order.fallReportada, fontSize, 'left', doc);
      // this.writeText('', 12, 'center', doc); // space

      this.writeText('Observaciones: ', fontSize + 2, 'left', doc);

      this.writeText(
        typeof order.observaciones == 'undefined' ? '' : order.observaciones,
        fontSize,
        'left',
        doc
      );

      this.writeText('Garantia: ', fontSize + 2, 'left', doc);
      this.writeText(enterprise.garantia, fontSize, 'left', doc);

      this.writeText('', 15, 'center', doc); // space

      this.writeText(
        'Firma del cliente:________________________________ ',
        fontSize,
        'right',
        doc
      );

      this.writeText('', 30, 'center', doc); // space

      this.writeText(enterprise.primerMsjRecibo == undefined ? '' : enterprise.primerMsjRecibo, 7, 'left', doc);

    }

    doc.save(order.fechaIngreso + '-' + order.idOrden + '.pdf');
  }
}
