export interface IOrder {
  id?: number;
  admissiondate?: string;
  admissionDateFront?: string; // dd/mm/yyyy HH:MM:SS
  clientname: string;
  clientphone: string;
  article: string;
  model: string;
  brand: string;
  reportedfailure: string;
  observations: string;
  iscanceled: boolean;
  status: string;
  // repair attbs
  warranty?: string;
  repairdate?: string;
  reparation?: string;
  price?: number;
  replacementprice?: number;
  deliverydate?: string;
}
