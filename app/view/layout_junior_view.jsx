'use strict';

import LayoutJuniorView from '../assets/layout_junior_view/LayoutJuniorView.jsx';

export default function(data) {
  let item = data.item;

  let layoutJuniorView = migi.preRender(
    <LayoutJuniorView item={item}/>
  );

  return data.helper.start({
    title: '初级布局预览',
    css: '/layout_basic.css',
  }) + layoutJuniorView + data.helper.end({
    js: '/layout_junior_view.js',
    config: {
      item,
    },
  });
};
