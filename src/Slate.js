/*
 * thing that makes things dropped into it droppable
 */

import React from "react";
import { DropTarget } from 'react-dnd';
import { createStore } from 'redux'
import { connect } from 'react-redux'


/*
 * standalone utils
 */

export const getUniqueID = ()=>(new Date()).getTime()

let testElem = {type: "div", props: null, children: {}}
testElem.children[ getUniqueID()] = { type: "text", value: "dynamic addition works" }

const deepCloneUITree = o=> JSON.parse(JSON.stringify(o))


/*
 * REDUX
 */

export const ADD_ELEMENT = 'ADD_ELEMENT' //action


export function addElement(id, child) {  //action creator
	//console.log('id and child are ' ,id, child)
  return { type: ADD_ELEMENT, id:id, child:child }
}


const initialState = {  //initial state
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


function slateReducer(state = initialState, action) { //reducer
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
		//console.log('child is ', action.child)
		addChild_(clone, action.id, action.child);		
		return {lastId: state.lastId+1, UITREE:clone}
	}
    default:
      return state
  }
}


const mapStateToProps = state => { // function required for react-redux
  return {
    UITREE: state.UITREE
  }
}


export const store = createStore(slateReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //store


/*
 * DnD
 */

const slateTarget = { //what happens when drop occurs
  drop(props, monitor) {
    store.dispatch(addElement(props.id, {type:monitor.getItem().type, props:null, children:[]}))
  },
}

function collectDrop(connect, monitor) { // some function required for drop
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}


/*
 * Putting redux and DnD together into a DnD'able redux based component
 */

const FuncSlate = props=> {
	const getComponent = (e,id) => { // a function that converts a data element to a draggable react component
		function genericDroppable(props) {
			console.log('data element is', e)
			console.log('state is', props)
		  return props.connectDropTarget(<span>{React.createElement(e.type, e.props, Object.keys(e.children).map(k => getComponent(e.children[k], k)))}</span>)
		}

		return e.type === "text"
			? e.value
	 		: <span>{React.createElement(DropTarget("draggable", slateTarget, collectDrop)(genericDroppable), {id:id, ...e.props}, [])}</span>
	}

	return getComponent(props.UITREE)
}


export const Slate = connect(
  mapStateToProps,
  null
)(FuncSlate)
