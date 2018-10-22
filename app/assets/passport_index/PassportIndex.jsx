'use strict';

class PassportIndex extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    return <div class="passport-index g-wrap">
      <ul class="card fn-clear">
        <li>
          <a href="login" class="login">已有账号？直接登录。</a>
        </li>
        <li>
          <a href="register" class="register">还没注册？创建一个新的。</a>
        </li>
      </ul>
    </div>;
  }
}

export default PassportIndex;
