import React, { Component } from "react";
import { Row, Col } from "antd";

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'

import {Slate, store} from './Slate'
import RDiv from './RDiv'
import RButton from './RButton'

class App extends Component {
  render() {
    return (
      <div>
      <DragDropContextProvider backend={HTML5Backend}>
        <Row>          
          <Col span={12}>
            <RDiv text="dragme" type={RDiv}/>
            <RButton type={RButton}/>
            <div>cantdragme</div>
          </Col>
        </Row>      
        <Provider store={store}>
        <Slate />          
        </Provider>
        </DragDropContextProvider>        
      </div>
    );
  }
}

export default App;
