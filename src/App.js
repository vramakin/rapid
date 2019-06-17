import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Row, Col, Button as IButton, Avatar as IAvatar, Icon as IIcon, Spin } from "antd";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { createStore } from "redux";
import { connect } from "react-redux";

import {DnD} from './DnD'

const Avatar = DnD(IAvatar)
const Button = DnD(IButton)
const Icon = DnD(IIcon)
const scope = { Button, Spin, Icon, Avatar };

const initialState = { code: "<div></div>" };

export const ADD_CODE = "ADD_CODE"; //action
export const INSERT_CODE_AT = "INSERT_CODE_AT"; //action

function reducer(state = initialState, action) {
	//reducer
	switch (action.type) {
		case ADD_CODE: {			
			return { code: insertCode(state.code, action.code) };
		}
		case INSERT_CODE_AT: {
			let pos = state.code.indexOf(">", state.code.indexOf(action.id))+1
			return { code: insertCodeAt(state.code, action.code, pos) }
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
					<IButton
						size="small"
						onClick={() =>
							store.dispatch({
								type: ADD_CODE,
								code: `<Button id={${Date.now()}}>Button</Button>`
							})
						}
					>
						Button
					</IButton>
					<IButton
						size="small"
						onClick={() =>
							store.dispatch({ type: ADD_CODE, code: "<Spin />" })
						}
					>
						Spin
					</IButton>
					<IButton
						size="small"
						onClick={() =>
							store.dispatch({
								type: ADD_CODE,
								code: `<Avatar code='<Avatar icon="user" />' icon="user" />`
							})
						}
					>
						Avatar
					</IButton>
					<IButton
						size="small"
						onClick={() =>
							store.dispatch({
								type: ADD_CODE,
								code: `<Icon code='<Icon type="filter" />' type="filter" />`
							})
						}
					>
						Icon
					</IButton>
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

export const App = connect(
	mapStateToProps,
	null
)(_App);
