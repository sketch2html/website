'use strict';

import LayoutRow from '../assets/layout_row/LayoutRow.jsx';

export default function(data) {

  let layoutRow = migi.preRender(
    <LayoutRow />
  );

  return data.helper.start({
    title: '行布局',
    css: '/layout_basic.css',
  }) + layoutRow + data.helper.end({
    js: '/layout_row.js',
    config: {
    },
  });
};
