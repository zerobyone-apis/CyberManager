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
    let doc: any = new jsPDF('p', 'px', [this.pageSize.width, this.pageSize.heigth]);

    let marginTop: number = -15;
    for (let i = 0; i < 2; i++) {

      doc.autoTable({
        didDrawCell: (data: any) => {
          if (data.section === 'head' && data.column.index === 2) {
            if (enterprise.urllogo) {
              try {
                let base64 = this.getBase64Image(document.getElementById('imageid'));
                doc.addImage(base64, 'JPEG', data.cell.x, data.cell.y + 10, 80, 80)
              } catch (error) {
                console.log('error cargando imagen - cancelando inclusion');
              }
            }
          }
        },
        theme: 'plain',
        showFoot: 'never',
        margin: { top: marginTop },
        headStyles: { halign: 'center', textColor: 255, fillColor: 255 },
        head: [['', '', 'logo section image']],
        body: [
          [
            {
              content: '', styles: { cellWidth: 100, halign: 'center', textColor: 100 }
            },
            {
              content: enterprise.enterprisename + ' Informaticas', styles: { halign: 'center', textColor: 100, fontSize: 16 }
            },
            {
              content: '', styles: { cellWidth: 100, halign: 'right', textColor: 100 }
            },
          ],
          [
            '',
            {
              content: enterprise.location, styles: { halign: 'center', textColor: 100 }
            },
            ''
          ],
          [
            {
              content: `Orden de servicio: ${order.id}`, styles: { textColor: 100 }
            },
            {
              content: enterprise.phone, styles: { halign: 'center', textColor: 100 }
            },
            ''
          ],
          [
            {
              content: `Fecha: ${order.admissionDateFront}`, styles: { textColor: 100 }
            },
            {
              content: enterprise.email, styles: { halign: 'center', textColor: 100 }
            },
            ''
          ],
        ],
      })

      doc.autoTable({
        headStyles: { halign: 'center' },
        showHead: 'never',
        showFoot: 'never',
        theme: 'grid',
        head: [['', '']],
        body: [
          [`Nombre del cliente: ${order.clientname}`, `Telefono: ${order.clientphone}`],
          [`Articulo: ${order.article}`, `Modelo: ${order.model}`],
          [`Marca: ${order.brand}`, `Serie: No tiene`],
        ],
      })


      doc.autoTable({
        headStyles: { halign: 'center' },
        showHead: 'never',
        theme: 'grid',
        head: [['', '']],
        body: [
          [
            {
              content: 'Problema Reportado: ', styles: { cellWidth: 50, textColor: 100 }
            },
            order.reportedfailure],
          [
            {
              content: 'Notas: ', styles: { cellWidth: 50, textColor: 100 }
            },
            order.observations],
        ],
      })


      doc.autoTable({
        theme: 'plain',
        margin: { top: -15, bottom: -30 },
        columnStyles: { 1: { halign: 'right' } },
        bodyStyles: { halign: 'right', textColor: 100, fillColor: 255 },
        body: [
          ['Firma del cliente:________________________________ '],
          [''],
          [{
            content: enterprise.firstmessage == undefined
              ? ''
              : enterprise.secondmessage + '', styles: { halign: 'center', fillColor: 240, textColor: 100 }
          }],
        ]
      })

      marginTop = -40;
    }


    doc.save('Ingreso');
  }
}
