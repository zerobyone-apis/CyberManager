import Pedido from './pedido';

export default class PedidoList {
  private _pedidos: Pedido[];

  constructor() {
    this._pedidos = [];
  }

  get(index: number) {
    return this._pedidos[index];
  }

  set(index: number, pedido: Pedido) {
    this._pedidos[index] = pedido;
  }

  add(pedido: Pedido) {
    this._pedidos.push(pedido);
  }

  get length(): number {
    return this._pedidos.length;
  }

  getArray() {
    return this._pedidos;
  }
  setArray(array: Pedido[]) {
    this._pedidos.push(...array);
  }
  remove(index: number) {
    this._pedidos.splice(index, 1);
  }

  clear() {
    this._pedidos = [];
  }
}
