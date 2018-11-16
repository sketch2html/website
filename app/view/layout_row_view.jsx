'use strict';

import LayoutRowView from '../assets/layout_row_view/LayoutRowView.jsx';

export default function(data) {
  let item = data.item;

  let layoutRowView = migi.preRender(
    <LayoutRowView item={item}/>
  );

  return data.helper.start({
    title: '列布局预览',
    css: '/layout_basic.css',
  }) + layoutRowView + data.helper.end({
    js: '/layout_row_view.js',
    config: {
      item,
    },
  });
};
