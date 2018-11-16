'use strict';

const tf = require('@tensorflow/tfjs');

function parse(data, row, col) {
  // 行类型平均一致性，每行的话算平均性，再算绝对差，再除以最大权值（假设全部为1），范围为[0, 0.5]
  let types = [];
  for(let i = 0; i < col; i++) {
    let total = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      total += item.type;
    }
    let average = total / row;
    let sum = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      sum += Math.abs(average - item.type);
    }
    sum /= row;
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
      let res = 0;
      if(Math.abs(startH - item.y) < 2) {
        res++;
      }
      if(Math.abs(centerH - item.y - item.height * 0.5) < 2) {
        res++;
      }
      if(Math.abs(endH - item.y - item.height) < 2) {
        res++;
      }
      // 全对齐
      if(res === 3) {
        count += 2;
      }
      // 单对齐
      else if(res) {
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
      let res = 0;
      if(Math.abs(startV - item.x) < 2) {
        res++;
      }
      if(Math.abs(centerV - item.x - item.width * 0.5) < 2) {
        res++;
      }
      if(Math.abs(endV - item.x - item.width) < 2) {
        res++;
      }
      // 全对齐
      if(res === 3) {
        count += 2;
      }
      else if(res) {
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
  // 宽列一致性
  let widths = [];
  for(let i = 0; i < col; i++) {
    let total = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      total += item.width;
    }
    let average = total / row;
    let sum = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      sum += Math.abs(average - item.width);
    }
    sum /= total;
    widths.push(sum);
  }
  let widthRow = 0;
  widths.forEach(item => {
    widthRow = Math.max(widthRow, item);
  });
  // 高列一致性
  let heights = [];
  for(let i = 0; i < col; i++) {
    let total = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      total += item.height;
    }
    let average = total / row;
    let sum = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      sum += Math.abs(average - item.height);
    }
    sum /= total;
    heights.push(sum);
  }
  let heightRow = 0;
  heights.forEach(item => {
    heightRow = Math.max(heightRow, item);
  });
  // 字体列一致性
  let fontSizes = [];
  for(let i = 0; i < col; i++) {
    let total = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      total += item.fontSize;
    }
    let average = total / row;
    let sum = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
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
  // 行高列一致性
  let lineHeights = [];
  for(let i = 0; i < col; i++) {
    let total = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
      total += item.lineHeight;
    }
    let average = total / row;
    let sum = 0;
    for(let j = 0; j < row; j++) {
      let item = data[j * col + i];
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
  // 垂直间距一致性
  let marginV = 0;
  for(let i = 0; i < col; i++) {
    let max = 0;
    let min = 0;
    for(let j = 1; j < row; j++) {
      let item = data[j * col + i];
      let prev = data[j * col + i - 1];
      if(j > 1) {
        max = Math.max(max, Math.abs(item.y - prev.y - prev.height));
        min = Math.min(min, Math.abs(item.y - prev.y - prev.height));
      }
      else {
        max = min = Math.abs(item.y - prev.y - prev.height);
      }
    }
    let diff = max - min;
    diff /= max;
    if(isNaN(diff)) {
      diff = 0;
    }
    marginV = Math.max(marginV, diff);
  }

  return [row, col, type, alignH, alignV, alignDiff, alignHDiff, alignVDiff, distance / height, widthRow, heightRow, fontSizeRow, lineHeightRow, marginV];
}

const f = (x, w, b) => {
  const h = tf.matMul(x, w).add(b);
  return tf.sigmoid(h);
};

const w = tf.variable(tf.tensor2d([[3.5984905  ],
  [-0.2193544 ],
  [-2.5637941 ],
  [11.8561287 ],
  [16.106142  ],
  [-13.4363298],
  [-2.6990728 ],
  [-0.0631085 ],
  [-8.9729528 ],
  [-27.4104462],
  [0.1606676  ],
  [-29.1863232],
  [-29.3898277],
  [-18.9053612]]));
const b = tf.variable(tf.scalar(-20.524770736694336));

class LayoutColView extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    let { id, data, row, col } = this.props.item;
    let param = parse(data, row, col);
    let res = f([param], w, b);
    return <div class="g-wrap layout-basic">
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(param)}</p>
      <p>{res}</p>
      <div>
        <a href={id-1}>上一个</a>
        <a href={id+1}>下一个</a>
      </div>
      <ul className="list">
        {
          (data || []).map(item => {
            if(!item) {
              return <li/>;
            }
            return <li className={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.lineHeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutColView;
