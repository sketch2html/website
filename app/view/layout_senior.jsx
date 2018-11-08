'use strict';

import LayoutSenior from '../assets/layout_senior/LayoutSenior.jsx';

export default function(data) {
  let col = data.col;
  let row = data.row;
  let num = data.num;

  let layoutJunior = migi.preRender(
    <LayoutSenior row={row}
                  col={col}
                  num={num}/>
  );

  return data.helper.start({
    title: '高级布局',
    css: '/layout_junior.css',
  }) + layoutJunior + data.helper.end({
    js: '/layout_senior.js',
    config: {
      row,
      col,
      num,
    },
  });
};
