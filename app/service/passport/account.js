'use strict';

const egg = require('egg');
const uuidv4 = require('uuid/v4');
const Spark = require('spark-md5');

class Service extends egg.Service {
  async login(nickname, password, remember) {
    if(!nickname) {
      return {
        success: false,
        message: '用户名不能为空~',
      };
    }
    if(!password) {
      return {
        success: false,
        message: '密码不能为空~',
      };
    }
    const { app, ctx, service } = this;
    let check = await app.model.user.User.findOne({
      attributes: [
        'id'
      ],
      where: {
        nickname,
        password: Spark.hash(password + 'sketch2html'),
      },
      raw: true,
    });
    if(!check) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    let user = await service.user.user.info(check.id);
    if(user.isDelete) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    ctx.session.uid = user.id;
    ctx.session.nickname = user.nickname;
    ctx.session.headUrl = user.headUrl;
    if(!remember) {
      ctx.session.maxAge = 0;
    }
    return {
      success: true,
    };
  }

  async loginPhone(phone, password, remember) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    if(!password) {
      return {
        success: false,
        message: '密码不能为空~',
      };
    }
    const { app, ctx, service } = this;
    let check = await app.model.passport.Account.findOne({
      attributes: [
        ['user_id', 'userId']
      ],
      where: {
        name: phone,
        type: 0,
      },
      raw: true,
    });
    if(!check) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    check = await app.model.user.User.findOne({
      attributes: [
        'id'
      ],
      where: {
        id: check.userId,
        password: Spark.hash(password + 'sketch2html'),
      },
      raw: true,
    });
    if(!check) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    let user = await service.user.user.info(check.id);
    if(user.isDelete) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    ctx.session.uid = user.id;
    ctx.session.nickname = user.nickname;
    ctx.session.headUrl = user.headUrl;
    if(!remember) {
      ctx.session.maxAge = 0;
    }
    return {
      success: true,
    };
  }

  async loginEmail(email, password, remember) {
    if(!email || !/^[A-Za-z0-9\u4e00-\u9fa5]+@[\w-]+(\.[\w-]+)+$/.test(email)) {
      return {
        success: false,
        message: 'Email号不合法~',
      };
    }
    if(!password) {
      return {
        success: false,
        message: '密码不能为空~',
      };
    }
    const { app, ctx, service } = this;
    let check = await app.model.passport.Account.findOne({
      attributes: [
        ['user_id', 'userId']
      ],
      where: {
        name: email,
        type: 1,
      },
      raw: true,
    });
    if(!check) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    check = await app.model.user.User.findOne({
      attributes: [
        'id'
      ],
      where: {
        id: check.userId,
        password: Spark.hash(password + 'sketch2html'),
      },
      raw: true,
    });
    if(!check) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    let user = await service.user.user.info(check.id);
    if(user.isDelete) {
      return {
        success: false,
        message: '用户名和密码不匹配~',
      };
    }
    ctx.session.uid = user.id;
    ctx.session.nickname = user.nickname;
    ctx.session.headUrl = user.headUrl;
    if(!remember) {
      ctx.session.maxAge = 0;
    }
    return {
      success: true,
    };
  }

  async registerPhone(phone, password, code) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    if(!password) {
      return {
        success: false,
        message: '密码不能为空~',
      };
    }
    const { app, ctx } = this;
    let cacheKey = 'codeRegister_' + phone;
    let c = await app.redis.get(cacheKey);
    if(!c) {
      return {
        success: false,
        message: '验证码不合法~',
      };
    }
    c = JSON.parse(c);
    if(c.code !== code) {
      return {
        success: false,
        message: '验证码不合法~',
      };
    }
    let type = 0;
    let check = await app.model.passport.Account.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个账号已经注册过了哦~',
      };
    }
    let transactionUser = await app.model.user.transaction();
    let transactionPassport = await app.model.passport.transaction();
    try {
      let user = await app.model.user.User.create({
        nickname: uuidv4(),
        password: Spark.hash(password + 'sketch2html'),
      }, {
        transaction: transactionUser,
        raw: true,
      });
      user = user.toJSON();
      user.nickname = user.id;
      await Promise.all([
        app.model.passport.Account.create({
          type,
          name: phone,
          user_id: user.id,
        }, {
          transaction: transactionPassport,
          raw: true,
        }),
        app.model.user.User.update({
          nickname: user.id,
        }, {
          where: {
            id: user.id,
          },
          transaction: transactionUser,
          raw: true,
        })
      ]);
      await transactionUser.commit();
      await transactionPassport.commit();
      app.redis.del(cacheKey);
      ctx.session.uid = user.id;
      ctx.session.nickname = user.nickname;
      ctx.session.headUrl = user.head_url;
      let url = ctx.session.goto || app.config.host;
      delete ctx.session.goto;
      return {
        success: true,
        data: url,
      };
    }
    catch(e) {
      await transactionUser.rollback();
      await transactionPassport.rollback();
      ctx.logger.error(e.toString());
      return {
        success: false,
      };
    }
  }
  async registerEmail(email, password, code) {
    if(!email || !/^[A-Za-z0-9\u4e00-\u9fa5]+@[\w-]+(\.[\w-]+)+$/.test(email)) {
      return {
        success: false,
        message: 'Email不合法~',
      };
    }
    if(!password) {
      return {
        success: false,
        message: '密码不能为空~',
      };
    }
    const { app, ctx } = this;
    let cacheKey = 'codeRegister_' + email;
    let c = await app.redis.get(cacheKey);
    if(!c) {
      return {
        success: false,
        message: '验证码不合法~',
      };
    }
    c = JSON.parse(c);
    if(c.code !== code) {
      return {
        success: false,
        message: '验证码不合法~',
      };
    }
    let type = 1;
    let check = await app.model.passport.Account.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: email,
        type,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个账号已经注册过了哦~',
      };
    }
    let transactionUser = await app.model.user.transaction();
    let transactionPassport = await app.model.passport.transaction();
    try {
      let user = await app.model.user.User.create({
        nickname: uuidv4(),
        password: Spark.hash(password + 'sketch2html'),
      }, {
        transaction: transactionUser,
        raw: true,
      });
      user = user.toJSON();
      user.nickname = user.id;
      await Promise.all([
        app.model.passport.Account.create({
          type,
          name: email,
          user_id: user.id,
        }, {
          transaction: transactionPassport,
          raw: true,
        }),
        app.model.user.User.update({
          nickname: user.id,
        }, {
          where: {
            id: user.id,
          },
          transaction: transactionUser,
          raw: true,
        })
      ]);
      await transactionUser.commit();
      await transactionPassport.commit();
      app.redis.del(cacheKey);
      ctx.session.uid = user.id;
      ctx.session.nickname = user.nickname;
      ctx.session.headUrl = user.head_url;
      let url = ctx.session.goto || app.config.host;
      delete ctx.session.goto;
      return {
        success: true,
        data: url,
      };
    }
    catch(e) {
      await transactionUser.rollback();
      await transactionPassport.rollback();
      ctx.logger.error(e.toString());
      return {
        success: false,
      };
    }
  }
}

module.exports = Service;
