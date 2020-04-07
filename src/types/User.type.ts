export interface IUser {
  idUser?: number;
  username: string;
  passwd: string | number;
  charge: string;
  isAdmin: boolean | number | string;
  createOn?: string | Date;
  updateOn?: string | Date;
  enterprise: number;
}
