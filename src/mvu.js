import React from "react";
import { DragSource } from 'react-dnd';

let lastId = 10

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

// const squareTarget = {
//   drop(props) {
//     lastId+=1
//     addChild(props.id, {
//         type: "div",
//         props: {style:{backgroundColor:'blue'}},
//         children: { lastId: { type: "text", value: "it works" } }
//       })
//   },
// }

// function collect(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//   }
// }

const deepCloneUITree = o=> JSON.parse(JSON.stringify(o))

export class Slate extends React.Component {
	state = {
		UITREE:{
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
	}

	// removeElement = id => {
	// 	const removeElement_ = (root, id) => {
	// 		if (UITREE[root].children[id]) delete UITREE[root].children[id];
	// 		else UITREE[root].children.forEach(e => removeElement_(e.id, id));
	// 	};
	// 	removeElement_(1, id);
	// };

	addChild = (id, child) => {
		console.log(' hit')
		let clone = deepCloneUITree(this.state.UITREE)		
		const addChild_ = (obj, id, child) => {			
			if (obj[id]) {
				lastId += 1;
				obj[id].children[lastId] = child;				
			} else {
				console.log(obj)				
				Object.keys(obj).forEach(k =>
					{
						console.log(obj)
						console.log(k)
						addChild_(obj[k], id, child)
					}
				);
			}
		}
		addChild_(clone, id, child);
		console.log(clone)
		this.setState({UITREE:clone})
	};



	componentDidMount() {		
		this.addChild(1, {
						type: "div",
						props: null,
						children: { lastId: { type: "text", value: "dynamic addition works" } }
					})
		lastId+=1
	}

	render() {
		return <div>{getComponent(this.state.UITREE[1],null,[])}</div>
	}
}
