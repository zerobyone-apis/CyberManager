export interface User {
  idUser?: string | number;
  username: string;
  passwd: string | number;
  cargo: string;
  isAdmin: boolean | number;
  createOn: Date;
  updateOn?: Date;
}
