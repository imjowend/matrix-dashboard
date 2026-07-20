export interface IAuthApi {
  login(username: string, password: string): Promise<string>;
}
