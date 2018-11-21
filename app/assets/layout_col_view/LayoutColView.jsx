'use strict';

import colMl from '../../ml/col';

class LayoutColView extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    let { id, data, row, col } = this.props.item;
    let { param, forecast } = colMl(data, row, col);
    return <div class="g-wrap layout-basic">
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(param)}</p>
      <p>{forecast}</p>
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
