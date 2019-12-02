import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import Pedido from '../../../../backend/src/models/pedido';
import Empresa from '../../../../backend/src/models/empresa';

export default class InputPdf extends Styles {
  generateDoc(enterprise: Empresa, order: Pedido) {
    this.init(30, 30);
    let doc = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);
    for (let i = 0; i < 2; i++) {
      // this.writeImg(enterprise.getUrlLogo, 100, 100, 'center', doc);

      this.writeText(enterprise.nombre, 12, 'center', doc);

      this.writeText(enterprise.direccion, 9, 'center', doc);
      this.writeText(enterprise.celular + '', 9, 'center', doc);
      this.writeText(enterprise.telefono + '', 9, 'center', doc);

      this.writeText('Ordern nro: ' + order.idOrden, 10, 'left', doc);
      this.writeText('Fecha: ' + order.fechaIngreso, 11, 'left', doc);

      this.writeText('', 12, 'center', doc); // space
      this.writeText(
        'Nombre del cliente: ' + order.nombreCliente,
        11,
        'left',
        doc
      );
      this.writeText('Telefono: ' + order.telCliente, 11, 'right', doc, true);

      this.writeText('Articulo: ' + order.articulo, 11, 'left', doc);
      this.writeText('Modelo: ' + order.modelo, 11, 'right', doc, true);
      this.writeText('Marca: ' + order.marca, 11, 'center', doc, true);

      this.writeText('Falla: ', 11, 'left', doc);
      this.writeText(order.fallReportada, 11, 'left', doc);
      this.writeText('', 12, 'center', doc); // space

      this.writeText('Observaciones: ', 11, 'left', doc);
      this.writeText(
        typeof order.observaciones == 'undefined' ? '' : order.observaciones,
        11,
        'left',
        doc
      );

      this.writeText('Garantia: ', 11, 'left', doc);
      this.writeText(enterprise.garantia, 11, 'left', doc);

      this.writeText('', 15, 'center', doc); // space
      this.writeText(
        'Firma del cliente:________________________________ ',
        11,
        'right',
        doc
      );

      // end
      this.drawLine(0.1, doc);
    }

    doc.save(order.fechaIngreso + '-' + order.idOrden + '.pdf');
  }
}
