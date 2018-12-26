'use strict';

class LayoutRow extends migi.Component {
  constructor(data) {
    super(data);
    this.on(migi.Event.DOM, () => {
      this.gen();
    });
  }

  @eval list
  @eval dis
  @bind row = 2
  @bind col = 2
  @bind typeConsistency = 0.5
  @bind widthConsistencyH = 0.5
  @bind widthConsistencyV = 0.5
  @bind heightConsistencyH = 0.5
  @bind heightConsistencyV = 0.5
  @bind marginConsistencyH = 0.5
  @bind marginConsistencyV = 0.5
  @bind startConsistencyH = 0.5
  @bind startConsistencyV = 0.5
  @bind centerConsistencyH = 0.5
  @bind centerConsistencyV = 0.5
  @bind endConsistencyH = 0.5
  @bind endConsistencyV = 0.5
  @bind fontConsistencyH = 0.5
  @bind fontConsistencyV = 0.5
  @bind lineConsistencyH = 0.5
  @bind lineConsistencyV = 0.5

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
    let maxHeight = a.height;
    for(let i = 1; i < this.col; i++) {
      let last = list[list.length - 1];
      let b = {
        type: Math.random() > this.typeConsistency ? a.type : (Math.random() > 0.5 ? 1 : 0),
        width: Math.random() > this.widthConsistencyH ? a.width : (20 + Math.floor(Math.random() * 100)),
        height: Math.random() > this.heightConsistencyH ? a.height : (20 + Math.floor(Math.random() * 100)),
      };
      maxHeight = Math.max(maxHeight, b.height);
      if(b.type) {
        b.fontSize = a.fontSize && Math.random() > this.fontConsistencyH ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
        b.lineHeight = a.fontSize && Math.random() > this.lineConsistencyH ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
      }
      else {
        b.fontSize = 0;
        b.lineHeight = 0;
      }
      let start = Math.random() > this.startConsistencyH;
      let center = Math.random() > this.centerConsistencyH;
      let end = Math.random() > this.endConsistencyH;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      b.x = last.x + last.width + (Math.random() > this.marginConsistencyH ? marginH : (10 + Math.floor(Math.random() * 100)));
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
    }
    let c = {
      type: Math.random() > this.typeConsistency ? a.type : (Math.random() > 0.5 ? 1 : 0),
      width: Math.random() > this.widthConsistencyV ? a.width : (20 + Math.floor(Math.random() * 100)),
      height: Math.random() > this.heightConsistencyV ? a.height : (20 + Math.floor(Math.random() * 100)),
    };
    if(c.type) {
      c.fontSize = a.fontSize && Math.random() > this.fontConsistencyV ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
      c.lineHeight = a.fontSize && Math.random() > this.lineConsistencyV ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
    }
    else {
      c.fontSize = 0;
      c.lineHeight = 0;
    }
    let start = Math.random() > this.startConsistencyV;
    let center = Math.random() > this.centerConsistencyV;
    let end = Math.random() > this.endConsistencyV;
    if(start && center || center && end || start && end) {
      start = center = end = true;
    }
    c.y = maxHeight + (Math.random() > this.marginConsistencyV ? marginV : (10 + Math.floor(Math.random() * 100)));
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
    for(let i = 1; i < this.col; i++) {
      let last = list[i];
      let d = {
        type: Math.random() > this.typeConsistency ? a.type : (Math.random() > 0.5 ? 1 : 0),
        width: Math.random() > this.widthConsistencyV ? a.width : (20 + Math.floor(Math.random() * 100)),
        height: Math.random() > this.heightConsistencyH ? a.height : (20 + Math.floor(Math.random() * 100)),
      };
      if(d.type) {
        d.fontSize = a.fontSize && Math.random() > this.fontConsistencyH ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
        d.lineHeight = a.fontSize && Math.random() > this.lineConsistencyH ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
      }
      else {
        d.fontSize = 0;
        d.lineHeight = 0;
      }
      let start = Math.random() > this.startConsistencyH;
      let center = Math.random() > this.centerConsistencyH;
      let end = Math.random() > this.endConsistencyH;
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
          d.y = c.y + c.height - d.height;
        }
        else {
          d.y = c.y;
        }
      }
      else if(center) {
        if(d.height <= c.height) {
          d.y = c.y + (c.height - d.height) * 0.5;
        }
        else {
          d.y = c.y;
        }
      }
      else {
        d.y = c.y + Math.floor(Math.random() * 20);
      }
      start = Math.random() > this.startConsistencyV;
      center = Math.random() > this.centerConsistencyV;
      end = Math.random() > this.endConsistencyV;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      if(start && end) {
        d.x = last.x;
        d.width = last.width;
      }
      else if(start) {
        d.x = last.x;
      }
      else if(end) {
        if(d.width <= last.width) {
          d.x = last.x + last.width - d.width;
        }
        else {
          d.x = last.x;
        }
      }
      else if(center) {
        if(d.width <= last.width) {
          d.x = last.x + (last.width - d.width) * 0.5;
        }
        else {
          d.x = last.x;
        }
      }
      else {
        d.x = last.x + Math.floor(Math.random() * 20);
      }
      if(d.x < c.width) {
        d.x = c.width;
      }
      list.push(d);
    }
    this.list = list;
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
      url: '/api/row',
      body: {
        list: this.list,
        row: this.row,
        col: this.col,
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
  hmGen() {
    let ta = this.ref.ta.element.value;
    if(ta && ta.trim()) {
      this.list = JSON.parse(ta);
    }
  }
  render() {
    return <div class="g-wrap layout-basic">
      <div className="config">
        <label>行数</label><input type="range" min="2" max="5" step="1" value={this.row}/>
        <label>列数</label><input type="range" min="2" max="5" step="1" value={this.col}/>
        <label>类型一致性</label><input type="range" min="0" max="1" step="0.1" value={this.typeConsistency}/>
        <label>宽度一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.widthConsistencyH}/>
        <label>宽度一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.widthConsistencyV}/>
        <label>高度一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.heightConsistencyH}/>
        <label>高度一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.heightConsistencyV}/>
        <label>边距一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.marginConsistencyH}/>
        <label>边距一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.marginConsistencyV}/>
        <label>开始一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.startConsistencyH}/>
        <label>开始一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.startConsistencyV}/>
        <label>中间一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.centerConsistencyH}/>
        <label>中间一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.centerConsistencyV}/>
        <label>结尾一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.endConsistencyH}/>
        <label>结尾一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.endConsistencyV}/>
        <label>字大一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.fontConsistencyH}/>
        <label>字大一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.fontConsistencyV}/>
        <label>行高一致性H</label><input type="range" min="0" max="1" step="0.1" value={this.lineConsistencyH}/>
        <label>行高一致性V</label><input type="range" min="0" max="1" step="0.1" value={this.lineConsistencyV}/>
      </div>
      <div className="btn">
        <button disabled={this.dis} onClick={this.clickGen}>不确定</button>
        <button disabled={this.dis} onClick={this.clickY}>是成组行</button>
        <button disabled={this.dis} onClick={this.clickN}>不是成组行</button>
      </div>
      <textarea ref="ta">{JSON.stringify(this.list)}</textarea>
      <button onClick={this.hmGen}>手动生成</button>
      <ul className="list">
        {
          (this.list || []).map(item => {
            return <li className={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.lineHeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutRow;
