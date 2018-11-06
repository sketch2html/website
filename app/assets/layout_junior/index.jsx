'use strict';

import './index.less';

import LayoutJunior from './LayoutJunior.jsx';

let layoutJunior = migi.preExist(
  <LayoutJunior
    row={$CONFIG.row}
    col={$CONFIG.col}
    num={$CONFIG.num}/>
);
