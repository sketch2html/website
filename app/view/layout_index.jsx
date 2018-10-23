'use strict';

import LayoutIndex from '../assets/layout_index/LayoutIndex.jsx';

export default function(data) {

  let layoutIndex = migi.preRender(<LayoutIndex/>);

  return data.helper.start({
    title: '布局',
    css: '/layout_index.css',
  }) + layoutIndex + data.helper.end({
    js: '/layout_index.js',
  });
};
