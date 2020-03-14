export interface IRepair {
  id: number;
  clientname: string;
  article: string;
  warranty?: string;
  technical?: string;
  iscanceled?: boolean;
  deliverydate: string | null;
  repairdate: string | null;
  reparation: string;
  price: number;
  replacementprice: number;
  status: string;
}
