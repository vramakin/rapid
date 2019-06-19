import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import {
	Row,
	Col,
	Button as IButton,
	Avatar as IAvatar,
	Icon as IIcon,
	Spin as ISpin,
	Switch as ISwitch
} from "antd";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { createStore } from "redux";
import { connect } from "react-redux";

import { DnD } from "./DnD";

const Avatar = DnD(IAvatar);
const Button = DnD(IButton);
const Icon = DnD(IIcon);
const Spin = DnD(ISpin);
const RedDiv = DnD(p => (
	<div style={{ backgroundColor: "red", padding: "2em" }}>{p.children}</div>
));
const BlueDiv = DnD(p => (
	<div style={{ backgroundColor: "blue", padding: "2em" }}>{p.children}</div>
));
const GreenDiv = DnD(p => (
	<div style={{ backgroundColor: "green", padding: "2em" }}>{p.children}</div>
));
const Dyna = DnD(
	class D extends React.Component {
		state = { n: Date.now() };
		componentDidMount() {
			setInterval(() => this.setState({ n: Date.now() }), 1000);
		}
		render() {
			return this.state.n + this.props.children;
		}
	}
);
const scope = { Button, Spin, Icon, Avatar, RedDiv, BlueDiv, GreenDiv, Dyna };

const initialState = { code: "<div></div>" };

export const ADD_CODE = "ADD_CODE"; //action
export const DELETE_BY_ID = "DELETE_BY_ID"; //action
export const FOSTER = "FOSTER";

function reducer(state = initialState, action) {
	//reducer
	switch (action.type) {
		case ADD_CODE: {
			return { code: insertCode(state.code, action.code) };
		}
		case FOSTER: {
			let child = getById(state.code, action.child);
			let parent = getById(state.code, action.parent);
			let pos = state.code.indexOf(parent) + parent.lastIndexOf("<");
			console.log(parent, pos);
			return {
				code: insertCodeAt(state.code.replace(child, ""), child, pos)
			};
		}
		case DELETE_BY_ID: {
			let elem = getById(state.code, action.id);
			return { code: state.code.replace(elem, "") };
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

class _App extends React.Component {
	state = { codeVisible: false };

	render() {
		let tools = [
			{ name: "Spin", code: "<Spin></Spin>" },
			{ name: "Button", code: "<Button>Button</Button>" },
			{ name: "Icon", code: '<Icon type="filter"></Icon>' },
			{ name: "Avatar", code: '<Avatar icon="user"></Avatar>' },
			{ name: "RedDiv", code: "<RedDiv></RedDiv>" },
			{ name: "BlueDiv", code: "<BlueDiv></BlueDiv>" },
			{ name: "GreenDiv", code: "<GreenDiv></GreenDiv>" },
			{ name: "Dyna", code: '<Dyna>{"it works!"}</Dyna>' }
		];
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<LiveProvider code={this.props.code} scope={scope}>
					<Row
						style={{
							padding: "0.5em",
							backgroundColor: "#fdfdfd",
							borderBottom: "thin solid #ccc"
						}}
					>
						<Col span={1}>
							<svg
								style={{ marginRight: "1em" }}
								height="20px"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path
									fill="#777"
									d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z"
								/>
							</svg>
						</Col>
						<Col span={22}>
							{tools.map(t => {
								return (
									<IButton
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
								);
							})}
						</Col>
						<Col span={1} style={{ textAlign: "right" }}>
							<ISwitch
								checkedChildren="X"
								unCheckedChildren="<>"
								value={this.state.codeVisible}
								onChange={() =>
									this.setState({
										codeVisible: !this.state.codeVisible
									})
								}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={this.state.codeVisible ? 18 : 24}>
							<LivePreview />
						</Col>
						<Col
							span={this.state.codeVisible ? 6 : 0}
							style={{
								height: "94vh",
								borderLeft: "thin solid #ccc"
							}}
						>
							<LiveEditor />
							<LiveError />
						</Col>
					</Row>
				</LiveProvider>
			</DragDropContextProvider>
		);
	}
}

function insertCode(s, c) {
	return s.substr(0, s.length - 6) + c + "</div>";
}

function insertCodeAt(s, c, p) {
	return s.substr(0, p) + c + s.substr(p);
}

const getById = (s, id) => {
	let c = s.indexOf(id);
	let beginning = -1;

	while (c > -1) {
		if (s[c] === "<") {
			beginning = c;
			break;
		}
		c -= 1;
	}

	let tagName = s.substring(c + 1, s.indexOf(">", beginning));
	if (tagName.indexOf(" "))
		tagName = tagName.substring(0, tagName.indexOf(" "));

	let endTag = `</${tagName}>`;
	let ending = s.indexOf(endTag, s) + endTag.length;

	return s.substring(beginning, ending);
};

const transformCode = code =>
	code.substr(0, code.indexOf(">")) +
	` id={${Date.now()}} ` +
	code.substr(code.indexOf(">"));

export const App = connect(
	mapStateToProps,
	null
)(_App);
