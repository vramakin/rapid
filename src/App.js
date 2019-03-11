import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { layout1, layout2 } from "./Samples";

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card'

import {getUITree} from './mvu'

class App extends Component {
  state = { code: <strong>Hello World!</strong> };

  render() {
    return (
      <div>
      <DragDropContextProvider backend={HTML5Backend}>
        <Row>        
          <Col span={12}>          
            <Button
              onClick={() => {
                console.log("clicked");
                this.setState({ code: layout1 });
              }}
            >
              1
            </Button>
            <Button
              onClick={() => {
                console.log("clicked");
                this.setState({ code: layout2 });
              }}
            >
              2
            </Button>            
          </Col>
          <Col span={12}>
            <Card text="dragme" />
            <div>cantdragme</div>
          </Col>
        </Row>        
        <div>{getUITree()}</div>
        </DragDropContextProvider>
        {/*this.state.code*/}
      </div>
    );
  }
}

export default App;
