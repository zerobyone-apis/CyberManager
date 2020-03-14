export default class IntegrationBackend {
  private baseUrl = 'https://cyber-manager-backend-pg.herokuapp.com';
  // private baseUrl = 'https://cyber-manager-backend-pg.herokuapp.com/'; -> Postgres = Latest v3
  // private baseUrl = 'https://cyber-manager-back-v2.herokuapp.com'; -> Mysql = v2
  // private baseUrl = 'http://localhost:3000';
  private axios = require('axios');

  async send(method: string, data?: any, route?: string) {
    this.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const config = {
      method: method,
      url: this.baseUrl + (route == undefined ? '' : route),
      data: {
        data // This is the body part
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    let res = await this.axios(config);
    return res.data;
  }
}
