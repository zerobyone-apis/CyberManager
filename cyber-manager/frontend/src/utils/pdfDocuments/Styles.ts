import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default class Styles {
  // dimensions of a page a4 = 595 x 842
  // but i do not why only accept 445 x 842
  pageSize = {
    width: 595, // medida de la hoja
    heigth: 842,
    exededWidth: 155 // width - exededWidth = medida real de uso para escritura
  };

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
    }
  };

  // actual position of the text in the document
  private positionText = {
    x: 0,
    y: 0
  };

  private marginsText = {
    width: 0,
    heigth: 0
  };

  // funtion specify padding of the text
  init(marginX: number, marginY: number) {
    this.positionText.x = marginX;
    this.positionText.y = marginY;
    this.marginsText.width = marginX;
    this.marginsText.heigth = marginY;
  }

  // methods of draw
  insertImage(img: any, width: number, height: number, doc: jsPDF) {
    let cooX =
      this.pageSize.width -
      this.pageSize.exededWidth -
      (width + this.marginsText.width + 20);
    doc.addImage(img, 'jpg', cooX, this.positionText.y, width, height);
    this.positionText.y += height + 5;
  }

  writeText(
    text: string,
    fontSize: number,
    pos: { x: number; y: number } | string,
    doc: jsPDF,
    inline?: boolean | undefined
  ) {
    doc.setFontSize(fontSize);
    if (!inline) {
      this.positionText.y += fontSize + 2;
    }
    this.write(text, pos, doc, false);
  }

  writeRectText(
    text: string,
    fontSize: number,
    pos: { x: number; y: number } | string,
    doc: jsPDF,
    inline?: boolean | undefined
  ) {
    doc.setFontSize(fontSize);
    if (!inline) {
      this.positionText.y += fontSize + 5;
    }
    doc.setFillColor(0, 0, 0);
    this.write(text, pos, doc, true);
  }

  drawLine(fontSize: number, doc: jsPDF) {
    doc.setFontSize(fontSize);
    doc.setDrawColor(160, 200, 160);
    this.positionText.y += 5;
    doc.rect(
      this.marginsText.width,
      this.positionText.y,
      this.pageSize.width -
        this.pageSize.exededWidth -
        this.marginsText.width * 2,
      0.5
    ); //Fill and Border
  }

  /* DRAW LINES ON THE PDF ESTRUCTURE */
  drawVerticalLinePrincipal(doc: jsPDF) {
    doc.setLineWidth(1);
    doc.setDrawColor(160, 200, 160);
    doc.line(70, 75, 70, 310); // vertical line
    //doc.line(70, 360, 70, 585); // vertical line
  }

  drawVerticalLinesItemsInput(doc: jsPDF) {
    doc.setLineWidth(0.1);
    doc.setDrawColor(160, 200, 160);
    /*    DRAW LINES FIRST MENU           **/
    doc.line(80, 143, 80, 157);
    doc.line(182, 143, 182, 157);
    doc.line(265, 143, 265, 157);
    doc.line(360, 143, 360, 157);
    /*   DRAW LINES 3ORDER FIRST MENU            **/
    doc.line(80, 143, 80, 263);
    doc.line(360, 143, 360, 263);

    /*    DRAW LINES SECOND MENU           **/
    doc.line(80, 423, 80, 437);
    doc.line(182, 423, 182, 437);
    doc.line(265, 423, 265, 437);
    doc.line(360, 423, 360, 437);
    4; /*   DRAW LINES 4ORDER SECOND MENU            **/
    doc.line(80, 423, 80, 543);
    doc.line(360, 423, 360, 543);
  }

  drawVerticalLinesItemsOutput(doc: jsPDF) {
    doc.setLineWidth(0.1);
    doc.setDrawColor(160, 200, 160);
    /*    DRAW LINES FIRST MENU           **/
    doc.line(80, 141, 80, 153);
    doc.line(182, 141, 182, 153);
    doc.line(265, 141, 265, 153);
    doc.line(360, 141, 360, 153);

    /*   DRAW LINES BORDER FIRST MENU            **/
    doc.line(80, 141, 80, 283);
    doc.line(360, 141, 360, 283);

    /*    DRAW LINES SECOND MENU           **/
    //doc.line(80, 429, 80, 441);
    //doc.line(158, 429, 158, 441);
    //doc.line(280, 429, 280, 441);
    //doc.line(360, 429, 360, 441);
    /*   DRAW LINES SECOND MENU            **/
    //doc.line(80, 429, 80, 572);
    //doc.line(360, 429, 360, 572);
  }

  write(
    text: string,
    pos: { x: number; y: number } | string,
    doc: jsPDF,
    rect?: boolean | undefined
  ) {
    let coo = {
      x: -1,
      y: -1
    };
    if (typeof pos == 'string') {
      // properties position
      switch (pos) {
        case 'left':
          coo.x = this.marginsText.width + 2;
          break;
        case 'center':
          let widthText = doc.getTextWidth(text);
          coo.x =
            (this.pageSize.width - this.pageSize.exededWidth - widthText) / 2;
          break;
        case 'right':
          coo.x =
            this.pageSize.width -
            this.pageSize.exededWidth -
            this.marginsText.width -
            doc.getTextWidth(text);
          break;
        default:
          //default = left
          coo.x = this.marginsText.width;
          break;
      }

      coo.y = this.positionText.y;
      if (doc.getTextWidth(text) < this.pageSize.exededWidth) {
        doc.text(text, coo.x, coo.y);
      } else if (pos == 'left') {
        // word to word
        let lines = text.split('\n');
        lines.forEach(line => {
          let words = line.split(' ');
          words.forEach(word => {
            let lengthW = doc.getTextWidth(word + ' ');
            if (lengthW + coo.x + 2 < this.pageSize.width - 230) {
              // 200
              doc.text(word + ' ', coo.x, coo.y);
              coo.x += lengthW;
            } else {
              coo.x = this.marginsText.width + 3;
              coo.y += 10;
              doc.text(word + ' ', coo.x, coo.y);
              coo.x += lengthW;
            }
          });
          // save position
          this.positionText.y = coo.y;
          coo.x = this.marginsText.width + 3;
          coo.y += 10;
        });
      }
      this.positionText.y = coo.y;
    }

    if (rect) {
      // draw a rectangle in the text
      doc.rect(
        coo.x - 1,
        coo.y - doc.getLineHeight() + 3,
        doc.getTextWidth(text) + 2,
        doc.getLineHeight() - 2
      ); //Fill and Border
    }
  }

  getBase64Image(img: any) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx: any = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
}
