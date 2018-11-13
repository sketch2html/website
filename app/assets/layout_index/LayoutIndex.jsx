'use strict';

class LayoutIndex extends migi.Component {
  constructor(data) {
    super(data);
  }

  render() {
    return <div class="g-wrap layout-index">
      <ul>
        <li>
          <a href="/1">1行/1列</a>
        </li>
        <li>
          <a href="/2_2">2行2列</a>
        </li>
        <li>
          <a href="/2_3_6">2行3列，6个</a>
        </li>
      </ul>
    </div>;
  }
}

export default LayoutIndex;
