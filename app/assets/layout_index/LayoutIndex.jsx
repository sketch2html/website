'use strict';

class LayoutIndex extends migi.Component {
  constructor(data) {
    super(data);
  }

  render() {
    return <div class="g-wrap layout-index">
      <ul>
        <li>
          <a href="/basic">1行/1列</a>
        </li>
        <li>
          <a href="/row">行布局</a>
        </li>
        <li>
          <a href="/col">列布局</a>
        </li>
        <li>
          <a href="/flexRowRatio">列等比</a>
        </li>
      </ul>
    </div>;
  }
}

export default LayoutIndex;
