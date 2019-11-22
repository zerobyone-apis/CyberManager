export default class IntegrationBackend {

  private baseUrl = "http://localhost:3000/";
  private axios = require('axios');

  async send(method: string, data: any, route?: string) {
    this.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const config = {
      method: method,
      url: this.baseUrl,
      data: {
        data // This is the body part
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }
    let res = await this.axios(config);
    return res.data;
  }
}


