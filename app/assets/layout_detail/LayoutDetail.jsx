'use strict';

class LayoutDetail extends migi.Component {
  constructor(data) {
    super(data);
    this.on(migi.Event.DOM, () => {
      this.gen();
    });
  }

  @bind list
  @bind dis
  @bind hAlign
  @bind vAlign

  gen() {
    let col = this.props.col;
    let row = this.props.row;
    let num = this.props.num;
    let hMargin = 10 + Math.floor(Math.random() * 50);
    let vMargin = 10 + Math.floor(Math.random() * 50);
    let hAlign = [];
    let vAlign = [];
    let list = [];
    for(let i = 0; i < num; i++) {
      let item = {
        type: Math.random() > 0.5 ? 1 : 0,
        width: 10 + Math.floor(Math.random() * 100),
        height: 10 + Math.floor(Math.random() * 100),
      };
      if(item.type) {
        item.fontSize = 10 + Math.ceil(Math.random() * 20);
        item.fontWeight = 200;
        item.lineHeight = 1 + Math.floor(Math.random() * 3);
        let r = Math.random();
        if(r > 0.66) {
          item.fontWeight += 200;
        }
        else if(r > 0.33) {
          item.fontWeight += 500;
        }
        if(item.height > item.fontSize * item.lineHeight * 2) {
          let mod = item.height % (item.fontSize * item.lineHeight);
          item.height -= mod;
          item.singleLine = false;
          item.type = 2;
        }
        else if(item.height = item.fontSize * item.lineHeight * 2) {
          item.singleLine = false;
          item.type = 2;
        }
        else {
          item.height = item.fontSize * item.lineHeight;
          item.singleLine = true;
        }
      }
      list.push(item);
    }
    let x = 0;
    let y = 0;
    for(let i = 0; i < row; i++) {
      let start = Math.random() > 0.5;
      let center = Math.random() > 0.5;
      let end = Math.random() > 0.5;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      hAlign.push({
        start,
        center,
        end,
      });
      let max = list[col * i].height;
      for(let j = col * i; j < col * (i + 1) && j < num; j++) {
        max = Math.max(max, list[j].height);
      }
      if(start && end) {
        for(let j = col * i; j < col * (i + 1) && j < num; j++) {
          let item = list[j];
          item.height = max;
          if(item.type) {
            item.type = 1;
            item.singleLine = true;
            item.fontSize = item.height;
            item.lineHeight = 1;
          }
        }
      }
      for(let j = col * i; j < col * (i + 1) && j < num; j++) {
        if(start && end || start) {
          list[j].y = y;
        }
        else if(center) {
          list[j].y = y + Math.floor((max - list[j].height) * 0.5);
        }
        else if(end) {
          list[j].y = y + (max - list[j].height);
        }
        else {
          list[j].y = y + Math.floor((max - list[j].height) * Math.random());
        }
      }
      y += max + vMargin;
    }
    for(let i = 0; i < col; i++) {
      let start = Math.random() > 0.5;
      let center = Math.random() > 0.5;
      let end = Math.random() > 0.5;
      if(start && center || center && end || start && end) {
        start = center = end = true;
      }
      vAlign.push({
        start,
        center,
        end,
      });
      let max = list[i].width;
      for(let j = i; j < num; j += col) {
        max = Math.max(max, list[j].width);
      }
      if(start && end) {
        for(let j = i; j < num; j += col) {
          let item = list[j];
          item.width = max;
        }
      }
      for(let j = i; j < num; j += col) {
        if(start && end || start) {
          list[j].x = x;
        }
        else if(center) {
          list[j].x = x + Math.floor((max - list[j].width) * 0.5);
        }
        else if(end) {
          list[j].x = x + (max - list[j].width);
        }
        else {
          list[j].x = x + Math.floor((max - list[j].width) * Math.random());
        }
      }
      x += max + hMargin;
    }
    this.list = list;
    this.hAlign = hAlign;
    this.vAlign = vAlign;
  }
  clickCol() {
    if(this.dis) {
      return;
    }
    this.dis = true;
    let col = this.props.col;
    let row = this.props.row;
    let num = this.props.num;
    $net.postJSON({
      url: '/api/gen',
      body: {
        list: this.list,
        classify: true,
        col,
        row,
        num,
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
  clickRow() {
    if(this.dis) {
      return;
    }
    this.dis = true;
    let col = this.props.col;
    let row = this.props.row;
    let num = this.props.num;
    $net.postJSON({
      url: '/api/gen',
      body: {
        list: this.list,
        classify: false,
        col,
        row,
        num,
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
  click() {
    this.gen();
  }
  render() {
    return <div class="g-wrap layout-detail">
      <div class="btn">
        <button disabled={this.dis} onClick={this.clickCol}>2列</button>
        <button disabled={this.dis} onClick={this.clickRow}>2行</button>
        <button disabled={this.dis} onClick={this.click}>不确定</button>
      </div>
      <p>{JSON.stringify(this.hAlign)}</p>
      <p>{JSON.stringify(this.vAlign)}</p>
      <p>{JSON.stringify(this.list)}</p>
      <ul class="list">
        {
          (this.list || []).map(item => {
            return <li class={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.fontWeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutDetail;
