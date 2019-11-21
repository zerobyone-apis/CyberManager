export default class Order {
  private _id: number;
  private _startDate: string;
  private _clientName: string;
  private _clientPhone: string;
  private _article: string;
  private _model: string;
  private _brand: string;
  private _failReported: string;
  private _observations: string;

  constructor() {
    this._id = 0;
    this._startDate = new Date().toLocaleDateString();    
    this._clientName = '';
    this._clientPhone = '';
    this._article = '';
    this._model =  '';
    this._brand = '';
    this._failReported = '';
    this._observations = '';
  }

  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get startDate(): string {
    return this._startDate;
  }
  set startDate(date: string) {
    this._startDate = date;
  }

  get clientName(): string {
    return this._clientName;
  }
  set clientName(name: string) {
    this._clientName = name;
  }
  
  get clientPhone (): string {
    return this._clientPhone;
  }
  set clientPhone (phone: string) {
    this._clientPhone = phone;
  }

  get article (): string {
    return this._article;
  }
  set article (article: string) {
    this._article = article;
  }

  get model (): string {
    return this._model;
  }
  set model (model: string) {
    this._model = model;
  }

  get brand (): string {
    return this._brand;
  }
  set brand (brand: string) {
    this._brand = brand;
  }

  get failReported (): string {
    return this._failReported;
  }
  set failReported (fail: string) {
    this._failReported = fail;
  }

  get observations (): string {
    return this._observations;
  }
  set observations (observations: string) {
    this._observations = observations;
  }
}