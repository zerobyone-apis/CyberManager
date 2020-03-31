import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';
import { IUserStore } from '../../types/UserStore.type';

export interface IInputPdf {
  urlLogo: string;
  enterpriseName: string;
  location: string;
  phone: string;
  cellphone: string;
  email: string;
}

export default class InputPdf extends Styles {
  generateDoc(enterprise: IEnterprise, order: IOrder, userInfo: IUserStore) {
    let doc: any = new jsPDF('p', 'px', [
      this.pageSize.width,
      this.pageSize.heigth
    ]);

    let marginTop: number = -20;
    for (let i = 0; i < 2; i++) {
      doc.autoTable({
        // We draw the Image here but we just put it on X and Y position
        // we coulnt put it into an row
        didDrawCell: (data: any) => {
          if (data.section === 'head' && data.column.index === 1) {
            if (enterprise.urllogo) {
              try {
                let base64 = this.getBase64Image(
                  document.getElementById('imageid')
                );
                doc.addImage(
                  base64,
                  'JPEG',
                  data.cell.x + 200,
                  data.cell.y + 30,
                  65,
                  65
                );
              } catch (error) {
                console.log('error cargando imagen - cancelando inclusion');
              }
            }
          }
        },

        theme: 'grid',
        showFoot: 'never',
        margin: { top: -5 },
        headStyles: {
          halign: 'center',
          textColor: 255,
          fillColor: 255
        },
        head: [['', '']], //After this columns we painter the Logo.
        body: [
          [
            {
              content: '',
              styles: {
                cellWidth: 100,
                lineWidth: 0,
                textColor: 100
              }
            },
            {
              content: enterprise.enterprisename,
              styles: {
                cellWidth: 180,
                halign: 'center',
                textColor: 100,
                fontSize: 16,
                lineWidth: 0
              }
            }
          ],
          [
            {
              content: '',
              styles: {
                cellWidth: 100,
                lineWidth: 0
              }
            },
            {
              content: enterprise.location,
              styles: {
                halign: 'center',
                textColor: 100,
                fontSize: 10,
                lineWidth: 0
              }
            }
          ],
          [
            {
              content: '',
              styles: {
                cellWidth: 100,
                lineWidth: 0
              }
            },
            {
              content: enterprise.phone,
              styles: {
                cellWidth: 100,
                fontSize: 10,
                halign: 'center',
                textColor: 100,
                lineWidth: 0
              }
            }
          ],
          [
            {
              content: `Orden de servicio: ${order.id}`,
              styles: {
                cellWidth: 100,
                textColor: 100,
                lineWidth: 1,
                lineColor: 200,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: enterprise.email,
              styles: {
                cellWidth: 100,
                fontSize: 10,
                halign: 'center',
                textColor: 100,
                lineWidth: 0
              }
            }
          ],
          [
            {
              content: `Fecha: ${order.admissionDateFront}`,
              styles: { textColor: 100, lineWidth: 1, lineColor: 200 }
            },
            {
              content: '',
              styles: {
                halign: 'center',
                lineWidth: 0
              }
            }
          ]
        ]
      });

      doc.autoTable({
        headStyles: { halign: 'center' },
        showHead: 'never',
        showFoot: 'never',
        theme: 'grid',
        head: [['', '', '', '']],
        body: [
          [
            {
              content: 'Nombre del cliente ',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.clientname,
              styles: {
                cellWidth: 150,
                lineWidth: 1,
                fontStyle: 'normal'
              }
            },
            {
              content: 'Telefono ',
              styles: {
                cellWidth: 'auto',
                lineWidth: 1,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.clientphone,
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Articulo ',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.article,
              styles: {
                lineColor: 200,
                cellWidth: 100,
                fontStyle: 'normal'
              }
            },
            {
              content: 'Modelo: ',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.model,
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Marca ',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.brand,
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 100,
                fontStyle: 'normal'
              }
            },
            {
              content: 'Serie: ',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: 'No tiene',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ]
        ]
      });

      doc.autoTable({
        headStyles: { halign: 'center' },
        showHead: 'never',
        theme: 'grid',
        head: [['', '']],
        body: [
          [
            {
              content: 'Diagnostico: ',
              styles: {
                lineColor: 200,
                cellWidth: 52,
                fontStyle: 'bolditalic',
                lineWidth: 1
              }
            },
            {
              content: order.reportedfailure,
              styles: {
                lineColor: 200,
                cellWidth: 'auto',
                fontStyle: 'bolditalic',
                lineWidth: 1
              }
            }
          ],
          [
            {
              content: 'Notas: ',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 50,
                textColor: 100,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.observations,
              styles: {
                lineColor: 200,
                lineWidth: 1,
                cellWidth: 'auto',
                textColor: 100,
                fontStyle: 'bolditalic'
              }
            }
          ]
        ]
      });

      doc.autoTable({
        theme: 'grid',
        margin: { top: -40, bottom: -30 },
        columnStyles: {
          2: { halign: 'right' }
        },
        bodyStyles: {
          lineColor: 200,
          halign: 'center',
          textColor: 50,
          fillColor: 255
        },
        body: [
          [
            {
              content: `Tecnico Responsable: ${userInfo.username}                                                  Firma: __________________________`,
              Margin: { top: -30 },
              styles: {
                cellPadding: { top: 25, left: 0, right: 0, bottom: 5 },
                lineWidth: 1,
                lineColor: 200
              }
            }
          ],
          [
            {
              content: enterprise.enterpriserules || '',
              styles: {
                lineColor: 200,
                lineWidth: 1,
                halign: 'center',
                fillColor: 255,
                textColor: 100,
                fontSize: 8
              }
            }
          ]
        ]
      });
    }

    doc.save(`${order.clientname}_${order.article}_Ingreso`);
  }
}
