'use strict';

class LayoutIndex extends migi.Component {
  constructor(data) {
    super(data);
  }

  render() {
    return <div class="g-wrap layout-index">
      <ul>
        <li>
          <a href="/2_2_3">2行2列，3个</a>
        </li>
        <li>
          <a href="/2_2_4">2行2列，4个</a>
        </li>
        <li>
          <a href="/2_3_6">2行3列，6个</a>
        </li>
      </ul>
    </div>;
  }
}

export default LayoutIndex;
