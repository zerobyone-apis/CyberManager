import { PedidoInterface } from "../interface/PedidoInterface";

export default class Pedido {
  private idOrden: string | number;
  private fechaIngreso: string | Date;
  private nombreCliente: string | undefined;
  private telCliente: number;
  private articulo: string | undefined;
  private modelo: string | undefined;
  private marca: string | undefined;
  private fallReportada: string;
  private observaciones: string;
  private isCanceled: boolean | number;
  private fechaReparacion: string | Date;
  private fechaEntrega: string | Date;
  private reparacion: string;
  private precio: number;

  constructor(pedido: PedidoInterface) {
    this.idOrden = pedido.idOrden;
    this.fechaIngreso = pedido.fechaIngreso;
    this.nombreCliente = pedido.nombreCliente;
    this.telCliente = pedido.telCliente;
    this.articulo = pedido.articulo;
    this.modelo = pedido.modelo;
    this.marca = pedido.marca;
    this.fallReportada = pedido.fallReportada;
    this.observaciones = pedido.observaciones;
    this.isCanceled = pedido.isCanceled;
    this.fechaReparacion = pedido.fechaReparacion;
    this.fechaEntrega = pedido.fechaEntrega;
    this.reparacion = pedido.reparacion;
    this.precio = pedido.precio;
  }

  get getIdOrden(): string | number {
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

  get getTelCliente(): number {
    return this.telCliente;
  }
  set setTelCliente(value: number) {
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
