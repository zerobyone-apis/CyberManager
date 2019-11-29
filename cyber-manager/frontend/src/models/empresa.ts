import { EmpresaInterface } from "../interface/EmpresaInterface";

export default class Empresa {
  private idEmpresa: number;
  private fechaCreacion: string;
  private nombre: string;
  private telefono: string;
  private celular: string;
  private fax: number;
  private direccion: string;
  private garantia: string;
  private primerMsjRecibo: string;
  private segundoMsjRecibo: string;
  private urlLogo: string;
  private ultimaActualizacion: string;
  private username: string;

  constructor() {
    this.idEmpresa = -1;
    this.username = 'jorge';
    this.fechaCreacion = '2010-10-11';
    this.nombre = 'CyberPunk';
    this.telefono = '22299999';
    this.celular = '09899999';
    this.fax = 0;
    this.direccion = 'Luis Alberto de Herrera 2332';
    this.garantia = 'La garantia de este producto es de 3 meses';
    this.primerMsjRecibo = '';
    this.segundoMsjRecibo = '';
    this.urlLogo = '';
    this.ultimaActualizacion = '';
  }

  getData() {
    return {
      idEmpresa: this.idEmpresa,
      username: this.username,
      fechaCreacion: this.fechaCreacion,
      nombre: this.nombre,
      telefono: this.telefono,
      celular: this.celular,
      fax: this.fax,
      direccion: this.direccion,
      garantia: this.garantia,
      primerMsjRecibo: this.primerMsjRecibo,
      segundoMsjRecibo: this.segundoMsjRecibo,
      urlLogo: this.urlLogo,
      ultimaActualizacion: this.ultimaActualizacion,
    }
  }

  get getIdEmpresa(): number {
    return this.idEmpresa;
  }
  set setIdEmpresa(value: number) {
    this.idEmpresa = value;
  }

  get getFechaCreacion(): string {
    return this.fechaCreacion;
  }
  set setFechaCreacion(value: string) {
    this.fechaCreacion = value;
  }

  get getNombre(): string {
    return this.nombre;
  }
  set setNombre(value: string) {
    this.nombre = value;
  }

  get getTelefono(): number {
    return this.telefono;
  }
  set setTelefono(value: number) {
    this.telefono = value;
  }

  get getCelular(): number {
    return this.celular;
  }
  set setCelular(value: number) {
    this.celular = value;
  }

  get getFax(): number {
    return this.fax;
  }
  set setFax(value: number) {
    this.fax = value;
  }

  get getDireccion(): string {
    return this.direccion;
  }
  set setDireccion(value: string) {
    this.direccion = value;
  }

  get getGarantia(): string {
    return this.garantia;
  }
  set setGarantia(value: string) {
    this.garantia = value;
  }

  get getPrimerMsjRecibo(): string {
    return this.primerMsjRecibo;
  }
  set setPrimerMsjRecibo(value: string) {
    this.primerMsjRecibo = value;
  }

  get getSegundoMsjRecibo(): string {
    return this.segundoMsjRecibo;
  }
  set setSegundoMsjRecibo(value: string) {
    this.segundoMsjRecibo = value;
  }

  get getUrlLogo(): string {
    return this.urlLogo;
  }
  set setUrlLogo(value: string) {
    this.urlLogo = value;
  }

  get getUltimaActualizacion(): string {
    return this.ultimaActualizacion;
  }
  set setUltimaActualizacion(value: string) {
    this.ultimaActualizacion = value;
  }

  get getUsername(): string {
    return this.username;
  }
  set setUsername(value: string) {
    this.username = value;
  }
}
