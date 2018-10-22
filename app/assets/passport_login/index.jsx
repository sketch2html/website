'use strict';

import './index.less';

import qs from 'query-string';

import PassportLogin from './PassportLogin.jsx';

let search = qs.parse(location.search);

let passportLogin = migi.preExist(
  <PassportLogin goto={ search.goto }/>
);
