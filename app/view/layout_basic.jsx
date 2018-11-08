'use strict';

import LayoutBasic from '../assets/layout_basic/LayoutBasic.jsx';

export default function(data) {

  let layoutBasic = migi.preRender(
    <LayoutBasic />
  );

  return data.helper.start({
    title: '基本布局',
    css: '/layout_basic.css',
  }) + layoutBasic + data.helper.end({
    js: '/layout_basic.js',
    config: {
    },
  });
};
