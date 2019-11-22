export interface PedidoInterface {
  idOrden: string | number;
  fechaIngreso: Date | string;
  nombreCliente: string;
  telCliente: number;
  articulo: string | undefined;
  modelo?: string | undefined;
  marca?: string | undefined;
  fallReportada: string;
  observaciones: string;
  isCanceled: boolean | number;
  fechaReparacion: Date | string;
  fechaEntrega: Date | string;
  reparacion: string;
  precio: number;
}
