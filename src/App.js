import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import {
	Row as IRow,
	Col as ICol,
	Button as IButton,
	Avatar as IAvatar,
	Icon as IIcon,
	Spin as ISpin,
	Switch as ISwitch,
	Menu as IMenu,
	Layout as ILayout,
	Radio,
	Select,
	Popover
} from "antd";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { createStore } from "redux";
import { connect } from "react-redux";

import { DnD } from "./DnD";

import { PlainLayout, HeaderLayout } from "./Layouts.js";

const { Option } = Select;

const Layout = DnD(ILayout);
const Content = DnD(ILayout.Content);
const Header = DnD(ILayout.Header);
const Footer = DnD(ILayout.Footer);
const Menu = DnD(IMenu);
const Avatar = DnD(IAvatar);
const Button = DnD(IButton);
const Icon = DnD(IIcon);
const Spin = DnD(ISpin);
const Row = DnD(IRow);
const Col = DnD(ICol);
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
const scope = {
	Button,
	Spin,
	Icon,
	Avatar,
	RedDiv,
	BlueDiv,
	GreenDiv,
	Dyna,
	Layout,
	Header,
	Content,
	Footer,
	Menu,
	Row,
	Col
};

const initialState = { code: PlainLayout };

export const ADD_CODE = "ADD_CODE"; //action
export const DELETE_BY_ID = "DELETE_BY_ID"; //action
export const FOSTER = "FOSTER"; //action
export const SET_LAYOUT = "SET_LAYOUT"; //action

function reducer(state = initialState, action) {
	//reducer
	switch (action.type) {
		case SET_LAYOUT: {
			return { code: action.layout };
		}
		case ADD_CODE: {
			if (state.code.indexOf("HeaderLayoutContent") > -1) {
				return {
					code: addChild(
						state.code,
						"HeaderLayoutContent",
						action.code
					)
				};
			}
			if (state.code.indexOf("PlainLayoutContent") > -1) {
				return {
					code: addChild(
						state.code,
						"PlainLayoutContent",
						action.code
					)
				};
			}
			return { code: insertCode(state.code, action.code) };
		}
		case FOSTER: {
			let child = getById(state.code, action.child);
			let parent = getById(state.code, action.parent);
			let codeWithoutChild = state.code.replace(child, "");
			let pos =
				codeWithoutChild.indexOf(parent) + parent.lastIndexOf("<");

			return {
				code: insertCodeAt(codeWithoutChild, child, pos)
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
			{
				collection: [
					{ name: "Button", code: "<Button>Button</Button>" },
					{
						name: "Primary",
						code: "<Button type='primary'>Primary</Button>",
						sample: <IButton type="primary">Primary</IButton>
					},
					{
						name: "Dashed",
						code: "<Button type='dashed'>Dashed</Button>",
						sample: <IButton type="dashed">Dashed</IButton>
					}
				]
			},
			{ name: "Icon", code: '<Icon type="filter"></Icon>' },
			{ name: "Avatar", code: '<Avatar icon="user"></Avatar>' },
			{
				collection: [
					{ name: "RedDiv", code: "<RedDiv></RedDiv>" },
					{
						name: "BlueDiv",
						code: "<BlueDiv></BlueDiv>",
						sample: (
							<div
								style={{
									backgroundColor: "blue",
									padding: "1em"
								}}
							/>
						)
					},
					{
						name: "GreenDiv",
						code: "<GreenDiv></GreenDiv>",
						sample: (
							<div
								style={{
									backgroundColor: "green",
									padding: "1em"
								}}
							/>
						)
					}
				]
			},
			{ name: "Dyna", code: '<Dyna>{"it works!"}</Dyna>' }
		];
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<LiveProvider code={this.props.code} scope={scope}>
					<IRow
						style={{
							padding: "0.5em",
							backgroundColor: "#fdfdfd",
							borderBottom: "thin solid #ccc"
						}}
					>
						<ICol span={1}>
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
						</ICol>
						<ICol span={3}>
							<Select
								defaultValue="/"
								style={{ width: 120 }}
								size="small"
								disabled
							>
								<Option value="/">/</Option>
							</Select>
						</ICol>
						<ICol span={3}>
							<Radio.Group
								onChange={e =>
									e.target.value === "a"
										? store.dispatch({
												type: SET_LAYOUT,
												layout: PlainLayout
										  })
										: store.dispatch({
												type: SET_LAYOUT,
												layout: HeaderLayout
										  })
								}
								value={
									this.props.code.indexOf(
										"PlainLayoutContent"
									) > -1
										? "a"
										: "b"
								}
								size="small"
							>
								<Radio.Button value="a">
									<IIcon type="border" />
								</Radio.Button>
								<Radio.Button value="b">
									<IIcon type="credit-card" />
								</Radio.Button>
								<Radio.Button value="c">
									<IIcon type="layout" />
								</Radio.Button>
							</Radio.Group>
							<IButton
								style={{ marginLeft: "0.5em" }}
								size="small"
							>
								<IIcon type="table" />
							</IButton>
						</ICol>
						<ICol span={16}>
							{tools.map((t, i) => {
								if (t.collection) {
									return (
										<Popover
											content={t.collection
												.slice(1)
												.map((u, j) => (
													<span
														style={{
															margin: "0.25em",
															cursor: "pointer"
														}}
														onClick={() =>
															store.dispatch({
																type: ADD_CODE,
																code: transformCode(
																	u.code
																)
															})
														}
													>
														{u.sample ? (
															u.sample
														) : (
															<IButton
																key={j}
																size="small"
															>
																{u.name}
															</IButton>
														)}
													</span>
												))}
										>
											<IButton
												key={0}
												size="small"
												onClick={() =>
													store.dispatch({
														type: ADD_CODE,
														code: transformCode(
															t.collection[0].code
														)
													})
												}
											>
												{t.collection[0].name}
											</IButton>
										</Popover>
									);
								} else
									return (
										<IButton
											key={i}
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
						</ICol>
						<ICol span={1} style={{ textAlign: "right" }}>
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
						</ICol>
					</IRow>
					<IRow>
						<ICol span={this.state.codeVisible ? 18 : 24}>
							<LivePreview />
						</ICol>
						<ICol
							span={this.state.codeVisible ? 6 : 0}
							style={{
								height: "94vh",
								borderLeft: "thin solid #ccc"
							}}
						>
							<LiveEditor />
							<LiveError />
						</ICol>
					</IRow>
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
	let ending = s.indexOf(endTag, beginning) + endTag.length;

	return s.substring(beginning, ending);
};

const addChild = (code, pid, childCode) => {
	let parent = getById(code, pid);
	let pos = code.indexOf(parent) + parent.lastIndexOf("<");

	return insertCodeAt(code, childCode, pos);
};

const transformCode = code =>
	code.substr(0, code.indexOf(">")) +
	` id={${Date.now()}} ` +
	code.substr(code.indexOf(">"));

export const App = connect(
	mapStateToProps,
	null
)(_App);
