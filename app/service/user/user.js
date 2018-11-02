'use strict';

const egg = require('egg');

class Service extends egg.Service {
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.user.User.findOne({
      attributes: [
        'id',
        'nickname',
        'sex',
        ['head_url', 'headUrl'],
        'sign',
        ['is_delete', 'isDelete'],
        ['create_time', 'createTime'],
        ['update_time', 'updateTime'],
      ],
      where: {
        id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async admin(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'admin_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.user.Admin.findOne({
      attributes: [
        'id',
        'level',
      ],
      where: {
        user_id: id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
