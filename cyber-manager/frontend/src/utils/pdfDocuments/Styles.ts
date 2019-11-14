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

  writeSmallText(text: string, pos: { x: number, y: number } | string, doc: jsPDF) {
    doc.setFontSize(this.config.smallText.size);
    this.write(text, pos, doc);
    this.positionText.y += this.config.smallText.bottomSpace;
  }

  writeText(text: string, pos: { x: number, y: number } | string, doc: jsPDF) {
    doc.setFontSize(this.config.text.size);
    this.write(text, pos, doc);
    this.positionText.y += this.config.text.bottomSpace;
  }

  writeTitle(text: string, pos: { x: number, y: number } | string, doc: jsPDF) {
    doc.setFontSize(this.config.title.size);
    this.write(text, pos, doc);
    this.positionText.y += this.config.title.bottomSpace;
  }

  write(text: string, pos: { x: number, y: number } | string, doc: jsPDF) {
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
          coo.x = ((this.pageSize.width-this.pageSize.exededWidth) - widthText) / 2;
          break;
        case 'right':
          coo.x = ((this.pageSize.width-this.pageSize.exededWidth) - this.marginsText.width) - doc.getTextWidth(text);
          break;
        default:
          //default = left
          coo.x = this.marginsText.width;
          break;
      }
      coo.y = this.positionText.y;
      doc.text(text, coo.x, coo.y);
    } else {
      doc.text(text, pos.x, pos.y);
    }
  }
}