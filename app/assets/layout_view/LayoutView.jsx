'use strict';

class LayoutView extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    let { data, classify } = this.props.item;

    let alignHStart0 = (Math.abs(data[0].y - data[1].y) < 1) ? 1 : 0;
    let alignHCenter0 = (Math.abs(data[0].y + data[0].height / 2 - data[1].y - data[1].height / 2) < 1) ? 1 : 0;
    let alignHEnd0 = (Math.abs(data[0].y + data[0].height - data[1].y - data[1].height) < 1) ? 1 : 0;
    let alignHStart1 = 1;
    let alignHCenter1 = 1;
    let alignHEnd1 = 1;
    if(data[3]) {
      alignHStart1 = (Math.abs(data[2].y - data[3].y) < 1) ? 1 : 0;
      alignHCenter1 = (Math.abs(data[2].y + data[2].height / 2 - data[3].y - data[3].height / 2) < 1) ? 1 : 0;
      alignHEnd1 = (Math.abs(data[2].y + data[2].height - data[3].y - data[3].height) < 1) ? 1 : 0;
    }
    let alignVStart0 = (Math.abs(data[0].x - data[2].x) < 1) ? 1 : 0;
    let alignVCenter0 = (Math.abs(data[0].x + data[2].width / 2 - data[2].x - data[2].width / 2) < 1) ? 1 : 0;
    let alignVEnd0 = (Math.abs(data[0].x + data[0].width - data[2].x - data[2].width) < 1) ? 1 : 0;
    let alignVStart1 = 1;
    let alignVCenter1 = 1;
    let alignVEnd1 = 1;
    if(data[3]) {
      alignVStart1 = (Math.abs(data[1].x - data[3].x) < 1) ? 1 : 0;
      alignVCenter1 = (Math.abs(data[1].x + data[1].width / 2 - data[3].x - data[3].width / 2) < 1) ? 1 : 0;
      alignVEnd1 = (Math.abs(data[1].x + data[1].width - data[3].x - data[3].width) < 1) ? 1 : 0;
    }
    let alignV = (alignVStart0 + alignVCenter0 + alignVEnd0 + alignVStart1 + alignVCenter1 + alignVEnd1) / 6;
    let alignH = (alignHStart0 + alignHCenter0 + alignHEnd0 + alignHStart1 + alignHCenter1 + alignHEnd1) / 6;

    let x = {
      classify,
    };
    x.alignHStart0 = alignHStart0;
    x.alignHCenter0 = alignHCenter0;
    x.alignHEnd0 = alignHEnd0;
    x.alignHStart1 = alignHStart1;
    x.alignHCenter1 = alignHCenter1;
    x.alignHEnd1 = alignHEnd1;
    x.alignVStart0 = alignVStart0;
    x.alignVCenter0 = alignVCenter0;
    x.alignVEnd0 = alignVEnd0;
    x.alignVStart1 = alignVStart1;
    x.alignVCenter1 = alignVCenter1;
    x.alignVEnd1 = alignVEnd1;
    x.alignH = alignH;
    x.alignV = alignV;

    let t0 = data[0].type > 0;
    let t1 = data[1].type > 0;
    let t2 = data[2].type > 0;
    let t3 = data[3] ? data[3].type > 0 : null;

    if(classify) {
      let y0 = data[0].y + data[0].height;
      let y1 = data[1].y + data[1].height;
      let y2 = data[2].y;
      let y3 = data[3] ? data[3].y : y2;

      // 种类一致性；横竖；最短距离；对齐性变化
      x.typeDiff = ((t0 === t1 ? 1 : 0) + (t2 === t3 ? 1 : 0)) / 2;
      x.distance = Math.min(y2, y3) - Math.max(y0, y1);
      x.align = alignV - alignH;
    }
    else {
      let x0 = data[0].x + data[0].width;
      let x1 = data[1].x;
      let x2 = data[2].x + data[2].width;
      let x3 = data[3] ? data[3].x : x1;

      x.typeDiff = ((t0 === t2 ? 1 : 0) + (t1 === t3 ? 1 : 0)) / 2;
      x.distance = Math.min(x1, x3) - Math.max(x0, x2);
      x.align = alignH - alignV;
    }

    return <div class="g-wrap layout-detail">
      <p>{JSON.stringify(x)}</p>
      <ul className="list">
        {
          (data || []).map(item => {
            return <li class={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.fontWeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutView;
