import React from "react";
import {Icon} from 'antd'
import { DragSource } from "react-dnd";
/**
 * Implements the drag source contract.
 */
const dragSource = {
  beginDrag(props) {
    return {
      code: props.code
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Draggable extends React.Component {
  state = { showInfo: false };

  render() {
    return this.props.connectDragSource(
      <span
        onMouseOver={() =>
          this.setState({ showInfo:true })
        }
        onMouseOut={() =>
          this.setState({ showInfo: false })
        }
        style={this.state.style}
      >
        <span style={{ background:"rgba(200,200,200,0.5)", border:"thin dashed #777", borderRadius:"5px", display:this.state.showInfo?'':'none', position:"absolute", top:"20", left:"20", zIndex:"100"}}><Icon type="edit" /><Icon type="drag" /><Icon type="delete" /></span>
        {React.createElement(this.props.type, this.props, this.props.children)}
      </span>
    );
  }
}

export default DragSource("draggable", dragSource, collect)(Draggable);
