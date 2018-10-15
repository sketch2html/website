/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

const map = require('../../map.json');

const R8232 = new RegExp(String.fromCharCode(8232), 'g');

module.exports = {
  getAssetUrl(url) {
    if(url.indexOf('//') > -1) {
      return url;
    }
    if(map[url.replace(/^\//, '')]) {
      return this.app.config.hostAssets + '/' + map[url.replace(/^\//, '')];
    }
    return '/public' + url;
  },
  ajaxJSON(data) {
    return data;
  },
  okJSON(data) {
    return {
      success: true,
      data,
    };
  },
  errorJSON(data) {
    if(typeof data === 'string') {
      data = {
        message: data,
      };
    }
    data = data || {};
    return {
      success: false,
      code: data.code,
      message: data.message,
      data: data.data,
    };
  },
  loginJSON() {
    return {
      success: false,
      code: 1000,
      message: '请先登录',
    };
  },
  autoSsl: function(url) {
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function(url, w, h, q) {
    url = url || '';
    url = url.trim();
    if(!/\/\/zhuanquan\./i.test(url)) {
      return this.autoSsl(url);
    }
    url = url.replace(/\.(\w+)-\d*_\d*_\d*/, '.$1');
    if(w === undefined && h === undefined && q === undefined) {
      return url;
    }
    url += '-' + (w ? w : '') + '_' + (h ? h : '') + '_' + (q ? q : '');
    return this.autoSsl(url);
  },
  start: function(data) {
    let uid = this.ctx.session && this.ctx.session.uid;
    return `<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta charset="UTF-8"/>
<title>${ '次元站' + (data.title ? '-' + data.title : '') }</title>
<link rel="icon" href="//zhuanquan.xin/ciyuan/eef93ddcf8e5955cba821a29a4573d73.png" type="image/x-icon">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<meta name="renderer" content="webkit"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<meta name="format-detection" content="telephone=no"/>
<meta name="format-detection" content="email=no"/>
<meta name="wap-font-scale" content="no"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<link rel="stylesheet" href="${this.getAssetUrl('/common.css')}"/>
${ (Array.isArray(data.css) ? data.css : [data.css]).filter((item) => {
  return item;
}).map((item) => {
  return `<link rel="stylesheet" href="${this.getAssetUrl(item)}"/>`;
}) }
</head>
<body>
<div id="g-top">
  <div class="g-wrap">
    <ul class="nav fn-clear">
      <li><a href="${ this.app.config.host }" class="index">沟通创作的次元~</a></li>
      <li><a href="${ this.app.config.hostAudio }" class="audio">音频</a></li>
      <li><a href="${ this.app.config.hostVideo }" class="video">视频</a></li>
      <li><a href="${ this.app.config.hostImage }" class="image">图绘</a></li>
      <li><a href="${ this.app.config.hostText }" class="text">文词</a></li>
    </ul>
    <form class="search">
      <input type="text" placeholder="请输入搜索内容" autocomplete="off" maxlength="40"/>
      <button>&#xe60c;确定</button>
    </form>
    <ul class="i fn-clear">
      ${ uid
        ? `<li><a href="${ this.app.config.hostMy }"><img src="${ this.img(this.ctx.session.headUrl || '//zhuanquan.xin/head/head.png', 64, 64, 80) }"/>${ this.ctx.session.nickname }</a></li>
          <li><a href="${ this.app.config.hostPassport + '/exit' }">退出</a></li>`
        : `<li><a href="${ this.app.config.hostPassport + '/login' }">登录</a></li>
          <li><a href="${ this.app.config.hostPassport + '/register' }">注册</a></li>` }
      <li><a href="#">约稿</a></li>
      <li><a href="${ this.app.config.hostUpload }" class="upload">投稿</a></li>
    </ul>
  </div>
</div>`;
  },
  end: function(data) {
    return `<script>var $CONFIG = {};</script>
<script>Object.assign($CONFIG, ${ this.stringify(data.config) })</script>
<script src="${this.getAssetUrl('/common.js')}" defer="defer"></script>
${ (Array.isArray(data.js) ? data.js : [data.js]).filter((item) => {
  return item;
}).map((item) => {
  return `<script src="${this.getAssetUrl(item)}" defer="defer"></script>`;
}) }
</body></html>`;
  },
  stringify: function(data) {
    if(data === undefined) {
      return 'undefined';
    }
    if(data === null) {
      return 'null';
    }
    return this.encode(JSON.stringify(data));
  },
  encode: function(str) {
    if(!str) {
      return '';
    }
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(R8232, '&#8232;');
  },
  $CONFIG: 'var $CONFIG = {};',
};
