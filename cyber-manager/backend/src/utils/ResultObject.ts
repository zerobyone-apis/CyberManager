export default class ResultObject {
  public statusCode: number;
  public value: any;

  constructor(statusCoce: number, value: any) {
    this.statusCode = -1;
    this.value = 'Unasigned value';
  }
}
