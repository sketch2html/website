/**
 * Created by army8735 on 2017/10/13.
 */

'use strict';

const uuidv4 = require('uuid/v4');
const TRACE_ID = Symbol('Context#tranceId');

module.exports = {
  get tranceId() {
    if(!this[TRACE_ID]) {
      this[TRACE_ID] = uuidv4().replace(/-/g, '');
    }
    return this[TRACE_ID];
  },
};