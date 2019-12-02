import { EmpresaInterface } from '../interface/EmpresaInterface';

export default class Empresa implements EmpresaInterface {
  private _idEmpresa: string | number | undefined;
  private _fechaCreacion: Date | string;
  private _nombre: string;
  private _telefono: number | undefined;
  private _celular: number | undefined;
  private _fax: number | undefined;
  private _direccion: string;
  private _garantia: string;
  private _primerMsjRecibo: string | undefined;
  private _segundoMsjRecibo: string | undefined;
  private _urlLogo: string | undefined;
  private _ultimaActualizacion: Date | string | undefined;
  private _username: string;
  private _email: string | undefined;

  constructor() {
    this._idEmpresa = this.idEmpresa;
    this._fechaCreacion = this.fechaCreacion;
    this._nombre = this.nombre;
    this._telefono = this.telefono;
    this._celular = this.celular;
    this._fax = this.fax;
    this._direccion = this.direccion;
    this._garantia = this.garantia;
    this._primerMsjRecibo = this.primerMsjRecibo;
    this._segundoMsjRecibo = this.segundoMsjRecibo;
    this._urlLogo = this.urlLogo;
    this._ultimaActualizacion = this.ultimaActualizacion;
    this._username = this.username;
    this._email = this.email;
  }

  get idEmpresa(): string | number | undefined {
    return this._idEmpresa;
  }
  set idEmpresa(value: number | string | undefined) {
    this._idEmpresa = value;
  }

  get fechaCreacion(): Date | string {
    return this._fechaCreacion;
  }
  set fechaCreacion(value: string | Date) {
    this._fechaCreacion = value;
  }

  get nombre(): string {
    return this._nombre;
  }
  set nombre(value: string) {
    this._nombre = value;
  }

  get telefono(): number | undefined {
    return this._telefono;
  }
  set telefono(value: number | undefined) {
    this._telefono = value;
  }

  get celular(): number | undefined {
    return this._celular;
  }
  set celular(value: number | undefined) {
    this._celular = value;
  }

  get fax(): number | undefined {
    return this._fax;
  }
  set fax(value: number | undefined) {
    this._fax = value;
  }

  get direccion(): string {
    return this._direccion;
  }
  set direccion(value: string) {
    this._direccion = value;
  }

  get garantia(): string {
    return this._garantia;
  }
  set garantia(value: string) {
    this._garantia = value;
  }

  get primerMsjRecibo(): string | undefined {
    return this._primerMsjRecibo;
  }
  set primerMsjRecibo(value: string | undefined) {
    this._primerMsjRecibo = value;
  }

  get segundoMsjRecibo(): string | undefined {
    return this._segundoMsjRecibo;
  }
  set segundoMsjRecibo(value: string | undefined) {
    this._segundoMsjRecibo = value;
  }

  get urlLogo(): string | undefined {
    return this._urlLogo;
  }
  set urlLogo(value: string | undefined) {
    this._urlLogo = value;
  }

  get ultimaActualizacion(): Date | string | undefined {
    return this._ultimaActualizacion;
  }
  set ultimaActualizacion(value: string | Date | undefined) {
    this._ultimaActualizacion = value;
  }

  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
  }
}
