import { PedidoInterface } from "../interface/PedidoInterface";

export default class Pedido {
  private idOrden: number;
  private fechaIngreso: string;
  private nombreCliente: string | undefined;
  private telCliente: string;
  private articulo: string | undefined;
  private modelo: string | undefined;
  private marca: string | undefined;
  private fallReportada: string;
  private observaciones: string;
  private isCanceled: boolean | number;
  private fechaReparacion: string;
  private fechaEntrega: string;
  private reparacion: string;
  private precio: number;

  constructor(init?: Partial<PedidoInterface>) {
    Object.assign(this, init);
  }

  getData() {
    let data: PedidoInterface = {
      idOrden: this.idOrden,
      fechaIngreso: this.fechaIngreso,
      nombreCliente: this.nombreCliente,
      telCliente: this.telCliente,
      articulo: this.articulo,
      modelo: this.modelo,
      marca: this.marca,
      fallReportada: this.fallReportada,
      observaciones: this.observaciones,
      isCanceled: this.isCanceled,
      fechaReparacion: this.fechaReparacion,
      fechaEntrega: this.fechaEntrega,
      reparacion: this.reparacion,
      precio: this.precio,
    }
    return data;
  }

  get getIdOrden(): number {
    return this.idOrden;
  }
  set setIdOrden(value: number) {
    this.idOrden = value;
  }

  get getFechaIngreso(): string | Date {
    return this.fechaIngreso;
  }
  set setFechaIngreso(value: string) {
    this.fechaIngreso = value;
  }

  get getNombreCliente(): string | undefined {
    return this.nombreCliente;
  }
  set setNombreCliente(value: string) {
    this.nombreCliente = value;
  }

  get getTelCliente(): string {
    return this.telCliente;
  }
  set setTelCliente(value: string) {
    this.telCliente = value;
  }

  get getArticulo(): string | undefined {
    return this.articulo;
  }
  set setArticulo(value: string) {
    this.articulo = value;
  }

  get getMarca(): string | undefined {
    return this.marca;
  }
  set setMarca(value: string) {
    this.marca = value;
  }

  get getModelo(): string | undefined {
    return this.modelo;
  }
  set setModelo(value: string) {
    this.modelo = value;
  }

  get getFallReportada(): string {
    return this.fallReportada;
  }
  set setFallReportada(value: string) {
    this.fallReportada = value;
  }

  get getObservaciones(): string {
    return this.observaciones;
  }
  set setObeservaciones(value: string) {
    this.observaciones = value;
  }

  get getIsCanceled(): boolean | number {
    return this.isCanceled;
  }
  set setIsCanceled(value: boolean) {
    this.isCanceled = value;
  }

  get getFechaReparacion(): Date | string {
    return this.fechaReparacion;
  }
  set setFechaReparacion(value: string) {
    this.fechaReparacion = value;
  }

  get getFechaEntrega(): Date | string {
    return this.fechaEntrega;
  }
  set setFechaEntrega(value: string) {
    this.fechaEntrega = value;
  }

  get getReparacion(): string {
    return this.reparacion;
  }
  set setReparacion(value: string) {
    this.reparacion = value;
  }
  get getPrecio(): number {
    return this.precio;
  }
  set setPrecio(value: number) {
    this.precio = value;
  }
}
