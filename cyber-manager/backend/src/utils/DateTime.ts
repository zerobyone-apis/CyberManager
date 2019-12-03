export default class Datetime {
  convert(date: string, hour?: string) {
    let orderDate = date;
    let h = (hour == undefined ? '' : hour);
    return orderDate + (h == '' ? '' : ' ' + h);
  }

  now(datetime?: string) {
    if(datetime) {
      return this.getDate(datetime) +' '+ this.getHour(datetime);
    }else{
      return this.convert(
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      );
    }
  }

  normalize(datetime: string) { // datetime: 2019-11-26T03:00:00.000Z
    let partDate = datetime.split('T')[0].split('-');
    return partDate[2]+'-'+partDate[1]+'-'+partDate[0]+' '+ this.getHour(datetime)
  }

  getDate(datetime?: string) { // datetime: 2019-11-26T03:00:00.000Z
    if (datetime) {
      return datetime.split('T')[0];
    } else {
      return new Date().toLocaleDateString();
    }
  }

  getHour(datetime?: string) { // datetime: 2019-11-26T03:00:00.000Z
    if (datetime) {
      return datetime.split('T')[1].split('.')[0];
    } else {
      return new Date().toLocaleTimeString();
    }
  }
}
