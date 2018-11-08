'use strict';

class LayoutBasic extends migi.Component {
  constructor(data) {
    super(data);
    this.on(migi.Event.DOM, () => {
      this.gen();
    });
  }

  @bind list
  @bind direction
  @bind num
  @bind dis

  gen() {
    this.list = [];
    this.num = 2 + Math.floor(Math.random() * 3);
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
      if(a.height > a.fontSize * a.lineHeight * 2) {
        let mod = a.height % (a.fontSize * a.lineHeight);
        a.height -= mod;
        a.singleLine = false;
        a.type = 2;
      }
      else if(a.height = a.fontSize * a.lineHeight * 2) {
        a.singleLine = false;
        a.type = 2;
      }
      else {
        a.height = a.fontSize * a.lineHeight;
        a.singleLine = true;
      }
    }
    this.list.push(a);
    this.direction = Math.random() > 0.5;
    let margin = 10 + Math.floor(Math.random() * 100);
    for(let i = 1; i < this.num; i++) {
      let last = this.list[this.list.length - 1];
      let b = {
        type: Math.random() > 0.2 ? a.type : (Math.random() > 0.5 ? 1 : 0),
        width: Math.random() > 0.5 ? a.width : (20 + Math.floor(Math.random() * 100)),
        height: Math.random() > 0.5 ? a.height : (20 + Math.floor(Math.random() * 100)),
      };
      if(b.type) {
        if(b.type === 2 && b.type === a.type) {
          b.fontSize = Math.random() > 0.2 ? a.fontSize : 10 + Math.ceil(Math.random() * 20);
          b.lineHeight = Math.random() > 0.2 ? a.lineHeight : 1 + Math.floor(Math.random() * 3);
        }
        else {
          b.fontSize = 10 + Math.ceil(Math.random() * 20);
          b.lineHeight = 1 + Math.floor(Math.random() * 3);
          if(b.height > b.fontSize * b.lineHeight * 2) {
            let mod = b.height % (b.fontSize * b.lineHeight);
            b.height -= mod;
            b.singleLine = false;
            b.type = 2;
          }
          else if(b.height = b.fontSize * b.lineHeight * 2) {
            b.singleLine = false;
            b.type = 2;
          }
          else {
            b.height = b.fontSize * b.lineHeight;
            b.singleLine = true;
          }
        }
        if(!b.fontSize) {
          b.fontSize = 10 + Math.ceil(Math.random() * 20);
          b.lineHeight = 1 + Math.floor(Math.random() * 3);
        }
      }
      let start = Math.random() > 0.5;
      let center = Math.random() > 0.5;
      let end = Math.random() > 0.5;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      if(this.direction) {
        b.x = last.x + last.width + (Math.random() > 0.2 ? margin : (10 + Math.floor(Math.random() * 100)));
        if(start && end) {
          b.y = a.y;
          b.height = a.height;
          if(a.fontSize) {
            b.fontSize = a.fontSize;
            b.lineHeight = a.lineHeight;
            b.singleLine = a.singleLine;
          }
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
        }
        else {
          b.y = Math.floor(Math.random() * 20);
        }
      }
      else {
        b.y = last.y + last.height + (Math.random() > 0.2 ? margin : (10 + Math.floor(Math.random() * 100)));
        if(start && end) {
          b.x = a.x;
          b.width = a.width;
          if(a.fontSize) {
            b.fontSize = a.fontSize;
            b.lineHeight = a.lineHeight;
            b.singleLine = a.singleLine;
          }
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
        }
        else {
          b.x = Math.floor(Math.random() * 20);
        }
      }
      this.list.push(b);
    }
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
      url: '/api/d1',
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
