'use strict';

import './index.less';

import 'es5-shim';
import 'migi';

import util from './util.jsx';
import net from './net.jsx';
// import './global.jsx';

window.requestAnimationFrame = function() {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) {
      window.setTimeout(callback, 16.7);
    };
}();

if(!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

window.$util = util;
window.$net = net;
