import { Box, Text, Button } from '@chakra-ui/react'
function LinkShare() {
  return (
    <Box
      gridColumn={{ base: '', md: 'col3-start' }}
      gridRow={{ base: 'row2-start', md: 'row1-start' }}
      background='white'
      p='5'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      minWidth='40%'
    >
      <Text
        display='inline'
        fontSize='xs'
        fontWeight='bold'
        mr='1'
        whiteSpace='nowrap'
        flex='0'
      >
        My Linkbowl:
      </Text>
      <Box flex='1' minWidth='0' whiteSpace='nowrap'>
        <a href='/aston'>
          <Text
            fontSize='xs'
            textDecoration='underline'
            textOverflow='ellipsis'
            overflow='hidden'
            whiteSpace='nowrap'
          >
            https://linkbowl.aston.dev/aston
          </Text>
        </a>
      </Box>

      <Button
        borderRadius='md'
        fontSize='sm'
        fontWeight='light'
        padding='0'
        height='32px'
        pl='4'
        pr='4'
        bg='transparent'
        border='1px solid lightgray'
        _hover={{ background: 'lightgray' }}
        color='#000'
        ml='2'
      >
        Share
      </Button>
    </Box>
  )
}

export default LinkShare
