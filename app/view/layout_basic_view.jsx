'use strict';

import LayoutBasicView from '../assets/layout_basic_view/LayoutBasicView.jsx';

export default function(data) {
  let item = data.item;

  let layoutBasicView = migi.preRender(
    <LayoutBasicView item={item}/>
  );

  return data.helper.start({
    title: '基本布局',
    css: '/layout_basic.css',
  }) + layoutBasicView + data.helper.end({
    js: '/layout_basic_view.js',
    config: {
      item,
    },
  });
};
