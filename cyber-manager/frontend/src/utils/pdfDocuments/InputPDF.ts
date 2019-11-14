import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';

export default class InputPdf extends Styles {

  private data = {
    enterprise: {
      name: 'CyberPunk',
      location: 'Enrique Rodo 2344',
      phone: '093 333 443',
      web: 'www.coso.com',
    },
    order: {
      number: 123232,
      date: '12/12/20 12:23',
      problem: 'Pantalla rota, cambio de vidrio y carcasa',
      notes: 'pide agregarle vidrio gorilla glass 2334'
    },
    client: {
      name: 'Damian Rodriguez',
      phone: '099 999 999'
    },
    article: {
      name: 'celular',
      brand: 'Alcatel',
      model: 'P344'
    }
  }


  generateDoc() {
    this.init(30, 30);
    let doc = new jsPDF("p", "px", [this.pageSize.width, this.pageSize.heigth]);
    this.writeTitle(this.data.enterprise.name, 'center', doc);

    this.writeSmallText(this.data.enterprise.location, 'center', doc);
    this.writeSmallText(this.data.enterprise.phone, 'center', doc);
    this.writeSmallText(this.data.enterprise.web, 'center', doc);

    this.writeText('Numero de Ordern: '+this.data.order.number, 'left', doc);
    this.writeText('Fecha: ' + this.data.order.date, 'left', doc);
    
    this.writeText('Nombre del cliente: ' + this.data.client.name, 'left', doc);
    this.writeText('Telefono: ' + this.data.client.phone, 'right', doc);
    
    this.writeText('Articulo: ' + this.data.article.name, 'left', doc);
    this.writeText('Modelo: ' + this.data.article.model, 'right', doc);

    this.writeText('Marca: ' + this.data.article.brand, 'left', doc);
    
    this.writeText('Falla: ' + this.data.order.problem, 'left', doc);
    
    this.writeText('Observaciones: ' + this.data.order.notes, 'left', doc);
    
    // this.writeText('Observaciones: sdsadsad' + this.data.order.notes, 'left', doc);
    doc.text('Observaciones: sdsadsad', 400, 300, 0, -90)

    doc.save('a4 xd.pdf');
  }
}