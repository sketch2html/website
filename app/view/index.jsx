'use strict';

import Home from '../assets/index/Home.jsx';

export default function(data) {

  let home = migi.preRender(<Home/>);

  return data.helper.start({
    title: '首页',
    css: '/index.css',
  }) + home + data.helper.end({
    js: '/index.js',
  });
};
