'use strict';

const tf = require('@tensorflow/tfjs');

function parseR(data) {
  let [a, b, c, d] = data;
  // 对齐一致性
  let alignHStart0 = (Math.abs(a.y - b.y) < 3) ? 1 : 0;
  let alignHCenter0 = (Math.abs(a.y + a.height / 2 - b.y - b.height / 2) < 3) ? 1 : 0;
  let alignHEnd0 = (Math.abs(a.y + a.height - b.y - b.height) < 3) ? 1 : 0;
  let alignHStart1 = (Math.abs(c.y - d.y) < 3) ? 1 : 0;
  let alignHCenter1 = (Math.abs(c.y + c.height / 2 - d.y - d.height / 2) < 3) ? 1 : 0;
  let alignHEnd1 = (Math.abs(c.y + c.height - d.y - d.height) < 3) ? 1 : 0;
  let alignH0 = (alignHStart0 + alignHCenter0 + alignHEnd0) > 0 ? 1 : 0;
  let alignH1 = (alignHStart1 + alignHCenter1 + alignHEnd1) > 0 ? 1 : 0;
  let alignH = (alignH0 + alignH1) * 0.5;
  // 间距比
  let height = Math.max(c.y + c.height, d.y + d.height);
  let distance = Math.min(c.y, d.y) - Math.max(a.y + a.height, b.y + b.height);

  return [alignH, distance / height];
}

function parseC(data) {
  let [a, b, c, d] = data;
  // 对齐一致性
  let alignVStart0 = (Math.abs(a.x - c.x) < 3) ? 1 : 0;
  let alignVCenter0 = (Math.abs(a.x + a.width / 2 - c.x - c.width / 2) < 3) ? 1 : 0;
  let alignVEnd0 = (Math.abs(a.x + a.width - c.x - c.width) < 3) ? 1 : 0;
  let alignVStart1 = (Math.abs(b.x - d.x) < 3) ? 1 : 0;
  let alignVCenter1 = (Math.abs(b.x + b.width / 2 - d.x - d.width / 2) < 3) ? 1 : 0;
  let alignVEnd1 = (Math.abs(b.x + b.width - d.x - d.width) < 3) ? 1 : 0;
  let alignV0 = (alignVStart0 + alignVCenter0 + alignVEnd0) > 0 ? 1 : 0;
  let alignV1 = (alignVStart1 + alignVCenter1 + alignVEnd1) > 0 ? 1 : 0;
  let alignV = (alignV0 + alignV1) * 0.5;
  // 间距比
  let height = Math.max(c.y + c.height, d.y + d.height);
  let distance = Math.min(c.y, d.y) - Math.max(a.y + a.height, b.y + b.height);

  return [alignV, distance / height];
}

function parseR2(data) {
  let [a, b, c, d] = data;
  // 类型的行列一致性
  let t0 = a.type;
  let t1 = b.type;
  let t2 = c.type;
  let t3 = d.type;
  let typeH;
  if(t0 === t1 && t2 === t3 && t0 === t2) {
    typeH = 1;
  }
  else if(t0 === t1 && t2 === t3) {
    typeH = 0;
  }
  else if(t0 === t2 && t1 === t3) {
    typeH = 1;
  }
  // 交错的话水平有可能，垂直不可能
  else {
    typeH = 1;
  }
  // 对齐一致性
  let alignHStart0 = (Math.abs(a.y - b.y) < 3) ? 1 : 0;
  let alignHCenter0 = (Math.abs(a.y + a.height / 2 - b.y - b.height / 2) < 3) ? 1 : 0;
  let alignHEnd0 = (Math.abs(a.y + a.height - b.y - b.height) < 3) ? 1 : 0;
  let alignHStart1 = (Math.abs(c.y - d.y) < 3) ? 1 : 0;
  let alignHCenter1 = (Math.abs(c.y + c.height / 2 - d.y - d.height / 2) < 3) ? 1 : 0;
  let alignHEnd1 = (Math.abs(c.y + c.height - d.y - d.height) < 3) ? 1 : 0;
  let alignH0 = (alignHStart0 + alignHCenter0 + alignHEnd0) > 0 ? 1 : 0;
  let alignH1 = (alignHStart1 + alignHCenter1 + alignHEnd1) > 0 ? 1 : 0;
  let alignH = (alignH0 + alignH1) * 0.5;
  let alignVStart0 = (Math.abs(a.x - c.x) < 3) ? 1 : 0;
  let alignVCenter0 = (Math.abs(a.x + a.width / 2 - c.x - c.width / 2) < 3) ? 1 : 0;
  let alignVEnd0 = (Math.abs(a.x + a.width - c.x - c.width) < 3) ? 1 : 0;
  let alignVStart1 = (Math.abs(b.x - d.x) < 3) ? 1 : 0;
  let alignVCenter1 = (Math.abs(b.x + b.width / 2 - d.x - d.width / 2) < 3) ? 1 : 0;
  let alignVEnd1 = (Math.abs(b.x + b.width - d.x - d.width) < 3) ? 1 : 0;
  let alignDiff = (alignHStart0 + alignHCenter0 + alignHEnd0 + alignHStart1 + alignHCenter1 + alignHEnd1) / 6
    - (alignVStart0 + alignVCenter0 + alignVEnd0 + alignVStart1 + alignVCenter1 + alignVEnd1) / 6;
  // 间距比
  let height = Math.max(c.y + c.height, d.y + d.height);
  let distance = Math.min(c.y, d.y) - Math.max(a.y + a.height, b.y + b.height);
  // 宽一致性
  let widthProportionH0 = Math.min(a.width, b.width) / Math.max(a.width, b.width);
  let widthProportionH1 = Math.min(c.width, d.width) / Math.max(c.width, d.width);
  let widthProportionH = Math.abs(widthProportionH0 - widthProportionH1);
  let widthTotal = a.width + b.width + c.width + d.width;
  let widthDiffH = Math.abs(a.width + b.width - c.width - d.width) / widthTotal;
  let widthProportionV0 = Math.min(a.width, c.width) / Math.max(a.width, c.width);
  let widthProportionV1 = Math.min(b.width, d.width) / Math.max(b.width, d.width);
  let widthProportionV = Math.abs(widthProportionV0 - widthProportionV1);
  let widthDiffV = Math.abs(a.width + c.width - b.width - d.width) / widthTotal;
  // 高一致性
  let heightProportionH0 = Math.min(a.height, b.height) / Math.max(a.height, b.height);
  let heightProportionH1 = Math.min(c.height, d.height) / Math.max(c.height, d.height);
  let heightProportionH = Math.abs(heightProportionH0 - heightProportionH1);
  let heightTotal = a.height + b.height + c.height + d.height;
  let heightDiffH = Math.abs(a.height + b.height - c.height - d.height) / heightTotal;
  let heightProportionV0 = Math.min(a.height, c.height) / Math.max(a.height, c.height);
  let heightProportionV1 = Math.min(b.height, d.height) / Math.max(b.height, d.height);
  let heightProportionV = Math.abs(heightProportionV0 - heightProportionV1);
  let heightDiffV = Math.abs(a.height + c.height - b.height - d.height) / heightTotal;
  // 字体一致性
  let fontProportionH0 = Math.min(a.fontSize, b.fontSize) / Math.max(a.fontSize, b.fontSize);
  let fontProportionH1 = Math.min(c.fontSize, d.fontSize) / Math.max(c.fontSize, d.fontSize);
  if(isNaN(fontProportionH0)) {
    fontProportionH0 = 0;
  }
  if(isNaN(fontProportionH1)) {
    fontProportionH1 = 0;
  }
  let fontProportionH = Math.abs(fontProportionH0 - fontProportionH1);
  let fontTotal = a.fontSize + b.fontSize + c.fontSize + d.fontSize;
  let fontDiffH = Math.abs(a.fontSize + b.fontSize - c.fontSize - d.fontSize) / fontTotal;
  if(isNaN(fontDiffH)) {
    fontDiffH = 0;
  }
  //行高一致性
  let lineHeightProportionH0 = Math.min(a.lineHeight, b.lineHeight) / Math.max(a.lineHeight, b.lineHeight);
  let lineHeightProportionH1 = Math.min(c.lineHeight, d.lineHeight) / Math.max(c.lineHeight, d.lineHeight);
  if(isNaN(lineHeightProportionH0)) {
    lineHeightProportionH0 = 0;
  }
  if(isNaN(lineHeightProportionH1)) {
    lineHeightProportionH1 = 0;
  }
  let lineHeightProportionH = Math.abs(lineHeightProportionH0 - lineHeightProportionH1);
  let lineHeightTotal = a.lineHeight + b.lineHeight + c.lineHeight + d.lineHeight;
  let lineHeightDiffH = Math.abs(a.lineHeight + b.lineHeight - c.lineHeight - d.lineHeight) / lineHeightTotal;
  if(isNaN(lineHeightDiffH)) {
    lineHeightDiffH = 0;
  }

  return [
    typeH,
    alignH,
    alignDiff,
    distance / height,
    widthProportionH,
    widthDiffH,
    widthProportionV,
    widthDiffV,
    heightProportionH,
    heightDiffH,
    heightProportionV,
    heightDiffV,
    fontProportionH,
    fontDiffH,
    lineHeightProportionH,
    lineHeightDiffH
  ];
}

function parseC2(data) {
  let [a, b, c, d] = data;
  // 类型的行列一致性
  let t0 = a.type;
  let t1 = b.type;
  let t2 = c.type;
  let t3 = d.type;
  let typeV;
  if(t0 === t1 && t2 === t3 && t0 === t2) {
    typeV = 1;
  }
  else if(t0 === t1 && t2 === t3) {
    typeV = 1;
  }
  else if(t0 === t2 && t1 === t3) {
    typeV = 0;
  }
  // 交错的话水平有可能，垂直不可能
  else {
    typeV = 0;
  }
  // 对齐一致性
  let alignHStart0 = (Math.abs(a.y - b.y) < 3) ? 1 : 0;
  let alignHCenter0 = (Math.abs(a.y + a.height / 2 - b.y - b.height / 2) < 3) ? 1 : 0;
  let alignHEnd0 = (Math.abs(a.y + a.height - b.y - b.height) < 3) ? 1 : 0;
  let alignHStart1 = (Math.abs(c.y - d.y) < 3) ? 1 : 0;
  let alignHCenter1 = (Math.abs(c.y + c.height / 2 - d.y - d.height / 2) < 3) ? 1 : 0;
  let alignHEnd1 = (Math.abs(c.y + c.height - d.y - d.height) < 3) ? 1 : 0;
  let alignVStart0 = (Math.abs(a.x - c.x) < 3) ? 1 : 0;
  let alignVCenter0 = (Math.abs(a.x + a.width / 2 - c.x - c.width / 2) < 3) ? 1 : 0;
  let alignVEnd0 = (Math.abs(a.x + a.width - c.x - c.width) < 3) ? 1 : 0;
  let alignVStart1 = (Math.abs(b.x - d.x) < 3) ? 1 : 0;
  let alignVCenter1 = (Math.abs(b.x + b.width / 2 - d.x - d.width / 2) < 3) ? 1 : 0;
  let alignVEnd1 = (Math.abs(b.x + b.width - d.x - d.width) < 3) ? 1 : 0;
  let alignV0 = (alignVStart0 + alignVCenter0 + alignVCenter0) > 0 ? 1 : 0;
  let alignV1 = (alignVStart1 + alignVCenter1 + alignVCenter1) > 0 ? 1 : 0;
  let alignV = (alignV0 + alignV1) * 0.5;
  let alignDiff = (alignHStart0 + alignHCenter0 + alignHEnd0 + alignHStart1 + alignHCenter1 + alignHEnd1) / 6
    - (alignVStart0 + alignVCenter0 + alignVEnd0 + alignVStart1 + alignVCenter1 + alignVEnd1) / 6;
  // 间距比
  let height = Math.max(c.y + c.height, d.y + d.height);
  let distance = Math.min(c.y, d.y) - Math.max(a.y + a.height, b.y + b.height);
  // 宽一致性
  let widthProportionH0 = Math.min(a.width, b.width) / Math.max(a.width, b.width);
  let widthProportionH1 = Math.min(c.width, d.width) / Math.max(c.width, d.width);
  let widthProportionH = Math.abs(widthProportionH0 - widthProportionH1);
  let widthTotal = a.width + b.width + c.width + d.width;
  let widthDiffH = Math.abs(a.width + b.width - c.width - d.width) / widthTotal;
  let widthProportionV0 = Math.min(a.width, c.width) / Math.max(a.width, c.width);
  let widthProportionV1 = Math.min(b.width, d.width) / Math.max(b.width, d.width);
  let widthProportionV = Math.abs(widthProportionV0 - widthProportionV1);
  let widthDiffV = Math.abs(a.width + c.width - b.width - d.width) / widthTotal;
  // 高一致性
  let heightProportionH0 = Math.min(a.height, b.height) / Math.max(a.height, b.height);
  let heightProportionH1 = Math.min(c.height, d.height) / Math.max(c.height, d.height);
  let heightProportionH = Math.abs(heightProportionH0 - heightProportionH1);
  let heightTotal = a.height + b.height + c.height + d.height;
  let heightDiffH = Math.abs(a.height + b.height - c.height - d.height) / heightTotal;
  let heightProportionV0 = Math.min(a.height, c.height) / Math.max(a.height, c.height);
  let heightProportionV1 = Math.min(b.height, d.height) / Math.max(b.height, d.height);
  let heightProportionV = Math.abs(heightProportionV0 - heightProportionV1);
  let heightDiffV = Math.abs(a.height + c.height - b.height - d.height) / heightTotal;
  // 字体一致性
  let fontProportionV0 = Math.min(a.fontSize, c.fontSize) / Math.max(a.fontSize, c.fontSize);
  let fontProportionV1 = Math.min(b.fontSize, d.fontSize) / Math.max(b.fontSize, d.fontSize);
  if(isNaN(fontProportionV0)) {
    fontProportionV0 = 0;
  }
  if(isNaN(fontProportionV1)) {
    fontProportionV1 = 0;
  }
  let fontProportionV = Math.abs(fontProportionV0 - fontProportionV1);
  let fontTotal = a.fontSize + b.fontSize + c.fontSize + d.fontSize;
  let fontDiffV = Math.abs(a.fontSize + c.fontSize - b.fontSize - d.fontSize) / fontTotal;
  if(isNaN(fontDiffV)) {
    fontDiffV = 0;
  }
  //行高一致性
  let lineHeightProportionV0 = Math.min(a.lineHeight, c.lineHeight) / Math.max(a.lineHeight, c.lineHeight);
  let lineHeightProportionV1 = Math.min(b.lineHeight, d.lineHeight) / Math.max(b.lineHeight, d.lineHeight);
  if(isNaN(lineHeightProportionV0)) {
    lineHeightProportionV0 = 0;
  }
  if(isNaN(lineHeightProportionV1)) {
    lineHeightProportionV1 = 0;
  }
  let lineHeightProportionV = Math.abs(lineHeightProportionV0 - lineHeightProportionV1);
  let lineHeightTotal = a.lineHeight + b.lineHeight + c.lineHeight + d.lineHeight;
  let lineHeightDiffV = Math.abs(a.lineHeight + c.lineHeight - b.lineHeight - d.lineHeight) / lineHeightTotal;
  if(isNaN(lineHeightDiffV)) {
    lineHeightDiffV = 0;
  }

  return [
    typeV,
    alignV,
    alignDiff,
    distance / height,
    widthProportionH,
    widthDiffH,
    widthProportionV,
    widthDiffV,
    heightProportionH,
    heightDiffH,
    heightProportionV,
    heightDiffV,
    fontProportionV,
    fontDiffV,
    lineHeightProportionV,
    lineHeightDiffV
  ];
}

const f = (x, w, b) => {
  const h = tf.matMul(x, w).add(b);
  return tf.sigmoid(h);
};

const wr = tf.variable(tf.tensor2d([[23.035593  ],
  [-27.4424324]]));
const br = tf.variable(tf.scalar(-8.452698707580566));
const wc = tf.variable(tf.tensor2d([[25.6908035 ],
  [-23.8063335]]));
const bc = tf.variable(tf.scalar(-12.542346954345703));
const wr2 = tf.variable(tf.tensor2d([[-0.5308695 ],
  [17.5614605 ],
  [-7.8105054 ],
  [-19.3898907],
  [-9.907896  ],
  [-14.3755426],
  [-9.4416132 ],
  [1.2254139  ],
  [4.1676316  ],
  [-43.8375931],
  [11.1716566 ],
  [-46.17099  ],
  [-4.2270479 ],
  [-40.2687073],
  [-7.5690603 ],
  [-26.9588718]]));
const br2 = tf.variable(tf.scalar(-7.559813022613525));
const wc2 = tf.variable(tf.tensor2d([[-0.9523919 ],
  [12.1504555 ],
  [10.5009851 ],
  [-1.8719809 ],
  [-22.324955 ],
  [10.9452019 ],
  [-21.8907318],
  [-39.7294464],
  [-4.9418693 ],
  [10.313468  ],
  [-5.0294595 ],
  [-17.630682 ],
  [-5.2817626 ],
  [-21.8739567],
  [-6.5472002 ],
  [-3.9467888 ]]));
const bc2 = tf.variable(tf.scalar(-7.363872051239014));

class LayoutJuniorView extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    let { id, data } = this.props.item;
    let paramR = parseR(data);
    let paramC = parseC(data);
    let paramR2 = parseR2(data);
    let paramC2 = parseC2(data);
    let fr = f([paramR], wr, br);
    let fc = f([paramC], wc, bc);
    let fr2 = f([paramR2], wr2, br2);
    let fc2 = f([paramC2], wc2, bc2);

    return <div class="g-wrap layout-basic">
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(paramR)}</p>
      <p>{JSON.stringify(paramC)}</p>
      <p>{JSON.stringify(paramR2)}</p>
      <p>{fr}</p>
      <p>{fc}</p>
      <p>{fr2}</p>
      <p>{fc2}</p>
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
            return <li class={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.lineHeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutJuniorView;
