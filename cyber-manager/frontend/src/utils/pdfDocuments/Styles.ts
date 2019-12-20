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
  insertImage(img: any, width: number, height: number, doc: jsPDF) {
    let cooX = ((this.pageSize.width - this.pageSize.exededWidth) - width) / 2;
    doc.addImage(img, 'jpg', cooX, this.positionText.y, width, height);
    this.positionText.y += height + 5;
  }

  writeText(text: string, fontSize: number, pos: { x: number, y: number } | string, doc: jsPDF, inline?: boolean | undefined) {
    doc.setFontSize(fontSize);
    if (!inline) {
      this.positionText.y += fontSize + 2;
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
    doc.setDrawColor(220, 220, 220)
    this.positionText.y += 5;
    doc.rect(this.marginsText.width, this.positionText.y, (this.pageSize.width - this.pageSize.exededWidth - this.marginsText.width * 2), 0.5) //Fill and Border
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
      if (doc.getTextWidth(text) < this.pageSize.exededWidth) {
        doc.text(text, coo.x, coo.y);
      } else if(pos == 'left') {
        // word to word
        let words = text.split(' ')
        words.forEach(word => {
          let lengthW = doc.getTextWidth(word + ' ');
          if (lengthW + coo.x < (this.pageSize.width-200)) {
            doc.text(word + ' ', coo.x, coo.y);
            coo.x += lengthW;
          } else {
            coo.x = this.marginsText.width;
            coo.y += 10;
            doc.text(word + ' ', coo.x, coo.y);
            coo.x += lengthW;
          }
        });
        //save position
        this.positionText.y = coo.y;
      }
      this.positionText.y = coo.y;
    } else {
      if (rect) { // draw a rectangle in the text
        doc.rect(pos.x - 1, (pos.y - doc.getLineHeight() + 3), doc.getTextWidth(text) + 2, doc.getLineHeight() - 2) //Fill and Border
      }
    }
  }

  getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx: any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
}