'use strict';

import PassportIndex from '../assets/passport_index/PassportIndex.jsx';

export default function(data) {

  let passportIndex = migi.preRender(<PassportIndex/>);

  return data.helper.start({
    title: '账户',
    css: '/passport_index.css',
  }) + passportIndex + data.helper.end({
    js: '/passport_index.js',
  });
};
