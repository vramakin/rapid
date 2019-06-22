import React from "react";
import {
	Row as IRow,
	Col as ICol,
	Button as IButton,
	Avatar as IAvatar,
	Icon as IIcon,
	Spin as ISpin,
	Menu as IMenu,	
	Table as ITable,
	Card as ICard,
	Layout,
	Statistic as IStatistic
} from "antd";

import { DnD } from "./DnD";

const { Header, Content, Footer, Sider } = Layout;

const Menu = DnD(IMenu);
const SubMenu = DnD(IMenu);
const MenuItem = DnD(IMenu.Item)
const Avatar = DnD(IAvatar);
const Button = DnD(IButton);
const Icon = DnD(IIcon);
const Spin = DnD(ISpin);
const Row = DnD(IRow);
const Col = DnD(ICol);
const Table = DnD(ITable)
const Card = DnD(ICard)
const Statistic = DnD(IStatistic)
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
	Table,
	Card,
	Statistic,
	Sider,
	MenuItem,
	SubMenu
};

export const tools = [
	{
		collection: [
			{ name: "Grid-1/4", code: "<Col className='grid-show-border' span={6}></Col>" },
			{ name: "Grid-1/2", code: "<Col className='grid-show-border' span={12}></Col>" },
			{ name: "Grid-1", code: "<Col className='grid-show-border' span={24}></Col>" }
		]
	},
	{ name: "Title", code: "<h1>Dashboard</h1>" },
	{
		collection: [
			{
				name: "Button",
				code: "<Button>Button</Button>",
				sample: <IButton>Button</IButton>
			},
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
	{name:'Stat', code:`<Card>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
        </Card>`},
	{ name: "Icon", code: '<Icon type="filter"></Icon>' },
	{ name: "Avatar", code: '<Avatar icon="user"></Avatar>' },
	{
		collection: [
			{
				name: "RedDiv",
				code: "<RedDiv></RedDiv>",
				sample: (
					<div
						style={{
							backgroundColor: "red",
							padding: "1em"
						}}
					/>
				)
			},
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
	{
		name: "Table",
		code: `<Table dataSource={[
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
]} ></Table>`
	}
];
