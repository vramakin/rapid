import React from "react";
import { DragSource, DropTarget } from 'react-dnd';
import { createStore } from 'redux'
import { connect } from 'react-redux'


/*
 * actions
 */

export const ADD_ELEMENT = 'ADD_ELEMENT'


/*
 * action creators
 */

export function addElement(id, child) {
  return { type: ADD_ELEMENT, id, child }
}


//reducers

const initialState = {
		lastId:10,
		UITREE:{
			type:"root",
			children:
			{
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
	}

const deepCloneUITree = o=> JSON.parse(JSON.stringify(o))

function slateApp(state = initialState, action) {
  switch (action.type) {
    case ADD_ELEMENT:
    {
      let clone = deepCloneUITree(state.UITREE)      
		const addChild_ = (obj, id, child) => {			
			if (obj.children[id]) {				
				obj.children[id].children[state.lastId] = child;				
			} else {				
				obj.children && Object.keys(obj.children).forEach(k =>
					{						
						addChild_(obj.children[k], id, child)
					}
				);
			}
		}	
		addChild_(clone, action.id, action.child);		
		return {lastId: state.lastId+1, UITREE:clone}
	}
    default:
      return state
  }
}

export const store = createStore(slateApp)

console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions

export const getUniqueID = ()=>(new Date()).getTime()

let testElem = {type: "div", props: null, children: {}}
testElem.children[ getUniqueID()] = { type: "text", value: "dynamic addition works" } 

store.dispatch(addElement(2, testElem))

unsubscribe()


const slateTarget = {
  drop(props) {
    store.dispatch(addElement(2, testElem))
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}


const FuncSlate = props=> props.connectDropTarget(getComponent(props.UITREE))

const mapStateToProps = state => {
  return {
    UITREE: state.UITREE
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: id => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

export const Slate = connect(
  mapStateToProps,
  null
)(DropTarget("draggable", slateTarget, collect)(FuncSlate))


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
 		: <span>{React.createElement(DragSource("draggable", genericDragSource, collect)(genericDraggable), e.props, [])}</span>
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
// 

// let lastId = 10

// export class Slate extends React.Component {
// 	state = {
// 		UITREE:{
// 			type:"root",
// 			children:
// 			{
// 			1: {
// 				type: "div",
// 				props: {style:{backgroundColor:'red', padding:"1em"}},
// 				children: {
// 					2: {
// 						type: "div",
// 						props: {style:{backgroundColor:'blue'}},
// 						children: { 3: { type: "text", value: "it works" } }
// 					},
// 					4: {
// 						type: "div",
// 						props: null,
// 						children: { 5: { type: "text", value: "deletion works" } }
// 					}
// 				}
// 			}
// 		}
// 		}
// 	}

// 	// removeElement = id => {
// 	// 	const removeElement_ = (root, id) => {
// 	// 		if (UITREE[root].children[id]) delete UITREE[root].children[id];
// 	// 		else UITREE[root].children.forEach(e => removeElement_(e.id, id));
// 	// 	};
// 	// 	removeElement_(1, id);
// 	// };

// 	addChild = (id, child) => {		
// 		let clone = deepCloneUITree(this.state.UITREE)		
// 		const addChild_ = (obj, id, child) => {			
// 			if (obj.children[id]) {
// 				lastId += 1;
// 				obj.children[id].children[lastId] = child;				
// 			} else {						
// 				obj.children && Object.keys(obj.children).forEach(k =>
// 					{						
// 						addChild_(obj.children[k], id, child)
// 					}
// 				);
// 			}
// 		}
// 		addChild_(clone, id, child);		
// 		this.setState({UITREE:clone})
// 	};



// 	componentDidMount() {		
// 		this.addChild(2, {
// 						type: "div",
// 						props: null,
// 						children: { lastId: { type: "text", value: "dynamic addition works" } }
// 					})
// 		lastId+=1
// 	}

// 	render() {
// 		return <div>{getComponent(this.state.UITREE.children[1],null,[])}</div>
// 	}
// }
