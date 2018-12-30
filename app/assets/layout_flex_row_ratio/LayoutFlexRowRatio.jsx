'use strict';

class LayoutFlexRowRatio extends migi.Component {
  constructor(data) {
    super(data);
    this.on(migi.Event.DOM, () => {
      this.gen();
    });
  }

  @eval dis
  @bind w1
  @bind w2
  @bind space

  gen() {
    this.w1 = Math.floor(Math.random() * 90) + 10;
    this.w2 = Math.floor(Math.random() * 90) + 10;
    this.space = Math.floor(Math.random() * 50);
  }
  clickN() {
    this.click(0);
  }
  clickY() {
    this.click(1);
  }
  click(classify) {
    if(this.dis) {
      return;
    }
    this.dis = true;
    $net.postJSON({
      url: '/api/flexRowRatio',
      body: {
        w1: this.w1,
        w2: this.w2,
        space: this.space,
        classify,
      },
    }, (res) => {
      this.dis = false;
      if(res.success) {
        this.gen();
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

  render() {
    return <div class="g-wrap layout-basic">
      <div className="config">
        <label>宽1</label><input type="number" min="10" max="100" step="1" value={this.w1}/>
        <label>间距</label><input type="number" min="0" max="50" step="1" value={this.space}/>
        <label>宽2</label><input type="number" min="10" max="100" step="1" value={this.w2}/>
      </div>
      <div className="btn">
        <button disabled={this.dis} onClick={this.clickY}>是等分列</button>
        <button disabled={this.dis} onClick={this.clickN}>不是等分列</button>
      </div>
      <ul className="list">
        <li className="t0" style={`left:0;top:0;width:${this.w1}px;height:10px`}></li>
        <li className="t1" style={`left:${parseInt(this.w1) + parseInt(this.space)}px;top:0;width:${this.w2}px;height:10px`}></li>
      </ul>
    </div>;
  }
}

export default LayoutFlexRowRatio;
