'use strict';

const tf = require('@tensorflow/tfjs');

function parseGroup(data) {
  // 类型的行列一致性
  let t0 = data[0].type;
  let t1 = data[1].type;
  let t2 = data[2].type;
  let t3 = data[3].type;
  let typeH;
  let typeV;
  if(t0 === t1 && t2 === t3 && t0 === t2) {
    typeH = typeV = 1;
  }
  else if(t0 === t1 && t2 === t3) {
    typeH = 0;
    typeV = 1;
  }
  else if(t0 === t2 && t1 === t3) {
    typeH = 1;
    typeV = 0;
  }
  // 交错的话水平有可能，垂直不可能
  else {
    typeH = 0.8;
    typeV = 0;
  }
  // 对齐一致性
  let alignHStart0 = (Math.abs(data[0].y - data[1].y) < 1) ? 1 : 0;
  let alignHCenter0 = (Math.abs(data[0].y + data[0].height / 2 - data[1].y - data[1].height / 2) < 1) ? 1 : 0;
  let alignHEnd0 = (Math.abs(data[0].y + data[0].height - data[1].y - data[1].height) < 1) ? 1 : 0;
  let alignHStart1 = (Math.abs(data[2].y - data[3].y) < 1) ? 1 : 0;
  let alignHCenter1 = (Math.abs(data[2].y + data[2].height / 2 - data[3].y - data[3].height / 2) < 1) ? 1 : 0;
  let alignHEnd1 = (Math.abs(data[2].y + data[2].height - data[3].y - data[3].height) < 1) ? 1 : 0;
  let alignVStart0 = (Math.abs(data[0].x - data[2].x) < 1) ? 1 : 0;
  let alignVCenter0 = (Math.abs(data[0].x + data[0].width / 2 - data[2].x - data[2].width / 2) < 1) ? 1 : 0;
  let alignVEnd0 = (Math.abs(data[0].x + data[0].width - data[2].x - data[2].width) < 1) ? 1 : 0;
  let alignVStart1 = (Math.abs(data[1].x - data[3].x) < 1) ? 1 : 0;
  let alignVCenter1 = (Math.abs(data[1].x + data[1].width / 2 - data[3].x - data[3].width / 2) < 1) ? 1 : 0;
  let alignVEnd1 = (Math.abs(data[1].x + data[1].width - data[3].x - data[3].width) < 1) ? 1 : 0;
  let alignProportionH = (alignHStart0 + alignHCenter0 + alignHEnd0 + alignHStart1 + alignHCenter1 + alignHEnd1) / 6;
  let alignProportionV = (alignVStart0 + alignVCenter0 + alignVEnd0 + alignVStart1 + alignVCenter1 + alignVEnd1) / 6;
  let alignDiffH = Math.abs(
    (alignHStart0 === alignHStart1 && alignHStart0 ? 1 : 0) +
    (alignHCenter0 === alignHCenter1 && alignHCenter0 ? 1 : 0) +
    (alignHEnd0 === alignHEnd1 && alignHEnd0 ? 1 : 0)) / 3;
  let alignDiffV = Math.abs(
    (alignVStart0 === alignVStart1 && alignVStart0 ? 1 : 0) +
    (alignVCenter0 === alignVCenter1 && alignVCenter0 ? 1 : 0) +
    (alignVEnd0 === alignVEnd1 && alignVEnd0 ? 1 : 0)) / 3;
  // 宽高一致性
  let widthProportionH0 = Math.min(data[0].width, data[1].width) / Math.max(data[0].width, data[1].width);
  let widthProportionH1 = Math.min(data[2].width, data[3].width) / Math.max(data[2].width, data[3].width);
  let widthProportionH = Math.abs(widthProportionH0 - widthProportionH1);
  let widthTotal = data[0].width + data[1].width + data[2].width + data[3].width;
  let widthDiffH = Math.abs(data[0].width + data[1].width - data[2].width - data[3].width) / widthTotal;
  widthProportionH = 1 - widthProportionH;
  widthDiffH = 1 - widthDiffH;
  let widthProportionV0 = Math.min(data[0].width, data[2].width) / Math.max(data[0].width, data[2].width);
  let widthProportionV1 = Math.min(data[1].width, data[3].width) / Math.max(data[1].width, data[3].width);
  let widthProportionV = Math.abs(widthProportionV0 - widthProportionV1);
  let widthDiffV = Math.abs(data[0].width + data[2].width - data[1].width - data[3].width) / widthTotal;
  widthProportionV = 1 - widthProportionV;
  widthDiffV = 1 - widthDiffV;
  let heightProportionH0 = Math.min(data[0].height, data[1].height) / Math.max(data[0].height, data[1].height);
  let heightProportionH1 = Math.min(data[2].height, data[3].height) / Math.max(data[2].height, data[3].height);
  let heightProportionH = Math.abs(heightProportionH0 - heightProportionH1);
  let heightTotal = data[0].height + data[1].height + data[2].height + data[3].height;
  let heightDiffH = Math.abs(data[0].height + data[1].height - data[2].height - data[3].height) / heightTotal;
  heightProportionH = 1 - heightProportionH;
  heightDiffH = 1 - heightDiffH;
  let heightProportionV0 = Math.min(data[0].height, data[2].height) / Math.max(data[0].height, data[2].height);
  let heightProportionV1 = Math.min(data[1].height, data[3].height) / Math.max(data[1].height, data[3].height);
  let heightProportionV = Math.abs(heightProportionV0 - heightProportionV1);
  let heightDiffV = Math.abs(data[0].height + data[2].height - data[1].height - data[3].height) / heightTotal;
  heightProportionV = 1 - heightProportionV;
  heightDiffV = 1 - heightDiffV;
  // 字体一致性
  let f0 = data[0].fontSize;
  let f1 = data[1].fontSize;
  let f2 = data[2].fontSize;
  let f3 = data[3].fontSize;
  let fontH;
  let fontV;
  if(f0 === f1 && f2 === f3 && f0 === f2) {
    fontH = fontV = 1;
  }
  else if(f0 === f1 && f2 === f3) {
    fontH = 0;
    fontV = 1;
  }
  else if(f0 === f2 && f1 === f3) {
    fontH = 1;
    fontV = 0;
  }
  else {
    fontH = 0.8;
    fontV = 0;
  }
  // 行高一致性
  let l0 = data[0].lineHeight;
  let l1 = data[1].lineHeight;
  let l2 = data[2].lineHeight;
  let l3 = data[3].lineHeight;
  let lineHeightH;
  let lineHeightV;
  if(l0 === l1 && l2 === l3 && l0 === l2) {
    lineHeightH = lineHeightV = 1;
  }
  else if(l0 === l1 && l2 === l3) {
    lineHeightH = 0;
    lineHeightV = 1;
  }
  else if(l0 === l2 && l1 === l3) {
    lineHeightH = 1;
    lineHeightV = 0;
  }
  else {
    lineHeightH = 0.8;
    lineHeightV = 0;
  }

  return [typeH, typeV, alignProportionH, alignDiffH, alignProportionV, alignDiffV, widthProportionH * typeH, widthDiffH * typeH, heightProportionH * typeH, heightDiffH * typeH, widthProportionV * typeV, widthDiffV * typeV, heightProportionV * typeV, heightDiffV * typeV, fontH * typeH, fontV * typeV, lineHeightH * typeH, lineHeightV * typeV];
}

const fg = x => {
  const h = tf.matMul(x, wg).add(bg);
  return tf.sigmoid(h);
};

const wg = tf.variable(tf.tensor2d([[-21.1958179],
  [-13.0152102],
  [10.3109026 ],
  [-1.0974942 ],
  [3.2570064  ],
  [1.9402376  ],
  [-6.4263539 ],
  [0.7086717  ],
  [-3.757272  ],
  [4.3953128  ],
  [6.0726032  ],
  [0.7254003  ],
  [8.4788876  ],
  [-4.6601763 ],
  [20.7788258 ],
  [3.4431961  ],
  [6.6746426  ],
  [1.4292228  ]]));
const bg = tf.variable(tf.scalar(-13.102179527282715));

class LayoutJuniorView extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    let { id, data } = this.props.item;
    let param = parseGroup(data);
    let res = fg([param]);

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
