'use strict';

class LayoutJunior extends migi.Component {
  constructor(data) {
    super(data);
    this.on(migi.Event.DOM, () => {
      this.gen();
    });
  }

  @bind list
  @bind dis
  @bind direction
  @bind num = 3
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
    let marginH = 10 + Math.floor(Math.random() * 100);
    let marginV = 10 + Math.floor(Math.random() * 100);
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
    b.x = a.x + a.width + (Math.random() > this.marginConsistency ? marginH : (10 + Math.floor(Math.random() * 100)));
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
    list.push(b);
    let c = {
      type: Math.random() > this.typeConsistency ? a.type : (Math.random() > 0.5 ? 1 : 0),
      width: Math.random() > this.widthConsistency ? a.width : (20 + Math.floor(Math.random() * 100)),
      height: Math.random() > this.heightConsistency ? a.height : (20 + Math.floor(Math.random() * 100)),
    };
    if(c.type) {
      c.fontSize = a.fontSize && Math.random() > this.fontConsistency ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
      c.lineHeight = a.fontSize && Math.random() > this.lineConsistency ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
    }
    else {
      c.fontSize = 0;
      c.lineHeight = 0;
    }
    start = Math.random() > this.startConsistency;
    center = Math.random() > this.centerConsistency;
    end = Math.random() > this.endConsistency;
    if(start && center || center && end || start && end) {
      start = center = end = true;
    }
    c.y = a.y + a.height + (Math.random() > this.marginConsistency ? marginV : (10 + Math.floor(Math.random() * 100)));
    if(start && end) {
      c.x = a.x;
      c.width = a.width;
    }
    else if(start) {
      c.x = a.x;
    }
    else if(end) {
      if(c.width <= a.width) {
        c.x = a.width - c.width;
      }
      else {
        c.x = a.x;
      }
    }
    else if(center) {
      if(c.width <= a.width) {
        c.x = (a.width - c.width) * 0.5;
      }
      else {
        c.x = a.x;
      }
    }
    else {
      c.x = Math.floor(Math.random() * 20);
    }
    list.push(c);
    if(parseInt(this.num) === 4) {
      let d = {
        type: Math.random() > this.typeConsistency ? a.type : (Math.random() > 0.5 ? 1 : 0),
        width: Math.random() > this.widthConsistency ? a.width : (20 + Math.floor(Math.random() * 100)),
        height: Math.random() > this.heightConsistency ? a.height : (20 + Math.floor(Math.random() * 100)),
      };
      if(d.type) {
        d.fontSize = a.fontSize && Math.random() > this.fontConsistency ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
        d.lineHeight = a.fontSize && Math.random() > this.lineConsistency ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
      }
      else {
        d.fontSize = 0;
        d.lineHeight = 0;
      }
      let start = Math.random() > this.startConsistency;
      let center = Math.random() > this.centerConsistency;
      let end = Math.random() > this.endConsistency;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      if(start && end) {
        d.y = c.y;
        d.height = c.height;
      }
      else if(start) {
        d.y = c.y;
      }
      else if(end) {
        if(d.height <= c.height) {
          d.y = c.height - d.height;
        }
        else {
          d.y = c.y;
        }
      }
      else if(center) {
        if(d.height <= c.height) {
          d.y = (c.height - d.height) * 0.5;
        }
        else {
          d.y = c.y;
        }
      }
      else {
        d.y = c.y + Math.floor(Math.random() * 20);
      }
      start = Math.random() > this.startConsistency;
      center = Math.random() > this.centerConsistency;
      end = Math.random() > this.endConsistency;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      if(start && end) {
        d.x = b.x;
        d.width = b.width;
      }
      else if(start) {
        d.x = b.x;
      }
      else if(end) {
        if(d.width <= b.width) {
          d.x = b.width - d.width;
        }
        else {
          d.x = b.x;
        }
      }
      else if(center) {
        if(d.width <= b.width) {
          d.x = (b.width - d.width) * 0.5;
        }
        else {
          d.x = b.x;
        }
      }
      else {
        d.x = b.x + Math.floor(Math.random() * 20);
      }
      list.push(d);
    }
    this.list = list;
  }
  clickN() {
    this.click(0);
  }
  clickRow() {
    this.click(1);
  }
  clickCol() {
    this.click(2);
  }
  click(classify) {
    if(this.dis) {
      return;
    }
    this.dis = true;
    $net.postJSON({
      url: '/api/2_2',
      body: {
        list: this.list,
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
      <div className="config">
        <label>数量</label><input type="range" min="3" max="4" step="1" value={this.num}/>
        <label>类型一致性</label><input type="range" min="0" max="1" step="0.1" value={this.typeConsistency}/>
        <label>宽度一致性</label><input type="range" min="0" max="1" step="0.1" value={this.widthConsistency}/>
        <label>高度一致性</label><input type="range" min="0" max="1" step="0.1" value={this.heightConsistency}/>
        <label>边距一致性</label><input type="range" min="0" max="1" step="0.1" value={this.marginConsistency}/>
        <label>开始一致性</label><input type="range" min="0" max="1" step="0.1" value={this.startConsistency}/>
        <label>中间一致性</label><input type="range" min="0" max="1" step="0.1" value={this.centerConsistency}/>
        <label>结尾一致性</label><input type="range" min="0" max="1" step="0.1" value={this.endConsistency}/>
        <label>字大一致性</label><input type="range" min="0" max="1" step="0.1" value={this.fontConsistency}/>
        <label>行高一致性</label><input type="range" min="0" max="1" step="0.1" value={this.lineConsistency}/>
      </div>
      <div class="btn">
        <button disabled={this.dis} onClick={this.clickN}>不成组</button>
        <button disabled={this.dis} onClick={this.clickCol}>2列</button>
        <button disabled={this.dis} onClick={this.clickRow}>2行</button>
        <button disabled={this.dis} onClick={this.clickGen}>不确定</button>
      </div>
      <p>{JSON.stringify(this.list)}</p>
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
