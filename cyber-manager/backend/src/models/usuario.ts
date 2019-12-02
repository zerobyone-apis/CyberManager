import { UserInterface } from '../interface/UserInterface';

export default class Usuario {
  private _idUser: number | undefined;
  private _username: string;
  private _passwd: string | number;
  private _cargo: string;
  private _isAdmin: number | boolean | string;
  private _createOn: string | Date | undefined;
  private _updateOn: string | Date | undefined;

  constructor(user: UserInterface) {
    this._idUser = user.idUser;
    this._username = user.username;
    this._passwd = user.passwd;
    this._cargo = user.cargo;
    this._isAdmin = user.isAdmin;
    this._createOn = user.createOn;
    this._updateOn = user.updateOn;
  }

  get userId(): number | undefined {
    return this._idUser;
  }
  set userId(value: number | undefined) {
    this._idUser = value;
  }

  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  get passwd(): string | number {
    return this._passwd;
  }
  set passwd(value: string | number) {
    this._passwd = value;
  }

  get cargo(): string {
    return this._cargo;
  }
  set cargo(value: string) {
    this._cargo = value;
  }

  get isAdmin(): number | boolean | string {
    return this._isAdmin;
  }
  set isAdmin(value: boolean | number | string) {
    this._isAdmin = value;
  }

  get createOn(): string | Date | undefined {
    return this._createOn;
  }
  set createOn(value: string | Date | undefined) {
    this._createOn = value;
  }

  get updateOn(): string | Date | undefined {
    return this._updateOn;
  }
  set updateOn(value: string | Date | undefined) {
    this._updateOn = value;
  }
}
