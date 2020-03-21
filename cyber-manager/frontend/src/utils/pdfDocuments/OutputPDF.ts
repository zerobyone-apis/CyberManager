import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';
import { IRepair } from '@/types/Repair.type';

export default class OutputPdf extends Styles {

  private colors = {
    header: [171, 224, 233]
  }

  generateDoc(enterprise: IEnterprise, order: IOrder, repair: IRepair) {

    let doc: any = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);

    for (let i = 0; i < 1; i++) {
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
        headStyles: { halign: 'center', textColor: 100, fillColor: this.colors.header },
        bodyStyles: { halign: 'center' },
        head: [['Articulo', 'Marca', 'Modelo']],
        body: [
          [order.article, order.brand, order.model],
        ],
      })

      doc.autoTable({
        theme: 'grid',
        headStyles: { halign: 'center', textColor: 100, fillColor: this.colors.header },
        bodyStyles: { halign: 'center' },
        head: [['Falla Reportada']],
        body: [
          [order.reportedfailure],
        ],
      })

      doc.autoTable({
        theme: 'grid',
        headStyles: { halign: 'center', textColor: 100, fillColor: this.colors.header },
        bodyStyles: { halign: 'left' },
        head: [['Reparacion']],
        body: [
          [order.reparation],
        ],
      })

      doc.autoTable({
        theme: 'grid',
        headStyles: { halign: 'center', textColor: 100, fillColor: this.colors.header },
        bodyStyles: { halign: 'center' },
        head: [['Garantia']],
        body: [
          [order.warranty],
        ],
      })


      doc.autoTable({
        theme: 'plain',
        columnStyles: { 1: { halign: 'right' } },
        bodyStyles: { halign: 'right', textColor: 100, fillColor: 255 },
        body: [
          [{
            content: `Total: $${order.price}`, styles: { fontSize: 18, halign: 'left', fillColor: 255, textColor: 100, lineColor: 255 }
          }, ''],
          ['', ''],
          [
            {
              content: `Firma del cliente:__________________________`, styles: { halign: 'left' }
            },
            {
              content: `Firma del Tecnico:__________________________`, styles: { halign: 'right' }
            }
          ]
        ]
      })

      doc.autoTable({
        theme: 'plain',
        columnStyles: { 1: { halign: 'right' } },
        bodyStyles: { halign: 'right', textColor: 100, fillColor: 255 },
        body: [
          [{
            content: enterprise.firstmessage == undefined
              ? ''
              : enterprise.secondmessage + '', styles: { halign: 'center', textColor: 100, fillColor: 255 }
          }],
        ]
      })


    }

    doc.save('Salida');
    //doc.autoPrint();
    //This is a key for printing
    //doc.output('dataurlnewwindow');
  }
}
