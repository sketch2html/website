'use strict';

import LayoutView from '../assets/layout_view/LayoutView.jsx';

export default function(data) {

  let layoutView = migi.preRender(
    <LayoutView data={data.data}/>
  );

  return data.helper.start({
    title: '布局预览',
    css: '/layout_detail.css',
  }) + layoutView + data.helper.end({
    js: '/layout_view.js',
    config: {
      data: data.data,
    },
  });
};
