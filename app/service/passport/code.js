'use strict';

const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const egg = require('egg');
const Spark = require('spark-md5');
const SMSClient = require('@alicloud/sms-sdk');

const TEMPLATE = {
  '1': 'SMS_80275178', // 注册
  '2': 'SMS_80275177', // 忘记密码
  '3': 'SMS_80275182', // 绑定手机
};

class Service extends egg.Service {
  async registerPhone(phone) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    const { app, } = this;
    let check = await app.model.passport.Account.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个账号已经注册过了哦~',
      };
    }
    let code = Math.floor(Math.random() * 10000) + '';
    if(code.length < 4) {
      code = '0000' + code;
      code = code.slice(-4);
    }
    let cacheKey = 'codeRegister_' + phone;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(code));
    let smsClient = new SMSClient({
      accessKeyId: app.config.aliyun.sms.accessKeyId,
      secretAccessKey: app.config.aliyun.sms.secretAccessKey,
    });
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '转圈Circling',
      TemplateCode: TEMPLATE[1] || 'SMS_80275178',
      TemplateParam: '{"code":"' + code + '"}',
    });
    return {
      success: res.Code === 'OK',
    };
  }

  async registerEmail(email) {
    if(!email || !/^[A-Za-z0-9\u4e00-\u9fa5]+@[\w-]+(\.[\w-]+)+$/.test(email)) {
      return {
        success: false,
        message: 'Email不合法~',
      };
    }
    const { app, ctx, } = this;
    let check = await app.model.passport.Account.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: email,
        type: 0,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个邮箱已经注册过了哦~',
      };
    }
    let code = Math.floor(Math.random() * 10000) + '';
    if(code.length < 4) {
      code = '0000' + code;
      code = code.slice(-4);
    }
    let cacheKey = 'codeRegister_' + email;
    let exist = await app.redis.get(cacheKey);
    if(exist) {
      exist = JSON.parse(exist);
      exist.count = exist.count || 1;
      if(exist.count > 2) {
        return {
          success: false,
          message: '这个邮箱发送验证码过于频繁~',
        };
      }
      exist.count++;
    }
    else {
      exist = { code, count: 1, };
    }
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(exist));
    let timestamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    let uuid = uuidv4();
    let data = `AccessKeyId=${ app.config.aliyun.dm.accessKeyId }`
      + `&AccountName=${ encodeURIComponent('passport@sketch2html.net') }&Action=SingleSendMail&AddressType=1&Format=JSON`
      + `&FromAlias=${ encodeURIComponent('sketch2html.net') }&ReplyToAddress=false&SignatureMethod=HMAC-SHA1`
      + `&SignatureNonce=${ uuid }&SignatureVersion=1.0&Subject=${ encodeURIComponent('邮箱注册验证码') }`
      + `&TextBody=${ encodeURIComponent('您的邮箱注册验证码为' + code + '，10分钟内有效。\n本邮件为系统自动生成，请勿回复。') }`
      + `&Timestamp=${ encodeURIComponent(timestamp) }&ToAddress=${ encodeURIComponent(email) }&Version=2015-11-23`;
    let str = encodeURIComponent(data);
    let signature = 'POST&' + encodeURIComponent('/') + '&' + str;
    let hmac = crypto.createHmac('sha1', app.config.aliyun.dm.secretAccessKey + '&');
    let Signature = hmac.update(signature).digest('base64');
    data += '&Signature=' + encodeURIComponent(Signature);
    let res = await ctx.curl('https://dm.aliyuncs.com', {
      method: 'POST',
      dataType: 'json',
      gzip: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length,
      },
      data,
    });
    if(res && res.data && !res.data.Code) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }
}

module.exports = Service;
