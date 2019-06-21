import React from 'react'
import {
	Row as IRow,
	Col as ICol,
	Button as IButton,
	Avatar as IAvatar,
	Icon as IIcon,
	Spin as ISpin,	
	Menu as IMenu,
	Layout as ILayout,
	Table
} from "antd";

import { DnD } from "./DnD";

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
export const scope = {
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
	Col,
	Table
};



export const tools = [
			{ name: "Spin", code: "<Spin></Spin>" },
			{
				collection: [
					{ name: "Button", code: "<Button>Button</Button>", sample: <IButton>Button</IButton> },
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
					{ name: "RedDiv", code: "<RedDiv></RedDiv>", sample: (
							<div
								style={{
									backgroundColor: "red",
									padding: "1em"
								}}
							/>
						) },
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
			{ name: "Dyna", code: '<Dyna>{"it works!"}</Dyna>' },
			{name:"Grid", code:`
			<Row><Col id={generate} span={8} className="grid-show-border"></Col><Col id={generate} span={8} className="grid-show-border"></Col><Col id={generate} span={8} className="grid-show-border"></Col></Row>`},
			{name:"Table", code:`<Table dataSource={[
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]} columns={[
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]} ></Table>`}
]