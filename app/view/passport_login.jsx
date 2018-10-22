'use strict';

import PassportLogin from '../assets/passport_login/PassportLogin.jsx';

export default function(data) {

  let passportLogin = migi.preRender(<PassportLogin/>);

  return data.helper.start({
    title: '登录',
    css: '/passport_login.css',
  }) + passportLogin + data.helper.end({
    js: '/passport_login.js',
  });
};
