export interface PedidoInterface {
  idOrden?: string | number | undefined;
  fechaIngreso?: Date | string;
  nombreCliente?: string | undefined;
  telCliente?: number | string;
  articulo: string | undefined;
  modelo?: string | undefined;
  marca?: string | undefined;
  fallReportada?: string;
  observaciones?: string;
  isCanceled?: boolean | number | string;
  fechaReparacion?: Date | string;
  fechaEntrega?: Date | string;
  reparacion?: string;
  precio?: number | string;
  status?: string;
}
