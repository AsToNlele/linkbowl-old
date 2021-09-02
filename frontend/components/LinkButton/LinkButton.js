import { useRef, useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Box, Text, Input, IconButton, Switch } from '@chakra-ui/react'
import { DragHandleIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { createRef } from 'react'

const handleStyle = {
  cursor: 'move',
}

const ItemTypes = {
  CARD: 'card',
}

const LinkButton = ({ id, text, url, index, enabled, moveCard, onContentChange, onDelete, onSwitch }) => {
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

  const [showTitle, setShowTitle] = useState(false)
  const [showURL, setShowURL] = useState(false)

  const inputTitleRef = createRef()
  const inputURLRef = createRef()

  const handleChange = () => {
    onContentChange({ key: id,text: inputTitleRef.current.value, url: inputURLRef.current.value})
  }

  const flipSwitch = () => {
    onSwitch(id)
  }

  const deleteButton = () => {
    onDelete(id)
  }

  useEffect(() => {
    if (showTitle) {
      inputTitleRef.current.focus()
    }
  }, [showTitle])

  useEffect(() => {
    if (showURL) {
      inputURLRef.current.focus()
    }
  }, [showURL])

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
      boxShadow='0px 2px 0px 0px #acb5bf'
    >
      <Box
        p='2'
        display='flex'
        borderRight='1px solid'
        borderColor='customgray'
        ref={ref}
        style={handleStyle}
        alignItems='center'
        justifyContent='center'
      >
        <DragHandleIcon color='customgray' />
      </Box>
      <Box p='4' width='100%'>
        <Box fontWeight='bold'>
          <Text display={showTitle ? 'none' : 'inline-block'}>{text != '' ? text : 'Title'}</Text>
          <Input
            display={!showTitle ? 'none' : 'inline'}
            variant='unstyled'
            placeholder='Title'
            value={text}
            ref={inputTitleRef}
            onBlur={() => setShowTitle(false)}
            py='2'
            fontWeight='bold'
            name="text"
            onChange={handleChange}
          />
          <IconButton
            onClick={() => setShowTitle(true)}
            variant='unstyled'
            icon={<EditIcon />}
            display={showTitle ? 'none' : 'inline-block'}
          />
        </Box>
        <Box>
          <Text display={showURL ? 'none' : 'inline'}>{url != '' ? url : 'Link'}</Text>
          <IconButton
            onClick={() => setShowURL(true)}
            variant='unstyled'
            icon={<EditIcon />}
            display={showURL ? 'none' : 'inline-block'}
          />
          <Input
            display={!showURL ? 'none' : 'inline'}
            variant='unstyled'
            placeholder='Link'
            value={url}
            ref={inputURLRef}
            w='100%'
            onBlur={() => setShowURL(false)}
            py='2'
            name="url"
            onChange={handleChange}
          />
        </Box>
      </Box>


  <Box display="flex" flexDirection="column" p="3" alignItems="center" justifyContent="space-between"><Switch colorScheme="green" onChange={flipSwitch} isChecked={enabled} /><IconButton onClick={deleteButton} variant="unstyled" icon={<DeleteIcon color="red" />} /></Box>
</Box>
  )
}

export default LinkButton
