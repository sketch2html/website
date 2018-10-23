'use strict';

import './index.less';

import LayoutDetail from './LayoutDetail.jsx';

let layoutDetail = migi.preExist(
  <LayoutDetail
    col={$CONFIG.col}
    row={$CONFIG.row}
    num={$CONFIG.num}/>
);
