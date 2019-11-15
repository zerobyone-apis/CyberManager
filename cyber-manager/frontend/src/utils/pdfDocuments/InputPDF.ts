import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';

export default class InputPdf extends Styles {
  
  generateDoc(data: any) {
    this.init(30, 30);
    let doc = new jsPDF("p", "px", [this.pageSize.width, this.pageSize.heigth]);
    this.writeText(data.enterprise.name, 14, 'center', doc);

    this.writeText(data.enterprise.location, 10, 'center', doc);
    this.writeText(data.enterprise.phone, 10, 'center', doc);
    this.writeText(data.enterprise.web, 10, 'center', doc);

    this.writeRectText('Numero de Ordern: ' + data.order.number, 12, 'left', doc)
    this.writeText('Fecha: ' + data.order.date, 12, 'left', doc);

    this.writeText('', 14, 'center', doc); // space
    this.writeText('Nombre del cliente: ' + data.client.name, 12, 'left', doc);
    this.writeText('Telefono: ' + data.client.phone, 12, 'right', doc, true);
    
    this.drawLine(0.5, doc);

    this.writeText('Articulo: ' + data.article.name, 12, 'left', doc);
    this.writeText('Modelo: ' + data.article.model, 12, 'right', doc, true);
    this.writeText('Marca: ' + data.article.brand, 12, 'center', doc, true);

    this.drawLine(0.5, doc);
    this.writeText('Falla: ', 12, 'left', doc);
    this.writeText(data.order.problem, 12, 'left', doc);
    this.writeText('', 14, 'center', doc); // space
    
    this.writeText('Observaciones: ', 12, 'left', doc);
    this.writeText(data.order.notes, 12, 'left', doc);

    this.writeText('', 20, 'center', doc); // space
    this.writeText('Firma del cliente:________________________________ ', 12, 'right', doc);
    
    doc.save('a4 xd.pdf');
  }
}