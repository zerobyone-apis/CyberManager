import vue from 'vue';
import jsPDF from 'jspdf';
import Styles from './Styles';
import { IOrder } from '../../types/Order.type';
import { IEnterprise } from '../../types/Enterprise.type';
import { PDF_HEIGHT, PDF_WIDTH, PDF_DIFF } from '../../types/PDF.type'

export default class InputPdf {

  async generateDoc(captureInvoice: any) {
    const DIFF_DOC: number = 150;

    let doc = new jsPDF('p', 'px', [PDF_WIDTH, PDF_HEIGHT]);
    
    doc.addImage(captureInvoice, 'jpg', 0, 0, PDF_WIDTH-PDF_DIFF, PDF_HEIGHT-PDF_DIFF);

    doc.text('.', 0, 50)
    doc.text('.', (PDF_WIDTH - DIFF_DOC), 50)
    doc.save('Factura entrada.pdf');
  }
}
