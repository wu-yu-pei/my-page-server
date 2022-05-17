const axios = require('axios')
class hiService {
  constructor() { }

  async keyword(keyword) {
    let url = `https://www.bing.com/AS/Suggestions?pt=msnedgentp&qry=${keyword}&cp=0&contentWidth=400&pc=U531&msbqf=false&cvid=d75a04de46c9427fbcfe6fc4c30fec6b`
    let res = await axios.get(url)
    return res
  }
}

module.exports = new hiService();
