import User from "../../models/User";
import PageData from '../../data/PageData';
import Validation from "../../utils/Validation";
import vue from 'vue';

export default class IndentificationCode extends vue {

  private serviceNumber: number = 1;

  private reception = {
    date: ''
  }

  private client = {
    name: '',
    location: '',
    phone: '',
  }
  private article = {
    name: '',
    brand: '', // marca
    model: '',
    serial: '',
  }
  private others = {
    repair: false,
    pay: false,
    deliver: false,
    other: false,
  }

  private headerOrders = [
    { text: 'Nro', value: 'id'},
    { text: 'Cliente', value: 'clientName'},
    { text: "Acciones", value: 'action' }
  ]

  private orders = [
    { id: 1, clientName: 'Damian' }
  ]

  private editOrder(item: any) {
  }
  
  private deleteOrder(item: any) {
  }
}