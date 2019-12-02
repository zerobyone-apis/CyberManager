export interface EmpresaInterface {
  idEmpresa?: string | number;
  fechaCreacion: Date | string;
  username: string;
  nombre: string;
  telefono?: number;
  celular?: number;
  fax?: number;
  direccion: string;
  garantia: string;
  primerMsjRecibo?: string;
  segundoMsjRecibo?: string;
  urlLogo?: string;
  ultimaActualizacion?: Date | string;
  email?: string;
}
