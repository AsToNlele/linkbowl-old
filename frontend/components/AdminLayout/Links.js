import { Box, Button, Grid, Container, Spinner } from '@chakra-ui/react'
import LinkButtonList from '@/components/LinkButton/LinkButtonList'
import scrollbar from '@/utils/scrollbar'

function Links({ onAddLink, onSubmit, onChangeButtons, isLoading, page }) {
  const addLink = () => {
    onAddLink()
  }

  const handleSubmit = () => {
    onSubmit()
  }

  const changeButtons = (buttonsCopy) => {
    onChangeButtons(buttonsCopy)
  }

  return (
    <Box
      gridColumn={{ base: '', md: 'col2-start' }}
      gridRow={{ base: 'row5-start/row7', md: 'row3-start/row4' }}
      gridRowEnd='row5'
      background='lightgray'
      overflowY={{ base: '', md: 'scroll' }}
      css={scrollbar}
    >
      <Container centerContent maxW='container.sm'>
        <Grid
          templateColumns='repeat(auto-fit, minmax(150px,1fr))'
          width='100%'
          alignItems='center'
          gap='2'
          mt='14'
          mb='8'
        >
          <Button colorScheme='purple' onClick={addLink}>
            Add New Link
          </Button>
          <Button
            colorScheme='green'
            onClick={handleSubmit}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Save'}
          </Button>
        </Grid>
        <LinkButtonList buttons={page.Button} onChange={changeButtons} />
      </Container>
    </Box>
  )
}

export default Links
