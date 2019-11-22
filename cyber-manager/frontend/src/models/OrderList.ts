import Order from "./Order";
export default class OrderList {

  private _oreders: Order[];

  constructor() {
    this._oreders = [];
  }

  get(index: number) {
    return this._oreders[index];
  }

  set(index: number, option: Order) {
    this._oreders[index] = option;
  }

  add(order: Order) {
    this._oreders.push(order);
  }

  get length(): number {
    return this._oreders.length;
  }

  getArray() {
    return this._oreders;
  }

  getLast(): Order {
    try {
      let order = this.get(this.length-1);
      return order;
    }catch(error) {
      let order = new Order();
      return order;
    }
  }

  remove(index: number) {
    this._oreders.splice(index, 1);
  }

  clear() {
    this._oreders = [];
  }

  setLast(o: Order) {
    Object.assign(this._oreders[this.length-1], o);
  }
}