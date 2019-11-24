import Datetime from '@/utils/TimeFunctions';

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

  private _isCancelled: boolean;
  private _repairDate: string;
  private _deliveryDate: string;
  private _reparation: string;
  private _price: number;

  constructor() {
    this._id = 0;
    this._startDate = new Datetime().getDate();
    this._clientName = '';
    this._clientPhone = '';
    this._article = '';
    this._model = '';
    this._brand = '';
    this._failReported = '';
    this._observations = '';
    
    this._isCancelled = false;
    this._repairDate = '';
    this._deliveryDate = '';
    this._reparation = '';
    this._price = 0;
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

  get clientPhone(): string {
    return this._clientPhone;
  }
  set clientPhone(phone: string) {
    this._clientPhone = phone;
  }

  get article(): string {
    return this._article;
  }
  set article(article: string) {
    this._article = article;
  }

  get model(): string {
    return this._model;
  }
  set model(model: string) {
    this._model = model;
  }

  get brand(): string {
    return this._brand;
  }
  set brand(brand: string) {
    this._brand = brand;
  }

  get failReported(): string {
    return this._failReported;
  }
  set failReported(fail: string) {
    this._failReported = fail;
  }

  get observations(): string {
    return this._observations;
  }
  set observations(observations: string) {
    this._observations = observations;
  }

  get isCancelled(): boolean {
    return this._isCancelled;
  }
  set isCancelled(value: boolean) {
    this._isCancelled = value;
  }

  get repairDate(): string {
    return this._repairDate;
  }
  set repairDate(value: string) {
    this._repairDate = value;
  }

  get deliveryDate(): string {
    return this._deliveryDate;
  }
  set deliveryDate(value: string) {
    this._deliveryDate = value;
  }

  get reparation(): string {
    return this._reparation;
  }
  set reparation(value: string) {
    this._reparation = value;
  }
  
  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
  }
}