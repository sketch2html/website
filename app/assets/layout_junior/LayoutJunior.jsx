'use strict';

class LayoutJunior extends migi.Component {
  constructor(data) {
    super(data);
  }

  @eval list
  @eval dis
  @bind row = 2
  @bind col = 2
  @bind direction = 0
  @eval area
  @bind directions = 0

  clickN() {
    this.click(0);
  }
  clickY() {
    this.click(1);
  }
  click(classify) {
    if(!this.list || !this.list.length || this.list.length < 4 || this.dis) {
      return;
    }
    this.dis = true;
    $net.postJSON({
      url: '/api/junior',
      body: {
        list: this.list,
        row: this.row,
        col: this.col,
        direction: this.direction,
        area: this.area,
        directions: this.directions,
        classify,
      },
    }, (res) => {
      this.dis = false;
      if(res.success) {
        //
      }
      else {
        alert(res.message || $util.ERROR_MESSAGE);
      }
    }, (err) => {
      this.dis = false;
      console.error(err);
      alert($util.ERROR_MESSAGE);
    });
  }
  hmGen() {
    let ta = this.ref.ta.element.value;
    let at = this.ref.at.element.value;
    if(ta && ta.trim() && at && at.trim()) {
      this.list = JSON.parse(ta);
      this.area = JSON.parse(at);
    }
  }
  render() {
    return <div class="g-wrap layout-basic">
      <div className="config">
        <label>行数</label><input type="range" min="2" max="5" step="1" value={this.row}/>
        <label>列数</label><input type="range" min="2" max="5" step="1" value={this.col}/>
        <label>行列类型</label><input type="range" min="0" max="1" step="1" value={this.direction}/>
        <label>行列切类型</label><input type="range" min="0" max="1" step="1" value={this.directions}/>
      </div>
      <div class="btn">
        <button disabled={this.dis} onClick={this.clickGen}>不确定</button>
        <button disabled={this.dis} onClick={this.clickY}>需要切分</button>
        <button disabled={this.dis} onClick={this.clickN}>无需切分</button>
      </div>
      <textarea ref="at" class="area">{JSON.stringify(this.area)}</textarea>
      <textarea ref="ta">{JSON.stringify(this.list)}</textarea>
      <button onClick={this.hmGen}>手动生成</button>
      <ul class="list">
        {
          (this.list || []).map(item => {
            return <li class={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.lineHeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutJunior;
