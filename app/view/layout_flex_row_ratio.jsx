'use strict';

import LayoutFlexRowRatio from '../assets/layout_flex_row_ratio/LayoutFlexRowRatio.jsx';

export default function(data) {

  let layoutFlexRowRatio = migi.preRender(
    <LayoutFlexRowRatio />
  );

  return data.helper.start({
    title: '列等比',
    css: '/layout_basic.css',
  }) + layoutFlexRowRatio + data.helper.end({
    js: '/layout_flex_row_ratio.js',
    config: {
    },
  });
};
