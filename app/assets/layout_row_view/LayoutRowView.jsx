'use strict';

import rowMl from '../../ml/row';

class LayoutColView extends migi.Component {
  constructor(data) {
    super(data);
    let item = this.props.item;
    this.list = item.data;
    this.row = item.row;
    this.col = item.col;
    let { param, forecast } = rowMl(this.list, this.row, this.col);
    this.param = param;
    this.forecast = forecast;
  }
  @eval list
  @bind row
  @bind col
  @eval param
  @eval forecast

  preview() {
    let ta = this.ref.ta.element.value;
    if(ta && ta.trim()) {
      this.list = JSON.parse(ta);
      let { param, forecast } = rowMl(this.list, this.row, this.col);
      this.param = param;
      this.forecast = forecast;
    }
  }
  render() {
    let { id } = this.props.item;
    return <div class="g-wrap layout-basic">
      <p>{JSON.stringify(this.list)}</p>
      <p>{JSON.stringify(this.param)}</p>
      <p>{this.forecast}</p>
      <div>
        <a href={id-1}>上一个</a>
        <a href={id+1}>下一个</a>
      </div>
      <div className="config">
        <label>行数</label><input type="range" min="2" max="5" step="1" value={this.row}/>
        <label>列数</label><input type="range" min="2" max="5" step="1" value={this.col}/>
      </div>
      <textarea ref="ta">{JSON.stringify(this.list)}</textarea>
      <button onClick={this.preview}>预览</button>
      <ul className="list">
        {
          (this.list || []).map(item => {
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
