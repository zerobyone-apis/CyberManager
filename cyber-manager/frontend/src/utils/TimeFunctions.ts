export default class Datetime {
  public convert(date: string, hour: string) {
    let d = date.split('/');
    let orderDate = d[2] + '-' + d[1] + '-' + d[0];
    let h = hour;
    return orderDate + ' ' + h;
  }

  public now() {
    return this.convert(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  }

  public getDate() {
    return new Date().toLocaleDateString();
  }

  public getHour() {
    return new Date().toLocaleTimeString();
  }
}
