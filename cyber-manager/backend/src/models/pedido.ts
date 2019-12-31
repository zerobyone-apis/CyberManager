import { PedidoInterface } from '../interface/PedidoInterface';

export default class Pedido {
  private _idOrden: string | number | undefined;
  private _fechaIngreso: string | Date | undefined;
  private _nombreCliente: string | undefined;
  private _telCliente: number | string | undefined;
  private _articulo: string | undefined;
  private _modelo: string | undefined;
  private _marca: string | undefined;
  private _fallReportada: string | undefined;
  private _observaciones: string | undefined;
  private _isCanceled: boolean | number | string;
  private _fechaReparacion: string | Date | undefined;
  private _fechaEntrega: string | Date | undefined;
  private _reparacion: string | undefined;
  private _precio: number | undefined | string;
  private _status: string | undefined;

  constructor(pedido: PedidoInterface) {
    this._idOrden = pedido.idOrden;
    this._fechaIngreso = pedido.fechaIngreso;
    this._nombreCliente = pedido.nombreCliente;
    this._telCliente = pedido.telCliente;
    this._articulo = pedido.articulo;
    this._modelo = pedido.modelo;
    this._marca = pedido.marca;
    this._fallReportada = pedido.fallReportada;
    this._observaciones = pedido.observaciones;
    this._isCanceled = pedido.isCanceled || false;
    this._fechaReparacion = pedido.fechaReparacion;
    this._fechaEntrega = pedido.fechaEntrega;
    this._reparacion = pedido.reparacion;
    this._precio = pedido.precio;
    this._status = pedido.status;
  }

  get idOrden(): string | number | undefined {
    return this._idOrden;
  }
  set idOrden(value: number | string | undefined) {
    this._idOrden = value;
  }

  get fechaIngreso(): string | Date | undefined {
    return this._fechaIngreso;
  }
  set fechaIngreso(value: string | Date | undefined) {
    this._fechaIngreso = value;
  }

  get nombreCliente(): string | undefined {
    return this._nombreCliente;
  }
  set nombreCliente(value: string | undefined) {
    this._nombreCliente = value;
  }

  get telCliente(): number | string | undefined {
    return this._telCliente;
  }
  set telCliente(value: number | string | undefined) {
    this._telCliente = value;
  }

  get articulo(): string | undefined {
    return this._articulo;
  }
  set articulo(value: string | undefined) {
    this._articulo = value;
  }

  get marca(): string | undefined {
    return this._marca;
  }
  set marca(value: string | undefined) {
    this._marca = value;
  }

  get modelo(): string | undefined {
    return this._modelo;
  }
  set modelo(value: string | undefined) {
    this._modelo = value;
  }

  get fallReportada(): string | undefined {
    return this._fallReportada;
  }
  set fallReportada(value: string | undefined) {
    this._fallReportada = value;
  }

  get observaciones(): string | undefined {
    return this._observaciones;
  }
  set observaciones(value: string | undefined) {
    this._observaciones = value;
  }

  get isCanceled(): boolean | number | string {
    return this._isCanceled;
  }
  set isCanceled(value: boolean | number | string) {
    this._isCanceled = value;
  }

  get fechaReparacion(): Date | string | undefined {
    return this._fechaReparacion;
  }
  set fechaReparacion(value: string | Date | undefined) {
    this._fechaReparacion = value;
  }

  get fechaEntrega(): Date | string | undefined {
    return this._fechaEntrega;
  }
  set fechaEntrega(value: Date | string | undefined) {
    this._fechaEntrega = value;
  }

  get reparacion(): string | undefined {
    return this._reparacion;
  }
  set reparacion(value: string | undefined) {
    this._reparacion = value;
  }
  get precio(): number | undefined | string {
    return this._precio;
  }
  set precio(value: number | undefined | string) {
    this._precio = value;
  }

  get status(): string | undefined {
    return this._status;
  }
  set status(value: string | undefined) {
    this._status = value;
  }
}
