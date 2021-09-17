import { Box, Text } from '@chakra-ui/react'
import ShareButton from '@/components/ShareButton'
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

      <ShareButton url={"https://linkbowl.aston.dev/aston"} />
    </Box>
  )
}

export default LinkShare
