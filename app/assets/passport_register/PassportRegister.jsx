'use strict';

const timeKey = 'passportCodeTime';

class PassportRegister extends migi.Component {
  constructor(data) {
    super(data);
    this.type = 0;
    this.dis = true;
    this.on(migi.Event.DOM, () => {
      let last = parseInt(localStorage.getItem(timeKey));
      last = last || 0;
      let now = Date.now();
      if(now - last < 60) {
        this.dis = false;
        this.interval = now - last;
      }
      else {
        this.interval = 0;
      }
      setInterval(() => {
        this.interval--;
        if(this.interval <= 0) {
          this.interval = 0;
        }
      }, 1000);
    });
  }
  @bind name
  @bind password
  @bind type
  @bind code
  @bind interval
  @bind dis
  changeType(e, vd, tvd) {
    this.type = tvd.props.value;
  }
  clickCode(e) {
    e.preventDefault();
    let res = this.checkValid();
    if(res) {
      $net.postJSON({
        url: '/api/code/register',
        body: {
          name: this.name,
          type: this.type,
        },
      }, (res) => {
        if(res.success) {
          alert('验证码已发送，请注意查收~');
          this.interval = 60;
          this.dis = false;
          localStorage.setItem(timeKey, Date.now());
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, (err) => {
        console.error(err);
        alert($util.ERROR_MESSAGE);
      });
    }
  }
  checkValid(includeCode) {
    if(this.type === 0) {
      if(!/^1\d{10}$/.test(this.name)) {
        alert('手机号格式不正确');
        return false;
      }
    }
    else {
      if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[\w-]+(\.[\w-]+)+$/.test(this.name)) {
        alert('邮箱格式不正确');
        return false;
      }
    }
    if(!this.password || this.password.length < 4) {
      alert('密码最少4位');
      return false;
    }
    if(includeCode) {
      if(!/^\d{4}$/.test(this.code)) {
        alert('验证码需要4位数字');
        return false;
      }
    }
    return true;
  }
  submit(e) {
    e.preventDefault();
    let res = this.checkValid(true);
    if(res) {
      $net.postJSON({
        url: '/api/register',
        body: {
          name: this.name,
          type: this.type,
          password: this.password,
          code: this.code,
        },
      }, (res) => {
        if(res.success) {
          alert('注册成功，将自动登录...');
          location.href = res.data || location.protocol + '//' + location.host.replace(/^[\w.]+sketch2html/, 'sketch2html');
        }
        else {
          alert(res.message || $util.ERROR_MESSAGE);
        }
      }, (err) => {
        console.error(err);
        alert($util.ERROR_MESSAGE);
      });
    }
  }
  render() {
    return <div class="g-wrap passport-register">
      <form class="register" onSubmit={this.submit}>
        <div class="line right">
          <a href="/login">已有账号直接登录？</a>
        </div>
        <div class="line">
          <label class="lab">{this.type === 0 ? '手机号' : '邮箱地址'}：</label>
          <input type="text" autoComplete="off" maxLength={this.type === 0 ? 11 : 32}
                 placeholder={this.type === 0 ? '11位手机号' : 'xx@yy.zz'}
                 value={this.name}/>
        </div>
        <div class="line">
          <label class="lab">密码：</label>
          <input type="password" autoComplete="off" maxLength="32" placeholder="账号密码" value={this.password}/>
        </div>
        <div className="line">
          <label className="lab">验证码：</label>
          <input type="text" class="code" autoComplete="off" maxLength="4" value={this.code}/>
          <button disabled={!this.name || !this.password || this.interval}
                  onClick={this.clickCode}>{this.interval ? this.interval : '发送'}</button>
        </div>
        <div class="line center" onChange={{ input: this.changeType }}>
          <label><input type="radio" name="type" value={0} checked={this.type === 0}/>手机注册</label>
          <label><input type="radio" name="type" value={1} checked={this.type === 1}/>邮箱注册</label>
        </div>
        <button class="sub" disabled={this.dis}>注册</button>
      </form>
    </div>;
  }
}

export default PassportRegister;
