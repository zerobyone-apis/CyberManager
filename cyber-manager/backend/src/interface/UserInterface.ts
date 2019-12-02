export interface UserInterface {
  idUser?: number;
  username: string;
  passwd: string | number;
  cargo: string;
  isAdmin: boolean | number | string;
  createOn?: string | Date;
  updateOn?: string | Date;
}
