import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Row, Col, Button as IButton, Avatar as IAvatar, Icon as IIcon, Spin as ISpin } from "antd";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { createStore } from "redux";
import { connect } from "react-redux";

import {DnD} from './DnD'

const Avatar = DnD(IAvatar)
const Button = DnD(IButton)
const Icon = DnD(IIcon)
const Spin = DnD(ISpin)
const scope = { Button, Spin, Icon, Avatar };

const initialState = { code: "<div></div>" };

export const ADD_CODE = "ADD_CODE"; //action
export const INSERT_CODE_AT = "INSERT_CODE_AT"; //action
export const DELETE_BY_ID = "DELETE_BY_ID"; //action

function reducer(state = initialState, action) {
	//reducer
	switch (action.type) {
		case ADD_CODE: {			
			return { code: insertCode(state.code, action.code) };
		}
		case INSERT_CODE_AT: {
			let elem = getById(state.code, action.id)
			let pos = state.code.indexOf(elem)+elem.lastIndexOf('<')
			return { code: insertCodeAt(state.code, action.code, pos) }
		}
		case DELETE_BY_ID: {
			let elem = getById(state.code, action.id)
			return {code: state.code.replace(elem, '')}
		}
		default:
			return state;
	}
}

const mapStateToProps = state => {
	// function required for react-redux
	return {
		code: state.code
	};
};

export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //store

function _App(props) {
	let tools = [{name:'Spin', code:'<Spin></Spin>'}, 
					{name:'Button', code:'<Button>Button</Button>'},
					{name:'Icon', code:'<Icon type="filter"></Icon>'}, 
					{name:'Avatar', code:'<Avatar icon="user"></Avatar>'}
					]
	return (
		<DragDropContextProvider backend={HTML5Backend}>
			<LiveProvider code={props.code} scope={scope}>
				<Row
					style={{
						padding: "0.5em",
						backgroundColor: "#fdfdfd",
						borderBottom: "thin solid #ccc"
					}}
				>					
					{tools.map(t=>{

						return <IButton
						size="small"
						onClick={() =>
							store.dispatch({
								type: ADD_CODE,
								code: transformCode(t.code)
							})
						}
					>
						{t.name}
					</IButton>
					})}
				</Row>
				<Row style={{ marginTop: "1em" }}>
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

function insertCode(s, c) {
	return s.substr(0, s.length - 6) + c + "</div>";
}

function insertCodeAt(s, c, p) {
	return s.substr(0, p) + c + s.substr(p);
}


const getById = (s, id)=>{
  let c=s.indexOf(id)
  let beginning = -1

  while(c>-1) {
    if(s[c]==='<') {beginning = c; break}
    c-=1
  }

  let tagName = s.substring(c+1, s.indexOf('>', beginning))
  if (tagName.indexOf(' ')) tagName=tagName.substring(0, tagName.indexOf(' '))
  
  let endTag = `</${tagName}>`
  
  let codeEnding = s.indexOf(endTag, beginning)+endTag.length
  let ending = s.indexOf(endTag, codeEnding)+endTag.length

  return s.substring(beginning, ending)
}


const transformCode = code => code.substr(0,code.indexOf('>'))+ ` id={${Date.now()}} ` + ` code='${code}' ` + code.substr(code.indexOf('>'))

export const App = connect(
	mapStateToProps,
	null
)(_App);
