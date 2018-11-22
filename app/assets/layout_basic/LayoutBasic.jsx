'use strict';

class LayoutBasic extends migi.Component {
  constructor(data) {
    super(data);
    this.on(migi.Event.DOM, () => {
      this.gen();
    });
  }

  @bind list
  @bind dis
  @bind direction
  @bind num = 2
  @bind typeConsistency = 0.5
  @bind widthConsistency = 0.5
  @bind heightConsistency = 0.5
  @bind marginConsistency = 0.5
  @bind startConsistency = 0.5
  @bind centerConsistency = 0.5
  @bind endConsistency = 0.5
  @bind fontConsistency = 0.5
  @bind lineConsistency = 0.5

  gen() {
    let list = [];
    let a = {
      type: Math.random() > 0.5 ? 1 : 0,
      width: 20 + Math.floor(Math.random() * 100),
      height: 20 + Math.floor(Math.random() * 100),
      x: 0,
      y: 0,
    };
    if(a.type) {
      a.fontSize = 10 + Math.ceil(Math.random() * 20);
      a.lineHeight = 1 + Math.floor(Math.random() * 3);
    }
    else {
      a.fontSize = 0;
      a.lineHeight = 0;
    }
    list.push(a);
    this.direction = Math.random() > 0.5;
    let margin = 10 + Math.floor(Math.random() * 100);
    for(let i = 1; i < this.num; i++) {
      let last = list[list.length - 1];
      let b = {
        type: Math.random() > this.typeConsistency ? a.type : (Math.random() > 0.5 ? 1 : 0),
        width: Math.random() > this.widthConsistency ? a.width : (20 + Math.floor(Math.random() * 100)),
        height: Math.random() > this.heightConsistency ? a.height : (20 + Math.floor(Math.random() * 100)),
      };
      if(b.type) {
        b.fontSize = a.fontSize && Math.random() > this.fontConsistency ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
        b.lineHeight = a.fontSize && Math.random() > this.lineConsistency ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
      }
      else {
        b.fontSize = 0;
        b.lineHeight = 0;
      }
      let start = Math.random() > this.startConsistency;
      let center = Math.random() > this.centerConsistency;
      let end = Math.random() > this.endConsistency;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      if(this.direction) {
        b.x = last.x + last.width + (Math.random() > this.marginConsistency ? margin : (10 + Math.floor(Math.random() * 100)));
        if(start && end) {
          b.y = a.y;
          b.height = a.height;
        }
        else if(start) {
          b.y = a.y;
        }
        else if(end) {
          if(b.height <= a.height) {
            b.y = a.height - b.height;
          }
          else {
            b.y = a.y;
          }
        }
        else if(center) {
          if(b.height <= a.height) {
            b.y = (a.height - b.height) * 0.5;
          }
          else {
            b.y = a.y;
          }
        }
        else {
          b.y = Math.floor(Math.random() * 20);
        }
      }
      else {
        b.y = last.y + last.height + (Math.random() > this.marginConsistency ? margin : (10 + Math.floor(Math.random() * 100)));
        if(start && end) {
          b.x = a.x;
          b.width = a.width;
        }
        else if(start) {
          b.x = a.x;
        }
        else if(end) {
          if(b.width <= a.width) {
            b.x = a.width - b.width;
          }
          else {
            b.x = a.x;
          }
        }
        else if(center) {
          if(b.width <= a.width) {
            b.x = (a.width - b.width) * 0.5;
          }
          else {
            b.x = a.x;
          }
        }
        else {
          b.x = Math.floor(Math.random() * 20);
        }
      }
      list.push(b);
    }
    this.list = list;
  }
  clickY() {
    this.click(1);
  }
  clickN() {
    this.click(0);
  }
  click(classify) {
    if(this.dis) {
      return;
    }
    this.dis = true;
    $net.postJSON({
      url: '/api/basic',
      body: {
        list: this.list,
        direction: this.direction,
        num: this.num,
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
  clickGen() {
    this.gen();
  }
  render() {
    return <div class="g-wrap layout-basic">
      <div class="config">
        <label>数量</label><input type="range" min="2" max="5" step="1" value={this.num} />
        <label>类型一致性</label><input type="range" min="0" max="1" step="0.1" value={this.typeConsistency} />
        <label>宽度一致性</label><input type="range" min="0" max="1" step="0.1" value={this.widthConsistency} />
        <label>高度一致性</label><input type="range" min="0" max="1" step="0.1" value={this.heightConsistency} />
        <label>边距一致性</label><input type="range" min="0" max="1" step="0.1" value={this.marginConsistency} />
        <label>开始一致性</label><input type="range" min="0" max="1" step="0.1" value={this.startConsistency} />
        <label>中间一致性</label><input type="range" min="0" max="1" step="0.1" value={this.centerConsistency} />
        <label>结尾一致性</label><input type="range" min="0" max="1" step="0.1" value={this.endConsistency} />
        <label>字大一致性</label><input type="range" min="0" max="1" step="0.1" value={this.fontConsistency} />
        <label>行高一致性</label><input type="range" min="0" max="1" step="0.1" value={this.lineConsistency} />
      </div>
      <div class="btn">
        <button disabled={this.dis} onClick={this.clickY}>成组</button>
        <button disabled={this.dis} onClick={this.clickN}>不成组</button>
        <button disabled={this.dis} onClick={this.clickGen}>不确定</button>
      </div>
      <p>{JSON.stringify(this.list)}</p>
      <ul class="list">
        {
          (this.list || []).map(a => {
            return <li class={`t${a.type}`}
                       style={`left:${a.x}px;top:${a.y}px;width:${a.width}px;height:${a.height}px`}>{a.type
              ? (a.fontSize + ',' + a.lineHeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutBasic;
