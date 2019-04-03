import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { layout1, layout2 } from "./Samples";

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'

import Card from './Card'
import {Slate, store, addElement, getUniqueID} from './mvu'

class App extends Component {
  state = { code: <strong>Hello World!</strong> };

  addSomeElement = () => {
    let testElem = {type: "div", props: null, children: {}}
    testElem.children[ getUniqueID()] = { type: "text", value: "added another one..." } 
    store.dispatch(addElement(2, testElem))
  }

  componentDidMount() {
    let testElem = {type: "div", props: null, children: {}}
    testElem.children[ getUniqueID()] = { type: "text", value: "dynamic addition works again" } 
    store.dispatch(addElement(2, testElem))
  }

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
             <Button
              onClick={() => this.addSomeElement()}
            >
              +
            </Button>            
          </Col>
          <Col span={12}>
            <Card text="dragme" />
            <div>cantdragme</div>
          </Col>
        </Row>      
        <Provider store={store}>
        <Slate />          
        </Provider>
        </DragDropContextProvider>
        {/*this.state.code*/}
      </div>
    );
  }
}

export default App;
