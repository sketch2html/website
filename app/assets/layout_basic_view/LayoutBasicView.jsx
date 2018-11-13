'use strict';

const tf = require('@tensorflow/tfjs');

function parse(data, direction) {
  let length = data.length;
  let tt = 0; // 类型
  let dt = 0; // 间距
  let wt = 0; // 宽度
  let ht = 0; // 高度
  let ast = 0; // 开始对齐
  let act = 0; // 中间对齐
  let aet = 0; // 结尾对齐
  let ft = 0; // 字体大小
  let lt = 0; // 行高
  data.forEach((item, i) => {
    tt += item.type;
    wt += item.width;
    ht += item.height;
    ft += item.fontSize;
    lt += item.lineHeight;
    if(i) {
      let prev = data[i - 1];
      if(direction) {
        dt += item.x - prev.x - prev.width;
      }
      else {
        dt += item.y - prev.y - prev.height;
      }
    }
    if(direction) {
      ast += item.y;
      act += (item.y + item.height) * 0.5;
      aet += item.y + item.height;
    }
    else {
      ast += item.x;
      act += (item.x + item.width) * 0.5;
      aet += item.x + item.width;
    }
  });
  let ta = tt / length;
  let wa = wt / length;
  let ha = ht / length;
  let asa = ast / length;
  let aca = act / length;
  let aea = aet / length;
  let fa = ft / length;
  let la = lt / length;
  let t = 0;
  let da = 0;
  let d = 0;
  let w = 0;
  let h = 0;
  let as = 0;
  let ac = 0;
  let ae = 0;
  let f = 0;
  let l = 0;
  if(direction) {
    da = dt / (length - 1);
  }
  else {
    da = dt / (length - 1);
  }
  data.forEach((item, i) => {
    t += Math.abs(item.type - ta);
    w += Math.abs(item.width - wa);
    h += Math.abs(item.height - ha);
    f += Math.abs(item.fontSize - fa);
    l += Math.abs(item.lineHeight - la);
    if(direction) {
      as += Math.abs(item.y - asa);
      ac += Math.abs((item.y + item.height) * 0.5 - aca);
      ae += Math.abs(item.y + item.height - aea);
    }
    else {
      as += Math.abs(item.x - asa);
      ac += Math.abs((item.x + item.width) * 0.5 - aca);
      ae += Math.abs(item.x + item.width - aea);
    }
    if(i) {
      let prev = data[i - 1];
      if(direction) {
        let n = item.x - prev.x - prev.width;
        d += Math.abs(n - da);
      }
      else {
        let n = item.y - prev.y - prev.height;
        d += Math.abs(n - da);
      }
    }
  });
  t /= tt;
  if(tt === 0) {
    t = 0;
  }
  t /= length;
  d /= dt;
  w /= wt;
  h /= ht;
  as /= ast;
  if(ast === 0) {
    as = 0;
  }
  ac /= act;
  if(act === 0) {
    ac = 0;
  }
  ae /= aet;
  if(aet === 0) {
    ae = 0;
  }
  f /= ft;
  if(ft === 0) {
    f = 0;
  }
  f /= length;
  l /= lt;
  if(lt === 0) {
    l = 0;
  }
  l /= length;
  let dn = da / length; // 间距数量比
  let dp = 0; //间距占总比
  if(direction) {
    dp = dt / (data[length - 1].x + data[length - 1].width);
  }
  else {
    dp = dt / (data[length - 1].y + data[length - 1].height);
  }
  return [t, dp, d, dn, w, h, as, ac, ae, f, l];
}

const fh = x => {
  const h = tf.matMul(x, wh).add(bh);
  return tf.sigmoid(h);
};
const fv = x => {
  const h = tf.matMul(x, wv).add(bv);
  return tf.sigmoid(h);
};

const wh = tf.variable(tf.tensor2d([[-5.5004706 ],
  [16.1486855 ],
  [-25.9938698],
  [-0.1383857 ],
  [-29.6136017],
  [19.7818375 ],
  [-1.9713895 ],
  [-33.3818283],
  [-33.3818283],
  [-46.3705101],
  [-28.0312786]]));
const bh = tf.variable(tf.scalar(0.850441575050354));
const wv = tf.variable(tf.tensor2d([[-5.1861753 ],
  [3.6597302  ],
  [-25.345993 ],
  [-0.2331975 ],
  [7.8225732  ],
  [-30.3689213],
  [2.095448   ],
  [-36.7115402],
  [-36.7115402],
  [-36.2328758],
  [-36.2700233]]));
const bv = tf.variable(tf.scalar(5.2938737869262695));

class LayoutBasic extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    let { id, data, direction } = this.props.item;
    let param = parse(data, direction);
    let res = direction ? fh([param]) : fv([param]);
    return <div className="g-wrap layout-basic">
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(param)}</p>
      <p>{res}</p>
      <div>
        <a href={id-1}>上一个</a>
        <a href={id+1}>下一个</a>
      </div>
      <ul className="list">
        {
          (data || []).map(a => {
            return <li className={`t${a.type}`}
                       style={`left:${a.x}px;top:${a.y}px;width:${a.width}px;height:${a.height}px`}>{a.type
              ? (a.fontSize + ',' + a.lineHeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutBasic;
