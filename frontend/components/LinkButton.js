import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Box, Text } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'

const handleStyle = {
  cursor: 'move',
}

const ItemTypes = {
  CARD: 'card',
}

const LinkButton = ({ id, text, url, index, moveCard }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <Box
      display='flex'
      borderRadius='lg'
      bg='white'
      my='4'
      ref={preview}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <Box
        p='2'
        display='flex'
        borderRight='1px solid black'
        ref={ref}
        style={handleStyle}
        alignItems='center'
        justifyContent='center'
      >
        <DragHandleIcon />
      </Box>
      <Box p='4'>
        <Text>{text}</Text>
        <Text>{url}</Text>
      </Box>
    </Box>
  )
}

export default LinkButton