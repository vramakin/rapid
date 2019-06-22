import React from "react";
import { Table } from "antd";

export default class SuperTable extends React.Component {
	state = { items: [], loading: true };

	componentDidMount() {
		fetch(
			"https://cors-anywhere.herokuapp.com/http://gdom.graphene-python.org/graphql?",
			{
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify({
					query: `{  page(url:"http://news.ycombinator.com") {    items: query(selector:"tr.athing") {      rank: text(selector:"td span.rank")      title: text(selector:"td.title a")      sitebit: text(selector:"span.comhead a")         }  }}`,
					variables: null,
					operationName: null
				})
			}
		)
			.then(res => res.json())
			.then(data => this.setState({items:data.data.page.items, loading:false}))
			.catch(e=>this.setState({loading:false, error:true}))
	}

	render() {
		return <Table dataSource={this.state.items} columns={getCols(this.props.cols)} loading={this.state.loading} />
	}
}

const getCols = cols=>cols.map(c=>{
	return {title:c, dataIndex:c, key:c}
})
