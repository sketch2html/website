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
      if(Math.abs(startH - item.y) < 3) {
        count++;
      }
      if(Math.abs(centerH - item.y - item.height * 0.5) < 3) {
        count++;
      }
      if(Math.abs(endH - item.y - item.height) < 3) {
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
      if(Math.abs(startV - item.x) < 3) {
        count++;
      }
      if(Math.abs(centerV - item.x - item.width * 0.5) < 3) {
        count++;
      }
      if(Math.abs(endV - item.x - item.width) < 3) {
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
      if(Math.abs(startV - item.x) < 3) {
      }
      else if(Math.abs(centerV - item.x - item.width * 0.5) < 3) {
      }
      else if(Math.abs(endV - item.x - item.width) < 3) {
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

  return [row, col, type, alignH, alignV, alignDiff, alignVDiff, distance / height, widthRow, heightRow, fontSizeRow, lineHeightRow];
}

const f = (x, w, b) => {
  const h = tf.matMul(x, w).add(b);
  return tf.sigmoid(h);
};

const w = tf.variable(tf.tensor2d([[5.8946266  ],
  [-0.7705983 ],
  [-3.3163865 ],
  [6.0227733  ],
  [-1.4216534 ],
  [7.1699662  ],
  [-5.7411933 ],
  [-16.3118019],
  [-33.4609985],
  [-25.0945034],
  [-29.7213593],
  [-29.7530136]]));
const b = tf.variable(tf.scalar(-5.055537223815918));

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
