'use strict';

import PassportRegister from '../assets/passport_register/PassportRegister.jsx';

export default function(data) {

  let passportRegister = migi.preRender(<PassportRegister/>);

  return data.helper.start({
    title: '注册',
    css: '/passport_register.css',
  }) + passportRegister + data.helper.end({
    js: '/passport_register.js',
  });
};
