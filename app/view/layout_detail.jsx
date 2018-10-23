'use strict';

import LayoutDetail from '../assets/layout_detail/LayoutDetail.jsx';

export default function(data) {
  let col = data.col;
  let row = data.row;
  let num = data.num;

  let layoutDetail = migi.preRender(
    <LayoutDetail col={col}
                  row={row}
                  num={num}/>
  );

  return data.helper.start({
    title: '布局',
    css: '/layout_detail.css',
  }) + layoutDetail + data.helper.end({
    js: '/layout_detail.js',
    config: {
      col,
      row,
      num,
    },
  });
};
