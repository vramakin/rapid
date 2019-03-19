import React from 'react'
import { DropTarget } from 'react-dnd'

import {addChild, lastId} from './mvu'

const squareTarget = {
  drop(props) {
    lastId+=1
    addChild(props.id, {
        type: "div",
        props: {style:{backgroundColor:'blue'}},
        children: { lastId: { type: "text", value: "it works" } }
      })
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

function BoardSquare({ x, y, connectDropTarget, isOver, children }) {
  const black = (x + y) % 2 === 1

  return connectDropTarget(
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>,
  )
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare)