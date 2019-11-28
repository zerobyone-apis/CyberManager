import { EmpresaInterface } from "../interface/EmpresaInterface";

export default class Empresa {
  private idEmpresa: string | number;
  private fechaCreacion: Date | string;
  private nombre: string;
  private telefono: number | undefined;
  private celular: number | undefined;
  private fax: number | undefined;
  private direccion: string | undefined;
  private garantia: string;
  private primerMsjRecibo: string;
  private segundoMsjRecibo: string;
  private urlLogo: string;
  private ultimaActualizacion: Date | string | undefined;
  private username: string;

  constructor() {
    this.idEmpresa = -1;
    this.username = '';
    this.fechaCreacion = '';
    this.nombre = '';
    this.telefono = 0;
    this.celular = 0;
    this.fax = 0;
    this.direccion = '';
    this.garantia = '';
    this.primerMsjRecibo = '';
    this.segundoMsjRecibo = '';
    this.urlLogo = '';
    this.ultimaActualizacion = '';

  }

  get getIdEmpresa(): string | number {
    return this.idEmpresa;
  }
  set setIdEmpresa(value: number) {
    this.idEmpresa = value;
  }

  get getFechaCreacion(): Date | string {
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

  get getTelefono(): number | undefined {
    return this.telefono;
  }
  set setTelefono(value: number) {
    this.telefono = value;
  }

  get getCelular(): number | undefined {
    return this.celular;
  }
  set setCelular(value: number) {
    this.celular = value;
  }

  get getFax(): number | undefined {
    return this.fax;
  }
  set setFax(value: number) {
    this.fax = value;
  }

  get getDireccion(): string | undefined {
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

  get getUltimaActualizacion(): Date | string | undefined {
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
