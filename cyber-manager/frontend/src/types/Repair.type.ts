export interface IRepair {
  id: number,
  clientName: string,
  article: string,
  warranty?: string,
  technical?: string,
  isCanceled?: boolean,
  deliverDate: string | null,
  repairDate: string | null,
  reparation: string,
  price: number,
  status: string,
}