'use strict';

const tf = require('@tensorflow/tfjs');

function parse(data, row, col) {
  // 列类型平均一致性，每行的话算平均性，再算绝对差，再除以最大权值（假设全部为1），范围为[0, 0.5]
  let types = [];
  for(let i = 0; i < row; i++) {
    let total = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      total += item.type;
    }
    let average = total / col;
    let sum = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      sum += Math.abs(average - item.type);
    }
    sum /= col;
    types.push(sum);
  }
  let type = 0;
  types.forEach(item => {
    type += item;
  });
  type /= types.length;
  // 间距比
  let height = 0;
  let distance = 0;
  for(let i = 1; i < row; i++) {
    let max = 0;
    for(let j = 0; j < col; j++) {
      let a = data[(i - 1) * col + j];
      let b = data[i * col + j];
      max = Math.max(max, b.y - a.y - a.height);
    }
    distance += max;
    if(i === row - 1) {
      for(let j = 0; j < col; j++) {
        let item = data[i * col + j];
        height = Math.max(height, item.y + item.height);
      }
    }
  }
  // 水平对齐一致性
  let alignHs = [];
  for(let i = 0; i < row; i++) {
    let startH = 0;
    let centerH = 0;
    let endH = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      startH += item.y;
      centerH += item.y + item.height * 0.5;
      endH += item.y + item.height;
    }
    startH /= col;
    centerH /= col;
    endH /= col;
    let count = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      if(Math.abs(startH - item.y) < 2) {
        count++;
      }
      if(Math.abs(centerH - item.y - item.height * 0.5) < 2) {
        count++;
      }
      if(Math.abs(endH - item.y - item.height) < 2) {
        count++;
      }
    }
    count /= col * 3;
    alignHs.push(count);
  }
  let alignH = 0;
  alignHs.forEach(item => {
    alignH += item;
  });
  alignH /= alignHs.length;
  // 垂直对齐一致性
  let alignVs = [];
  for(let i = 0; i < col; i++) {
    let startV = 0;
    let centerV = 0;
    let endV = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      startV += item.x;
      centerV += item.x + item.width * 0.5;
      endV += item.x + item.width;
    }
    startV /= row;
    centerV /= row;
    endV /= row;
    let count = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      if(Math.abs(startV - item.x) < 2) {
        count++;
      }
      if(Math.abs(centerV - item.x - item.width * 0.5) < 2) {
        count++;
      }
      if(Math.abs(endV - item.x - item.width) < 2) {
        count++;
      }
    }
    count /= row * 3;
    alignVs.push(count);
  }
  let alignV = 0;
  alignVs.forEach(item => {
    alignV += item;
  });
  alignV /= alignVs.length;
  // 水平对齐出格性，防止某一格完全不对齐且差距大，但其它格对齐
  let alignDiffHs = [];
  for(let i = 0; i < row; i++) {
    let startH = 0;
    let centerH = 0;
    let endH = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      startH += item.y;
      centerH += item.y + item.height * 0.5;
      endH += item.y + item.height;
    }
    startH /= col;
    centerH /= col;
    endH /= col;
    let count = 0;
    let sum = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      if(Math.abs(startH - item.y) < 2) {
      }
      else if(Math.abs(centerH - item.y - item.height * 0.5) < 2) {
      }
      else if(Math.abs(endH - item.y - item.height) < 2) {
      }
      else {
        let diff = Math.max(Math.abs(startH - item.y), Math.abs(endH - item.y - item.height));
        sum += diff;
        count++;
      }
    }
    sum /= count;
    if(isNaN(sum)) {
      sum = 0;
    }
    alignDiffHs.push(sum);
  }
  let alignHDiff = 0;
  alignDiffHs.forEach(item => {
    alignHDiff += item;
  });
  alignHDiff /= alignDiffHs.length;
  // 垂直对齐出格性，防止某一格完全不对齐且差距大，但其它格对齐
  let alignDiffVs = [];
  for(let i = 0; i < col; i++) {
    let startV = 0;
    let centerV = 0;
    let endV = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      startV += item.x;
      centerV += item.x + item.width * 0.5;
      endV += item.x + item.width;
    }
    startV /= row;
    centerV /= row;
    endV /= row;
    let count = 0;
    let sum = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      if(Math.abs(startV - item.x) < 2) {
      }
      else if(Math.abs(centerV - item.x - item.width * 0.5) < 2) {
      }
      else if(Math.abs(endV - item.x - item.width) < 2) {
      }
      else {
        let diff = Math.max(Math.abs(startV - item.x), Math.abs(endV - item.x - item.width));
        sum += diff;
        count++;
      }
    }
    sum /= count;
    if(isNaN(sum)) {
      sum = 0;
    }
    alignDiffVs.push(sum);
  }
  let alignVDiff = 0;
  alignDiffVs.forEach(item => {
    alignVDiff += item;
  });
  alignVDiff /= alignDiffVs.length;
  // 对齐提升
  let alignDiff = alignH - alignV;
  // 宽行一致性
  let widths = [];
  for(let i = 0; i < row; i++) {
    let total = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      total += item.width;
    }
    let average = total / col;
    let sum = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      sum += Math.abs(average - item.width);
    }
    sum /= total;
    widths.push(sum);
  }
  let widthRow = 0;
  widths.forEach(item => {
    widthRow = Math.max(widthRow, item);
  });
  // 高行一致性
  let heights = [];
  for(let i = 0; i < row; i++) {
    let total = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      total += item.height;
    }
    let average = total / col;
    let sum = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      sum += Math.abs(average - item.height);
    }
    sum /= total;
    heights.push(sum);
  }
  let heightRow = 0;
  heights.forEach(item => {
    heightRow = Math.max(heightRow, item);
  });
  // 字体行一致性
  let fontSizes = [];
  for(let i = 0; i < row; i++) {
    let total = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      total += item.fontSize;
    }
    let average = total / col;
    let sum = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      sum += Math.abs(average - item.fontSize);
    }
    sum /= total;
    if(total === 0) {
      sum = 0;
    }
    fontSizes.push(sum);
  }
  let fontSizeRow = 0;
  fontSizes.forEach(item => {
    fontSizeRow = Math.max(fontSizeRow, item);
  });
  // 行高行一致性
  let lineHeights = [];
  for(let i = 0; i < row; i++) {
    let total = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      total += item.lineHeight;
    }
    let average = total / col;
    let sum = 0;
    for(let j = 0; j < col; j++) {
      let item = data[i * col + j];
      sum += Math.abs(average - item.lineHeight);
    }
    sum /= total;
    if(total === 0) {
      sum = 0;
    }
    lineHeights.push(sum);
  }
  let lineHeightRow = 0;
  lineHeights.forEach(item => {
    lineHeightRow = Math.max(lineHeightRow, item);
  });
  // 水平间距一致性
  let marginH = 0;
  for(let i = 0; i < row; i++) {
    let max = 0;
    let min = 0;
    for(let j = 1; j < col; j++) {
      let item = data[i * col + j];
      let prev = data[i * col + j - 1];
      if(j > 1) {
        max = Math.max(max, Math.abs(item.x - prev.x - prev.width));
        min = Math.min(min, Math.abs(item.x - prev.x - prev.width));
      }
      else {
        max = min = Math.abs(item.x - prev.x - prev.width);
      }
    }
    let diff = max - min;
    diff /= max;
    if(isNaN(diff)) {
      diff = 0;
    }
    marginH = Math.max(marginH, diff);
  }

  return [row, col, type, alignH, alignV, alignDiff, alignHDiff, alignVDiff, distance / height, widthRow, heightRow, fontSizeRow, lineHeightRow, marginH];
}

const f = (x, w, b) => {
  const h = tf.matMul(x, w).add(b);
  return tf.sigmoid(h);
};

const w = tf.variable(tf.tensor2d([[3.9451959  ],
  [0.6164125  ],
  [-2.9863913 ],
  [3.6915784  ],
  [2.2784438  ],
  [2.4952114  ],
  [-3.9345748 ],
  [-3.2482851 ],
  [-13.7077465],
  [0.6327836  ],
  [-30.0983143],
  [-34.3679581],
  [-35.606144 ],
  [-18.7878437]]));
const b = tf.variable(tf.scalar(-6.413879871368408));

export default function(data, row, col) {
  let param = parse(data, row, col);
  let res = f([param], w, b);
  return {
    param,
    forecast: res.get(0, 0),
  };
}
