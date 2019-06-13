import React from "react";
import { Button, Icon } from "antd";
import { DragSource, DropTarget } from "react-dnd";
import { store, INSERT_CODE_AT } from "./App";

/**
 * Implements the drag source contract.
 */
const buttonDragSource = {
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

const slateTarget = {
  //what happens when drop occurs
  drop(props, monitor) {
    console.log("droppped", monitor.getItem(), "props", props);
    store.dispatch({
      type: INSERT_CODE_AT,
      code: monitor.getItem().code,
      pos: props.pos + 16
    });
  }
};

function collectDrop(connect, monitor) {
  // some function required for drop
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class RButton extends React.Component {
  state = { showInfo: false };

  render() {
    return this.props.connectDropTarget(
      this.props.connectDragSource(
        <span
          onMouseOver={() => this.setState({ showInfo: true })}
          onMouseOut={() => this.setState({ showInfo: false })}
          style={this.state.style}
        >
          <span
            style={{
              background: "rgba(200,200,200,0.5)",
              border: "thin dashed #777",
              borderRadius: "5px",
              display: this.state.showInfo ? "" : "none",
              position: "absolute",
              top: "20",
              left: "20",
              zIndex: "100"
            }}
          >
            <Icon type="edit" />
            <Icon type="drag" />
            <Icon type="delete" />
          </span>
          {React.createElement(Button, this.props, this.props.children)}
        </span>
      )
    );
  }
}

export default DropTarget("draggable", slateTarget, collectDrop)(
  DragSource("draggable", buttonDragSource, collect)(RButton)
);
