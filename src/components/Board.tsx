'use client'

import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

export default function Board() {
  const getBoard = useBoardStore(state => state.getBoard)

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return (
    'hi'
    // <DragDropContext >
    //     <Droppable droppableId='board' direction='horizontal' type='column'>
    //         {(provided) => (
    //             <div>
                    
    //             </div>
    //         )}
    //     </Droppable>
      
    // </DragDropContext>

  )
}
