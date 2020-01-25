export interface IOrder {
  idOrder: number;
  admissionDate: string;
  admissionDateFront?: string; // dd/mm/yyyy HH:MM:SS
  clientName: string;
  clientPhone: string;
  article: string;
  model: string;
  brand: string;
  reportedFailure: string;
  observations: string;
  isCanceled: boolean;
  // repair attbs
  repairDate?: string;
  reparation?: string;
  price?: number;
  deliverDate?: string;
  status: string;
  replacementPrice?: number;
}
