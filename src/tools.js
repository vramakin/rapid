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

import faker from 'faker'
import { DnD } from "./DnD";
import SuperTable from './SuperTable'
import { VictoryBar as IVictoryBar, VictoryLine as IVictoryLine, VictoryPie as IVictoryPie } from 'victory';

const { Header, Content, Footer, Sider } = Layout;

const Menu = DnD(IMenu);
const SubMenu = (IMenu);
const MenuItem = (IMenu.Item)
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
const Title = DnD(p=><h1 style={p.style}>{p.children}</h1>)
const VictoryBar = DnD(IVictoryBar)
const VictoryLine = DnD(IVictoryLine)
const VictoryPie = DnD(IVictoryPie)

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
	SubMenu,
	Title,
	faker,
	SuperTable,
	VictoryBar,
	VictoryLine,
	VictoryPie
};

export const tools = [
	{
		collection: [
			{ name: "Grid-1/4", code: "<Col className='grid-show-border' span={6}></Col>" },
			{ name: "Grid-1/2", code: "<Col className='grid-show-border' span={12}></Col>" },
			{ name: "Grid-1", code: "<Col className='grid-show-border' span={24}></Col>" }
		]
	},
	{ name: "Title", code: "<Title>{faker.fake('{{name.jobArea}}')}</Title>" },
	{name:'GTable', code:`<SuperTable cols={['rank', 'title', 'sitebit']} ></SuperTable>`},
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
            title={faker.fake("{{commerce.department}}")}
            value={Math.round(Math.random()*100*100)/100}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
        </Card>`},
        {
        	name:'Card', code:"<Card></Card>"
        },
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
	{ collection:[
		{name: "BarChart", code: `<VictoryBar style={{ data: {fill: "tomato"}}} data={[
    { x: 1, y: faker.random.number({min:1, max:10})},
    { x: 2, y: faker.random.number({min:1, max:10}) },
    { x: 3, y: faker.random.number({min:1, max:10})},
    { x: 4, y: faker.random.number({min:1, max:10})},
    { x: 5, y: faker.random.number({min:1, max:10})},
    { x: 6, y: faker.random.number({min:1, max:10})},
    { x: 7, y: faker.random.number({min:1, max:10})}
  ]} ></VictoryBar>` },
		{name: "LineChart", code: `<VictoryLine style={{ data: {stroke: "tomato"}}} data={[
      { x: 1, y: faker.random.number({min:1, max:10}) },
      { x: 2, y: faker.random.number({min:1, max:10}) },
      { x: 3, y: faker.random.number({min:1, max:10}) },
      { x: 4, y: faker.random.number({min:1, max:10}) },
      { x: 5, y: faker.random.number({min:1, max:10}) },
      { x: 6, y: faker.random.number({min:1, max:10})},
      { x: 7, y: faker.random.number({min:1, max:10})}
    ]} ></VictoryLine>` },
    {name:"Donut", code:`<VictoryPie  
  innerRadius={100}
  colorScale={["tomato", "lightgray" ]}
  labels={[]}
  data={[
      { x: 1, y: faker.random.number({min:1, max:10}) },
      { x: 2, y: faker.random.number({min:1, max:10}) },     
    ]}
></VictoryPie>`}
	]},
	{
		name: "Table",
		code: `<Table dataSource={[
  {
    key: '1',
    name: faker.fake("{{name.firstName}}"),
    age: 32,
    address: faker.fake("{{address.streetAddress}}"),
  },
  {
    key: '2',
    name: faker.fake("{{name.firstName}}"),
    age: 34,
    address: faker.fake("{{address.streetAddress}}"),
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
