const keywordService = require("../service/keyword.service");

class keyWordController {
  async keyword(ctx, next) {
    const { keyword } = ctx.query
    let res = await keywordService.keyword(keyword);
    let arr = res.data.match(/query="([\w|\s|\u4e00-\u9fa5]*)"/ig)
    if (!arr) {
      return ctx.body = {
        keyword: []
      }
    }
    let result = arr.map((item, index) => {
      return item.replace(/"/g, '').split('=')[1]
    })
    ctx.body = {
      keyword: result
    }
  }
}

module.exports = new keyWordController();
