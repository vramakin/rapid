import React from "react";
import { DragSource } from 'react-dnd';
/**
 * Implements the drag source contract.
 */
const divDragSource = {
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

function RDiv({ isDragging, connectDragSource, text }) {
  return connectDragSource(
    <div style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </div>
  );
}

export default DragSource("draggable", divDragSource, collect)(RDiv)
