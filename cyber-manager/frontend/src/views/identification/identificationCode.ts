import User from "../../models/User";
import PageData from '../../data/PageData';
import Validation from "../../utils/Validation";
import vue from 'vue';
import InputPdf from '../../utils/pdfDocuments/InputPDF';

export default class IndentificationCode extends vue {
  private v: Validation = new Validation();

  private reception = {
    date: ''
  }

  private orderData: any = {
    formName: 'orderData',
    serviceNumber: {
      value: 2
    },
    receptionDate: {
      value: ''
    },
    damage: {
      value: ''
    },
    notes: {
      value: ''
    },
  }

  private clientData: any = {
    formName: 'clientData',
    id: {
      value: 0,
      required: false,
    },
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

  private articleData: any = {
    formName: 'articleData',
    id: {
      value: 0,
      required: false,
    },
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

  private others: any = {
    repair: false,
    pay: false,
    deliver: false,
    other: false,
  }

  private headerOrders = [
    { text: 'Nro', value: 'id' },
    { text: 'Cliente', value: 'client.name' },
    { text: "Acciones", value: 'action' }
  ]

  private orders = [
    {
      id: 1,
      receptionDate: '12/02/20',
      damage: 'rotura de pantalla y cambio de vidrio',
      notes: 'cambio de vidrio a glass 2',
      client: {
        id: 1,
        name: 'Damian',
        location: 'Rincon 1207',
        phone: '099 232 343',
      },
      article: {
        id: 1,
        name: 'Celular',
        brand: 'Motorola',
        model: 'c112',
        serial: '655444534232'
      },
    }
  ];

  private selectedOrder: boolean = false;

  private newOrder() {
  }

  private saveOrder() {
    if (this.v.validateFields([this.clientData, this.articleData])) {
      // clear all fields
      Object.assign(this.clientData, this.v.clearObject(this.clientData));
      Object.assign(this.articleData, this.v.clearObject(this.articleData));
      Object.assign(this.orderData, this.v.clearObject(this.orderData));
      this.selectedOrder = false;
    }
  }

  private editOrder(item: any) {
    this.selectedOrder = true;
    Object.keys(item.client).forEach(key => {
      this.clientData[key].value = item.client[key];
    });
    Object.keys(item.article).forEach(key => {
      // console.log(key)
      this.articleData[key].value = item.article[key];
    });

    this.orderData.serviceNumber.value = item.id;
    this.orderData.damage.value = item.damage;
    this.orderData.receptionDate.value = item.receptionDate;
    this.orderData.notes.value = item.notes;
  }

  private deleteOrder(item: any) {
  }

  private generatePdf() {
    let inputPdf: InputPdf = new InputPdf();
    let data = {
      enterprise: {
        name: 'CyberPunk',
        location: 'Enrique Rodo 2344',
        phone: '093 333 443',
        web: 'www.coso.com',
      },
      order: {
        number: 123232,
        date: '12/12/20 12:23',
        problem: 'Pantalla rota, cambio de vidrio y carcasa',
        notes: 'pide agregarle vidrio gorilla glass 2334'
      },
      client: {
        name: 'Damian Rodriguez',
        phone: '099 999 999'
      },
      article: {
        name: 'celular',
        brand: 'Alcatel',
        model: 'P344'
      }
    }
    inputPdf.generateDoc(data);
  }
}