export interface IUserStore {
  id?: number,
  username: string,
  passwd?: string,
  passwd2?: string,
  charge: string,
  isAdmin?: boolean,
  createOn?: string
}