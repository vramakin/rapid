import React from "react";
import { DragSource } from 'react-dnd';

export var lastId = 4;

var UITREE = {
	1: {
		type: "div",
		props: {style:{backgroundColor:'red', padding:"1em"}},
		children: {
			2: {
				type: "div",
				props: {style:{backgroundColor:'blue'}},
				children: { 3: { type: "text", value: "it works" } }
			},
			4: {
				type: "div",
				props: null,
				children: { 5: { type: "text", value: "deletion works" } }
			}
		}
	}
}


const getComponent = e => {
	const genericDragSource = {
	  beginDrag(props) {
	    return {
	      text: props.text
	    }
	  }
	}

	function collect(connect, monitor) {
	  return {
	    connectDragSource: connect.dragSource(),
	    isDragging: monitor.isDragging()
	  };
	}

	function genericDraggable({ isDragging, connectDragSource, text }) {
	  return connectDragSource(
	    React.createElement(e.type, e.props, Object.keys(e.children).map(k => getComponent(e.children[k]))))
	}

	return e.type === "text"
		? e.value
 		: React.createElement(DragSource("draggable", genericDragSource, collect)(genericDraggable), e.props, [])
}

const removeElement = id => {
	const removeElement_ = (root, id) => {
		if (UITREE[root].children[id]) delete UITREE[root].children[id];
		else UITREE[root].children.forEach(e => removeElement_(e.id, id));
	};
	removeElement_(1, id);
};

export const addChild = (id, child) => {
	const addChild_ = (root, id, child) => {
		if (root === id) {
			lastId += 1;
			UITREE[id].children[lastId] = child;
		} else {
			Object.keys(UITREE[root].children).forEach(k =>
				addChild(k, id, child)
			);
		}
	};
	addChild_(1, id, child);
};

setInterval(()=>addChild(1, {
	type: "div",
	props: null,
	children: { 10: { type: "text", value: "addition works" } }
}),2000)


const squareTarget = {
  drop(props) {
    lastId+=1
    addChild(props.id, {
        type: "div",
        props: {style:{backgroundColor:'blue'}},
        children: { lastId: { type: "text", value: "it works" } }
      })
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

export class Slate extends React.Component {
	state = {UITREE:UITREE}

	componentDidMount() {
		setInterval(()=>{addChild(1, {
			type: "div",
			props: null,
			children: { 10: { type: "text", value: "addition works" } }
		});this.setState({UITREE:UITREE})}
		,2000)
	}

	render() {
		return <div>{getUITree()}</div>
	}
}

export const getUITree = () => getComponent(UITREE[1],null,[])
