export interface EmpresaInterface {
  idEmpresa: number;
  fechaCreacion: string;
  username: string;
  nombre: string;
  telefono: string;
  celular: string;
  fax?: number;
  direccion?: string;
  garantia: string;
  primerMsjRecibo: string;
  segundoMsjRecibo: string;
  urlLogo: string;
  ultimaActualizacion?: string;
}
