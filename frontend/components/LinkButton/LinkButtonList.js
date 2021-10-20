import { useState, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LinkButton from './LinkButton'
import update from 'immutability-helper'
const style = {}
const LinkButtonList = ({ buttons, onChange }) => {
  {
    const handleButtonChange = (buttonsCopy) => {
      onChange(buttonsCopy)
    }

    const handleDelete = (key) => {
      let btns = buttons
      btns = btns.filter((btn) => btn.id !== key)
      handleButtonChange(btns)
    }

    const handleSwitchChange = (key) => {
      let btns = buttons
      btns.map((btn) => {
        if (btn.id === key) {
          btn.Enabled = !btn.Enabled
        }
      })
      handleButtonChange(btns)
    }

    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = buttons[dragIndex]
        let buttonsCopy = buttons
        buttonsCopy = update(buttonsCopy, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })

        handleButtonChange(buttonsCopy)
      },
      [buttons]
    )

    const handleContentChange = (obj) => {
      let btns = buttons
      btns.map((btn) => {
        if (btn.id === obj.key) {
          btn.Text = obj.text
          btn.Url = obj.url
        }
      })
      handleButtonChange(btns)
    }

    return (
      <Box w='100%'>
        <DndProvider backend={HTML5Backend}>
          <div>
            {buttons.map((card, index) => (
              <LinkButton
                key={card.id}
                index={index}
                id={card.id}
                text={card.Text}
                url={card.Url}
                enabled={card.Enabled}
                moveCard={moveCard}
                onContentChange={handleContentChange}
                onSwitch={handleSwitchChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DndProvider>
      </Box>
    )
  }
}

export default LinkButtonList
