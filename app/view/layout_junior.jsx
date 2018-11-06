'use strict';

import LayoutJunior from '../assets/layout_junior/LayoutJunior.jsx';

export default function(data) {
  let col = data.col;
  let row = data.row;
  let num = data.num;

  let layoutJunior = migi.preRender(
    <LayoutJunior row={row}
                  col={col}
                  num={num}/>
  );

  return data.helper.start({
    title: '初级布局',
    css: '/layout_junior.css',
  }) + layoutJunior + data.helper.end({
    js: '/layout_junior.js',
    config: {
      row,
      col,
      num,
    },
  });
};
