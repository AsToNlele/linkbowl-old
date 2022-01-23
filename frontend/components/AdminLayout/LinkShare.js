import { Box, Text } from '@chakra-ui/react'
import ShareButton from '@/components/ShareButton'
const LinkShare = ({ slug }) => {
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
        <a href={`/${slug}`}>
          <Text
            fontSize='xs'
            textDecoration='underline'
            textOverflow='ellipsis'
            overflow='hidden'
            whiteSpace='nowrap'
          >
            https://linkbowl.aston.dev/{slug}
          </Text>
        </a>
      </Box>

      <ShareButton url={`https://linkbowl.aston.dev/${slug}`} />
    </Box>
  )
}

export default LinkShare
