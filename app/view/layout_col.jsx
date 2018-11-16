'use strict';

import LayoutCol from '../assets/layout_col/LayoutCol.jsx';

export default function(data) {

  let layoutCol = migi.preRender(
    <LayoutCol />
  );

  return data.helper.start({
    title: '列布局',
    css: '/layout_basic.css',
  }) + layoutCol + data.helper.end({
    js: '/layout_col.js',
    config: {
    },
  });
};
