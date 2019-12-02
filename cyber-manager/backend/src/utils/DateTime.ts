export default class Datetime {
  convert(date: string, hour?: string) {
    // deprecated
    // let d = date.split('/');
    // let orderDate = d[2] + '-' + d[1] + '-' + d[0];
    let orderDate = date;
    let h = (hour == undefined ? '' : hour);
    return orderDate + (h == '' ? '' : ' ' + h);
  }

  now() {
    return this.convert(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  }

  getDate() {
    return new Date().toLocaleDateString();
  }

  getHour() {
    return new Date().toLocaleTimeString();
  }
}
