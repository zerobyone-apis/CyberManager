import { User } from "../interface/UserInterface";

export default class Usuario {
  private idUser: string | number | undefined;
  private username: string;
  private passwd: string | number;
  private cargo: string;
  private isAdmin: number | boolean;
  private createOn: string | Date;
  private updateOn: string | Date | undefined;

  constructor(user: User) {
    this.idUser = user.idUser;
    this.username = user.username;
    this.passwd = user.passwd;
    this.cargo = user.cargo;
    this.isAdmin = user.isAdmin;
    this.createOn = user.createOn;
    this.updateOn = user.updateOn;
  }

  get getUserId(): string | number | undefined {
    return this.idUser;
  }
  set setUserId(value: number) {
    this.idUser = value;
  }

  get getUsername(): string {
    return this.username;
  }
  set setUsername(value: string) {
    this.username = value;
  }

  get getPassword(): string | number {
    return this.passwd;
  }
  set setPassword(value: string) {
    this.passwd = value;
  }

  get getCargo(): string {
    return this.cargo;
  }
  set setCargo(value: string) {
    this.cargo = value;
  }

  get getIsAdmin(): number | boolean {
    return this.isAdmin;
  }
  set setIsAdmin(value: boolean) {
    this.isAdmin = value;
  }

  get getCreateOn(): string | Date {
    return this.createOn;
  }
  set setCreateOn(value: string) {
    this.createOn = value;
  }

  get getUpdateOn(): string | Date | undefined {
    return this.updateOn;
  }
  set setUpdateOn(value: string) {
    this.updateOn = value;
  }
}
