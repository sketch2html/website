'use strict';

import LayoutColView from '../assets/layout_col_view/LayoutColView.jsx';

export default function(data) {
  let item = data.item;

  let layoutColView = migi.preRender(
    <LayoutColView item={item}/>
  );

  return data.helper.start({
    title: '列布局预览',
    css: '/layout_basic.css',
  }) + layoutColView + data.helper.end({
    js: '/layout_col_view.js',
    config: {
      item,
    },
  });
};
