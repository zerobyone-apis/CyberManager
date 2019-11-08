import User from "../../models/User";
import PageData from '../../data/PageData';
import Validation from "../../utils/Validation";
import vue from 'vue';

export default class IndentificationCode extends vue {
  private v: Validation = new Validation();
  private serviceNumber: number = 1;

  private reception = {
    date: ''
  }

  private clientData = {
    formName: 'clientData',
    name: {
      value: '',
      required: true,
    },
    location: {
      value: '',
      required: true,
    },
    phone: {
      value: '',
      required: true,
    },
  }

  private articleData = {
    formName: 'articleData',
    name: {
      value: '',
      required: true,
    },
    brand: {
      value: '',
      required: true,
    }, // marca
    model: {
      value: '',
      required: true,
    },
    serial: {
      value: '',
      required: true,
    },
  }

  private others = {
    repair: false,
    pay: false,
    deliver: false,
    other: false,
  }

  private headerOrders = [
    { text: 'Nro', value: 'id' },
    { text: 'Cliente', value: 'clientName' },
    { text: "Acciones", value: 'action' }
  ]

  private orders = [
    { id: 1, clientName: 'Damian' }
  ];

  private newOrder() {
  }

  private saveOrder() {
    // clear all fields
    if ( this.v.validateFields([this.clientData, this.articleData]) ) {
    }
  }

  private editOrder(item: any) {
  }

  private deleteOrder(item: any) {
  }
}