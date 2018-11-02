'use strict';

class LayoutView extends migi.Component {
  constructor(data) {
    super(data);
  }
  render() {
    return <div class="g-wrap layout-detail">
      <ul className="list">
        {
          (this.props.data || []).map(item => {
            return <li class={`t${item.type}`}
                       style={`left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px`}>{item.type
              ? (item.fontSize + ',' + item.fontWeight) : ''}</li>;
          })
        }
      </ul>
    </div>;
  }
}

export default LayoutView;
