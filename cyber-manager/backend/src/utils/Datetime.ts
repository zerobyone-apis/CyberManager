export default class Datetime {
  convertDatetime(arg0: string | Date) {
    throw new Error('Method not implemented.');
  }
  convert(date: string, hour?: string) {
    let d = date.split('/');
    let orderDate = d[2] + '-' + d[1] + '-' + d[0];
    let h = hour == undefined ? '' : hour;
    return orderDate + (h == '' ? '' : ' ' + h);
  }

  backendConvert(date: string, hour?: string) {
    // let d = date.split('/');
    let orderDate = date; //d[2] + '-' + d[1] + '-' + d[0];
    let h = hour == undefined ? '' : hour;
    return orderDate + (h == '' ? '' : ' ' + h);
  }

  backendNow() {
    return this.backendConvert(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  }

  now(datetime?: string) {
    if (datetime) {
      return this.getDate(datetime) + ' ' + this.getHour(datetime);
    } else {
      return this.convert(
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      );
    }
  }

  normalize(datetime: string) {
    // datetime: 2019-11-26T03:00:00.000Z
    let partDate = datetime.split('T')[0].split('-');
    return (
      partDate[2] +
      '-' +
      partDate[1] +
      '-' +
      partDate[0] +
      ' ' +
      this.getHour(datetime)
    );
  }

  getDate(datetime?: string) {
    // datetime: 2019-11-26T03:00:00.000Z
    if (datetime) {
      return datetime.split('T')[0];
    } else {
      return new Date().toLocaleDateString();
    }
  }

  getHour(datetime?: string) {
    // datetime: 2019-11-26T03:00:00.000Z
    if (datetime) {
      return datetime.split('T')[1].split('.')[0];
    } else {
      return new Date().toLocaleTimeString();
    }
  }
}
