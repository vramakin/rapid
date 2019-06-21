import React from "react";
import { Popover, Button as IButton } from "antd";
import { DragSource } from "react-dnd";
import { store, ADD_CODE } from "./App";

const buttonDragSource = {
  beginDrag(props) {
    return {
      id: props.id
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

const Toolify = (t, i, inner) => {
  if (t.collection) {
    return (
      <Popover content={t.collection.map((u, j) => Toolify(u, j, true))}>
        {Toolify(t.collection[0])}
      </Popover>
    );
  } else {
    return (
      <span
        key={i}
        style={{
          margin: "0.1em",
          cursor: "pointer"
        }}
        onClick={() =>
          store.dispatch({
            type: ADD_CODE,
            code: transformCode(t.code)
          })
        }
      >
        {inner && t.sample ? (
          t.sample
        ) : (
          <IButton size="small">{t.name}</IButton>
        )}
      </span>
    );
  }
};

export default Toolify;

const transformCode = code => {
  let intermediate =
    code.substr(0, code.indexOf(">")) +
    ` id="${Date.now()}" ` +
    code.substr(code.indexOf(">"));

  let prevId = "";
  let i = 0;
  while (intermediate.indexOf("{generate}") > -1) {
    let id = Date.now();
    let idStr = `${id}-${i}`;
    if (id === prevId) {
      i++;
      idStr = `${id}-${i}`;
    }
    intermediate = intermediate.replace("{generate}", `"${idStr}"`);
    prevId = id;
  }

  return intermediate;
};

// export const DnD = function(type) {
//   /**
//  * Implements the drag source contract.
//  */

// class Wrapper extends React.Component {
//   state = { showInfo: false };

//   render() {
//     return this.props.connectDropTarget(
//       this.props.connectDragSource(
//         <span
//           onMouseOver={() => this.setState({ showInfo: true })}
//           onMouseOut={() => this.setState({ showInfo: false })}
//         >
//         {this.props.isOver?<span
//             style={{
//               background: "rgba(200,200,200,0.5)",
//               border: "thin dashed #777",
//               borderRadius: "5px",
//               position: "absolute",
//               top: "20",
//               left: "20",
//               zIndex: "100",
//               cursor: 'pointer'
//             }}
//           >
//             <Icon type="download" />
//           </span>:null}
//           <span
//             style={{
//               background: "rgba(200,200,200,0.5)",
//               border: "thin dashed #777",
//               borderRadius: "5px",
//               display: this.state.showInfo ? "" : "none",
//               position: "absolute",
//               top: "20",
//               left: "20",
//               zIndex: "100",
//               cursor: 'pointer'
//             }}
//           >
//             <Icon type="edit" />
//             <Icon type="drag" />
//             <Icon type="delete" onClick={()=>store.dispatch({
//       type: DELETE_BY_ID,
//       id: this.props.id
//     })}/>
//           </span>
//           {React.createElement(type, this.props, this.props.children)}
//         </span>
//       )
//     );
//   }
// }

//   return DropTarget("draggable", slateTarget, collectDrop)(
//     DragSource("draggable", buttonDragSource, collect)(Wrapper)
//   )
// }
