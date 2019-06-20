import React from 'react'
import {Button as IButton} from 'antd'

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