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
    let doc = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);

    for (let i = 0; i < 2; i++) {

      doc.autoTable({
        didDrawCell: (data: any) => {
          if (data.section === 'head' && data.column.index === 1) {

            if (enterprise.urllogo) {
              try {
                let base64 = this.getBase64Image(document.getElementById('imageid'));
                doc.addImage(base64, 'JPEG', data.cell.x + 130, data.cell.y - 20, 40, 40)
              } catch (error) {
                console.log('error cargando imagen - cancelando inclusion');
              }
            }

          }
        },

        theme: 'plain',
        columnStyles: { 1: { halign: 'right' } },
        headStyles: { halign: 'center', textColor: 255, fillColor: 255 },
        head: [['Datos de la orden', 'Empresa info']],
        body: [
          [`Fecha: ${order.admissionDateFront}`, `${enterprise.enterprisename}`],
          [`Orden Nro: ${order.id}`, `${enterprise.location}`],
          [`Cliente: ${order.clientname}`, `Cel: ${enterprise.cellphone}`],
          ['', `Tel: ${enterprise.phone}`],
        ],
      })

      doc.autoTable({
        theme: 'grid',
        headStyles: { halign: 'center', textColor: 100, fillColor: 200 },
        bodyStyles: { halign: 'center' },
        head: [['Articulo', 'Marca', 'Modelo']],
        body: [
          [order.article, order.brand, order.model],
        ],
      })

      doc.autoTable({
        theme: 'grid',
        headStyles: { halign: 'center', textColor: 100, fillColor: 200 },
        bodyStyles: { halign: 'center' },
        head: [['Falla Reportada']],
        body: [
          [order.reportedfailure],
        ],
      })

      doc.autoTable({
        theme: 'plain',
        columnStyles: { 1: { halign: 'right' } },
        bodyStyles: { halign: 'right', textColor: 100, fillColor: 255 },
        body: [
          ['Firma del cliente:________________________________ '],
          [''],
          [{
            content: enterprise.firstmessage == undefined
              ? ''
              : enterprise.secondmessage + '', styles: { halign: 'center', fillColor: 200, textColor: 100 }
          }],
          [''], 
          ['']
        ]
      })
    }

    doc.save('Ingreso');
  }
}
