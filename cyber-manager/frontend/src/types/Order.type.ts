export interface IOrder {
  id?: number,
  admissionDate?: string,
  admissionDateFront?: string; // dd/mm/yyyy HH:MM:SS
  clientName: string,
  clientPhone: string,
  article: string,
  model: string,
  brand: string,
  reportedFailure: string,
  observations: string,
  isCanceled: boolean,
  // repair attbs
  warranty?: string,
  repairDate?: string,
  reparation?: string,
  price?: number,
  deliverDate?: string,
  status: string
}

