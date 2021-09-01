import { useState, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LinkButton from './LinkButton'
import update from 'immutability-helper'
const style = {}
const LinkButtonList = ({ buttons, onChange }) => {
  {
    // const [cards, setCards] = useState([
    //   {
    //     id: 1,
    //     text: 'Instagram',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 2,
    //     text: 'Facebook',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 3,
    //     text: 'Reddit',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 4,
    //     text: 'Twitter',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 5,
    //     text: 'Bazos',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 6,
    //     text: 'Portfolio',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 7,
    //     text: 'Tamto',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 8,
    //     text: 'Hento',
    //     url: 'https://instagram.com',
    //   },
    //   {
    //     id: 9,
    //     text: 'lmao',
    //     url: 'https://instagram.com',
    //   },
    // ])

    const handleButtonChange = (buttonsCopy) => {
      onChange(buttonsCopy)
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

        console.log(buttonsCopy)
        handleButtonChange(buttonsCopy)
      },
      [buttons]
    )

    return (
      <Box w='100%'>
        <DndProvider backend={HTML5Backend}>
          <div>
            {buttons.map((card, index) => (
              <LinkButton
                key={card._id}
                index={index}
                id={card._id}
                text={card.Text}
                url={card.Url}
                moveCard={moveCard}
              />
            ))}
          </div>
        </DndProvider>
      </Box>
    )
  }
}

export default LinkButtonList
