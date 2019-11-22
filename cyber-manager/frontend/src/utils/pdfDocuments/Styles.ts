import jsPDF from 'jspdf';

export default class Styles {

  // dimensions of a page a4 = 595 x 842
  // but i do not why only accept 445 x 842
  pageSize = {
    width: 595, // medida de la hoja 
    heigth: 842,
    exededWidth: 155, // width - exededWidth = medida real de uso para escritura 
  }

  private config = {
    title: {
      size: 14,
      bottomSpace: 20
    },
    text: {
      size: 12,
      bottomSpace: 15
    },
    smallText: {
      size: 10,
      bottomSpace: 10
    },
  }

  // actual position of the text in the document
  private positionText = {
    x: 0,
    y: 0
  }

  private marginsText = {
    width: 0,
    heigth: 0,
  }

  // funtion specify padding of the text
  init(marginX: number, marginY: number) {
    this.positionText.x = marginX;
    this.positionText.y = marginY;
    this.marginsText.width = marginX;
    this.marginsText.heigth = marginY;
  }

  // methods of draw

  writeText(text: string, fontSize: number, pos: { x: number, y: number } | string, doc: jsPDF, inline?: boolean | undefined) {
    doc.setFontSize(fontSize);
    if (!inline) {
      this.positionText.y += fontSize + 5;
    }
    this.write(text, pos, doc, false);
  }

  writeRectText(text: string, fontSize: number, pos: { x: number, y: number } | string, doc: jsPDF, inline?: boolean | undefined) {
    doc.setFontSize(fontSize);
    if (!inline) {
      this.positionText.y += fontSize + 5;
    }
    // doc.setFillColor( 213, 213, 213 );
    this.write(text, pos, doc, true);
  }

  drawLine(fontSize: number, doc: jsPDF) {
    doc.setFontSize(fontSize);
    // doc.setFillColor( 213, 213, 213 );
    this.positionText.y += 15;
    doc.rect(this.marginsText.width, this.positionText.y, (this.pageSize.width-this.pageSize.exededWidth-this.marginsText.width*2), 0.5) //Fill and Border
  }

  write(text: string, pos: { x: number, y: number } | string, doc: jsPDF, rect?: boolean | undefined) {
    if (typeof (pos) == 'string') {
      let coo = {
        x: -1,
        y: -1
      }
      // properties position
      switch (pos) {
        case 'left':
          coo.x = this.marginsText.width;
          break;
        case 'center':
          let widthText = doc.getTextWidth(text);
          coo.x = ((this.pageSize.width - this.pageSize.exededWidth) - widthText) / 2;
          break;
        case 'right':
          coo.x = ((this.pageSize.width - this.pageSize.exededWidth) - this.marginsText.width) - doc.getTextWidth(text);
          break;
        default:
          //default = left
          coo.x = this.marginsText.width;
          break;
      }
      coo.y = this.positionText.y;
      doc.text(text, coo.x, coo.y);
      if (rect) {
        doc.rect(coo.x-1, (coo.y-doc.getLineHeight()+3), doc.getTextWidth(text)+2, doc.getLineHeight()-2) //Fill and Border
      }
    } else {
      doc.text(text, pos.x, pos.y);
      if (rect) {
        doc.rect(pos.x-1, (pos.y-doc.getLineHeight()+3), doc.getTextWidth(text)+2, doc.getLineHeight()-2) //Fill and Border
      }
    }
  }
}