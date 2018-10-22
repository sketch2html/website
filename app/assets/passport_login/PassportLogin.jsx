'use strict';

class PassportLogin extends migi.Component {
  constructor(data) {
    super(data);
    this.goto = this.props.goto;
  }
  @bind name
  @bind password
  @bind remember
  @bind dis
  checkValid() {
    if(!this.password || this.password.length < 4) {
      alert('密码最少4位');
      return false;
    }
    return true;
  }
  submit(e) {
    e.preventDefault();
    let res = this.checkValid();
    if(res) {
      $net.postJSON({
        url: '/api/login',
        body: {
          name: this.name,
          password: this.password,
          remember: this.remember,
        },
      }, (res) => {
        if(res.success) {
          alert('登录成功，将自动跳转...');
          location.href = this.goto || location.protocol + '//' + location.host.replace(/^[\w.]+sketch2html/, 'sketch2html');
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
    return <div class="g-wrap passport-login">
      <form class="login" onSubmit={this.submit}>
        <div className="line right">
          <a href="/register">还没注册？</a>
          <a href="/forget">忘记密码？</a>
        </div>
        <div class="line">
          <label class="lab">登录名：</label>
          <input type="text" autoComplete="off" maxLength="32" placeholder="昵称/邮箱/手机号" value={this.name}/>
        </div>
        <div class="line">
          <label class="lab">密码：</label>
          <input type="password" autoComplete="off" maxLength="32" placeholder="账号密码" value={this.password}/>
        </div>
        <div class="line">
          <label><input type="checkbox" checked={this.remember}/>记住密码</label>
          <small>不是自己的电脑不要勾选此项</small>
        </div>
        <button disabled={!this.name || !this.password}>登录</button>
      </form>
    </div>;
  }
}

export default PassportLogin;
