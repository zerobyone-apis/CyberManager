import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import Pedido from '../../../../backend/src/models/pedido';
import Empresa from '../../../../backend/src/models/empresa';

export default class OutputPdf extends Styles {
  generateDoc(enterprise: Empresa, order: Pedido) {
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

      this.writeText(enterprise.nombre, fontSize, 'center', doc);

      this.writeText(enterprise.direccion, fontSize, 'center', doc);
      this.writeText(enterprise.celular + '', fontSize, 'center', doc);
      this.writeText(enterprise.telefono + '', fontSize, 'center', doc);

      this.writeText('Ordern nro: ' + order.idOrden, fontSize, 'left', doc);
      this.writeText('Fecha: ' + order.fechaEntrega, fontSize, 'left', doc);

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

      this.writeText('Problema reportado: ', fontSize + 2, 'left', doc);
      this.writeText(order.fallReportada || '', fontSize, 'left', doc);

      // this.writeText('Repuesto: ', fontSize + 2, 'left', doc);
      // this.writeText((order.reparacion || ''), fontSize, 'left', doc);

      this.writeText('Reparacion: ', fontSize + 2, 'left', doc);
      this.writeText((order.reparacion || ''), fontSize, 'left', doc);

      this.writeText('Garantia: ', fontSize + 2, 'left', doc);
      this.writeText(enterprise.garantia, fontSize, 'left', doc);


      this.drawLine(0.1, doc);
      this.writeText('Total a pagar: ' + order.precio, fontSize + 2, 'left', doc);
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

      this.writeText((enterprise.segundoMsjRecibo || ''), 7, 'left', doc);

    }

    doc.save(order.fechaEntrega + '-' + order.idOrden + '.pdf');
  }
}
