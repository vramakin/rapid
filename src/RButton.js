import React from "react";
import { Button } from "antd";
import { DragSource } from 'react-dnd';
/**
 * Implements the drag source contract.
 */
const buttonDragSource = {
  beginDrag(props) {
    return {
      type: props.type
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

function RButton({ isDragging, connectDragSource, text }) {
  return connectDragSource(
    <span><Button>DragMe</Button></span>
  );
}

export default DragSource("draggable", buttonDragSource, collect)(RButton)