import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import Empresa from '@/models/Empresa';
import Order from '@/models/Order';
import Pedido from '@/models/pedido';

export default class InputPdf extends Styles {

  generateDoc(enterprise: Empresa, order: Pedido) {
    this.init(30, 30);
    let doc = new jsPDF("p", "px", [this.pageSize.width, this.pageSize.heigth]);
    for (let i = 0; i < 2; i++) {

      // this.writeImg(enterprise.getUrlLogo, 100, 100, 'center', doc);

      this.writeText(enterprise.getNombre, 12, 'center', doc);

      this.writeText(enterprise.getDireccion, 9, 'center', doc);
      this.writeText(enterprise.getCelular + '', 9, 'center', doc);
      this.writeText(enterprise.getTelefono + '', 9, 'center', doc);

      this.writeText('Ordern nro: ' + order.getIdOrden, 10, 'left', doc)
      this.writeText('Fecha: ' + order.getFechaIngreso, 11, 'left', doc);

      this.writeText('', 12, 'center', doc); // space
      this.writeText('Nombre del cliente: ' + order.getNombreCliente, 11, 'left', doc);
      this.writeText('Telefono: ' + order.getTelCliente, 11, 'right', doc, true);

      this.writeText('Articulo: ' + order.getArticulo, 11, 'left', doc);
      this.writeText('Modelo: ' + order.getModelo, 11, 'right', doc, true);
      this.writeText('Marca: ' + order.getMarca, 11, 'center', doc, true);

      this.writeText('Falla: ', 11, 'left', doc);
      this.writeText(order.getFallReportada, 11, 'left', doc);
      this.writeText('', 12, 'center', doc); // space

      this.writeText('Observaciones: ', 11, 'left', doc);
      this.writeText(order.getObservaciones, 11, 'left', doc);

      this.writeText('Garantia: ', 11, 'left', doc);
      this.writeText(enterprise.getGarantia, 11, 'left', doc);

      this.writeText('', 15, 'center', doc); // space
      this.writeText('Firma del cliente:________________________________ ', 11, 'right', doc);

      // end
      this.drawLine(0.1, doc);
    }

    doc.save(order.getFechaIngreso + '-' + order.getIdOrden + '.pdf');
  }
}