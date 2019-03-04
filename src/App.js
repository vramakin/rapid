import React, { Component } from 'react';
import {Row, Col, Button} from 'antd'
import {layout1, layout2} from './Samples'

class App extends Component {
  state = {code:<strong>Hello World!</strong>}

  render() {
    return (
      <div>
      <Row>
      <Col >
      <Button onClick={()=>{console.log('clicked');this.setState({code:layout1})}} >1</Button>
      <Button onClick={()=>{console.log('clicked');this.setState({code:layout2})}} >2</Button>
      </Col>
      </Row>    
      {this.state.code}     
      </div>
    );
  }
}

export default App;
