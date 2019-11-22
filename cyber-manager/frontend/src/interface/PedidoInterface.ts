export interface PedidoInterface {
  idOrden: number;
  fechaIngreso: string;
  nombreCliente: string;
  telCliente: string;
  articulo: string | undefined;
  modelo?: string | undefined;
  marca?: string | undefined;
  fallReportada: string;
  observaciones: string;
  isCanceled: boolean | number;
  fechaReparacion: string;
  fechaEntrega: string;
  reparacion: string;
  precio: number;
}
