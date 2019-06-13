import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import {Row, Col, Button as IButton, Spin} from 'antd'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createStore } from 'redux'
import { connect } from 'react-redux'

import Button from './RButton'
import Icon from './RIcon'


const scope = {Button, Spin, Icon}

const initialState = {code:"<div></div>"}

export const ADD_CODE = 'ADD_CODE' //action


function reducer(state = initialState, action) { //reducer
  switch (action.type) {
    case ADD_CODE:    
    {
    	return {code:insertCode(state.code, action.code)}
	}
    default:
      return state
  }
}


const mapStateToProps = state => { // function required for react-redux
  return {
    code: state.code
  }
}


export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //store


function _App(props) {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
			<LiveProvider code={props.code} scope={scope}>
				<Row style={{padding:"0.5em", backgroundColor:"#fdfdfd", borderBottom:"thin solid #ccc"}}>
					<IButton size="small" onClick={()=>store.dispatch({type:ADD_CODE,code:"<Button>Button</Button>"})}>Button</IButton>
					<IButton size="small" onClick={()=>store.dispatch({type:ADD_CODE,code:"<Spin />"})}>Spin</IButton>
					<IButton size="small" onClick={()=>store.dispatch({type:ADD_CODE,code:`<Icon code='<Icon type="filter" />' type="filter" />`})}>Icon</IButton>
				</Row>			
				<Row style={{marginTop:"1em"}}>
					<Col span={15}>							
						<LivePreview />
					</Col>
					<Col span={9}>
						<LiveEditor />
						<LiveError />
					</Col>
				</Row>
			</LiveProvider>
			</DragDropContextProvider>
		);
}

function insertCode(s,c) {	
	return s.substr(0,s.length-6)+c+"</div>"
}

export const App = connect(
  mapStateToProps,
  null
)(_App)