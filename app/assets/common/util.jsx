'use strict';

import cookie from './cookie';

let util = {
  ERROR_MESSAGE: '人气大爆发，请稍后再试。',
  autoSsl(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img(url, w, h, q) {
    url = url || '';
    url = url.trim();
    if(!/\/\/zhuanquan\./i.test(url)) {
      return util.autoSsl(url);
    }
    url = url.replace(/\.(\w+)-\d*_\d*_\d*/, '.$1');
    if(w === undefined && h === undefined && q === undefined) {
      return url;
    }
    url += '-' + (w ? w : '') + '_' + (h ? h : '') + '_' + (q ? q : '');
    return util.autoSsl(url);
  },
  setClipboard(s) {
    let input = document.createElement('input');
    input.setAttribute('style', 'position:fixed;left:-9999rem;top:-9999rem;');
    input.value = s;
    document.body.appendChild(input);
    input.focus();
    input.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(input);
    jsBridge.toast('复制成功');
  },
  isBottom(offset) {
    offset = offset || 30;
    let y = this.scrollY();
    let WIN_HEIGHT = document.documentElement.clientHeight;
    let HEIGHT = document.body.clientHeight;
    return y + WIN_HEIGHT + offset > HEIGHT;
  },
  scrollY(v) {
    if(v !== undefined) {
      window.scroll(0, v);
    }
    return document.documentElement.scrollTop || window.pageYOffset || window.scrollY || 0;
  },
};

cookie(util);

export default util;
