'use strict';

const tf = require('@tensorflow/tfjs');
const modelRow = require('./row');
const modelCol = require('./col');

function parse(data, row, col, direction, area, directions) {
  let forecast = 0;
  // 行
  if(direction === 0) {
    let res = modelRow(data, row, col);
    forecast = res.forecast;
  }
  // 列
  else {
    let res = modelCol(data, row, col);
    forecast = res.forecast;
  }
  let nRow = area.length;
  let nCol = area[0].length;
  let nData = [];
  area.forEach(list => {
    list.forEach(i => {
      nData.push(data[i]);
    });
  });
  let nForecast = 0;
  if(directions === 0) {
    let res = modelRow(nData, nRow, nCol);
    nForecast = res.forecast;
  }
  else {
    let res = modelCol(nData, nRow, nCol);
    nForecast = res.forecast;
  }
  return [forecast >= 0.5 ? 1 : 0, nForecast >= 0.5 ? 1 : 0, forecast, nForecast];
}

const f = (x, w, b) => {
  const h = tf.matMul(x, w).add(b);
  return tf.sigmoid(h);
};

const w = tf.variable(tf.tensor2d([
  -2.0379836559295654,
  4.21529483795166,
  -15.983718872070312,
  4.755427837371826 ], [4, 1]));
const b = tf.variable(tf.scalar(4.21529483795166));

module.exports = function(data, row, col, direction, area, directions) {
  let param = parse(data, row, col, direction, area, directions);
  let res = f([param], w, b);
  return {
    param,
    forecast: res.get(0, 0),
  };
};
