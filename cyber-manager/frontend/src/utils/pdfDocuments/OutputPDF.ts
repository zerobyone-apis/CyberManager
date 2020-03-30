import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IEnterprise } from '../../types/Enterprise.type';
import { IOrder } from '../../types/Order.type';
import { IRepair } from '@/types/Repair.type';
import { IUserStore } from '@/types/UserStore.type';

export default class OutputPdf extends Styles {
  private colors = {
    header: [171, 224, 233]
  };

  generateDoc(
    enterprise: IEnterprise,
    order: IOrder,
    repair: IRepair,
    userInfo: IUserStore
  ) {
    let doc: any = new jsPDF('p', 'px', [
      this.pageSize.width,
      this.pageSize.heigth
    ]);
    let marginTop: number = 10;
    for (let i = 0; i < 1; i++) {
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
        margin: { top: marginTop },
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
                lineWidth: 0
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
              styles: { textColor: 100, lineWidth: 1 }
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
                cellWidth: 80,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.clientname,
              styles: {
                cellWidth: 150,
                fontStyle: 'normal'
              }
            },
            {
              content: 'Telefono ',
              styles: {
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.clientphone,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Articulo ',
              styles: {
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.article,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            },
            {
              content: 'Modelo: ',
              styles: {
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.model,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Marca ',
              styles: {
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.brand,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            },
            {
              content: 'Serie: ',
              styles: {
                cellWidth: 'auto',
                fontStyle: 'bolditalic'
              }
            },
            {
              content: 'No tiene',
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Diagnostico: ',
              styles: {
                cellWidth: 52,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.reportedfailure,
              colSpan: 3,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Reparacion: ',
              styles: {
                cellWidth: 52,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.reparation,
              colSpan: 3,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ],
          [
            {
              content: 'Garantia: ',
              styles: {
                cellWidth: 50,
                textColor: 100,
                fontStyle: 'bolditalic'
              }
            },
            {
              content: order.warranty ? order.warranty : '',
              colSpan: 3,
              styles: {
                cellWidth: 100,
                fontStyle: 'normal'
              }
            }
          ]
        ]
      });

      doc.autoTable({
        theme: 'grid',
        columnStyles: { 1: { halign: 'right' } },
        bodyStyles: {
          halign: 'right',
          textColor: 100,
          fillColor: 255
        },
        showHead: 'never',
        head: [['', '', '', '']],
        body: [
          [
            {
              content: `Total a Pagar: $${order.price}`,
              styles: {
                fontSize: 12,
                halign: 'center',
                cellWidth: 100,
                fontStyle: 'bolditalic',
                fillColor: 255,
                textColor: 100,
                lineWidth: 1
              }
            },
            {
              content: '',
              styles: {
                fontSize: 12,
                cellWidth: 120,
                halign: 'left',
                fillColor: 255,
                textColor: 100,
                lineWidth: 0
              }
            },
            {
              content: `Tecnico Responsable: `,
              styles: {
                fontSize: 10,
                cellWidth: 90,
                halign: 'left',
                fillColor: 255,
                lineWidth: 0
              }
            },
            {
              content: userInfo.username,
              styles: {
                fontSize: 10,
                halign: 'left',
                fillColor: 255,
                lineWidth: 0
              }
            }
          ],
          [
            {
              content: `Firma del cliente:______________________            Firma del Tecnico:______________________`,
              Margin: { top: -40 },
              colSpan: 4,
              styles: {
                halign: 'center',
                cellPadding: { top: 25, left: 0, right: 0, bottom: 5 },
                lineWidth: 1
              }
            },
            ''
          ],
          [
            {
              content:
                enterprise.enterpriserules || '',
              colSpan: 4,
              styles: {
                halign: 'center',
                fillColor: 255,
                textColor: 100,
                lineWidth: 1
              }
            }
          ]
        ]
      });
    }

    doc.save(`${order.clientname}_${order.article}_Salida`);
    //doc.autoPrint();
    //This is a key for printing
    //doc.output('dataurlnewwindow');
  }
}
