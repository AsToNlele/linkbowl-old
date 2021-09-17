import { Box, Text } from '@chakra-ui/react'
function Analytics() {
  return (
    <Box
      gridColumn={{ base: '', md: 'col2-start' }}
      gridRow={{ base: 'row4-start', md: 'row2-start' }}
      px='5'
      background='white'
      display='flex'
      alignItems='center'
    >
      <Text fontSize='sm' fontWeight='bold'>
        Lifetime Analytics:
      </Text>
      <Box ml='4' display='inline'>
        <Box
          display='inline-block'
          h='8px'
          w='8px'
          borderRadius='100%'
          backgroundColor='lightgreen'
        ></Box>
        <Text display='inline' ml='2'>
          Views: 6
        </Text>
      </Box>
      <Box ml='4' display='inline'>
        <Box
          display='inline-block'
          h='8px'
          w='8px'
          borderRadius='100%'
          backgroundColor='purple.300'
        ></Box>
        <Text display='inline' ml='2'>
          Clicks: 1
        </Text>
      </Box>
    </Box>
  )
}

;<Box
  gridColumn={{ base: '', md: 'col2-start' }}
  gridRow={{ base: 'row4-start', md: 'row2-start' }}
  px='5'
  background='white'
  display='flex'
  alignItems='center'
>
  <Text fontSize='sm' fontWeight='bold'>
    Lifetime Analytics:
  </Text>
  <Box ml='4' display='inline'>
    <Box
      display='inline-block'
      h='8px'
      w='8px'
      borderRadius='100%'
      backgroundColor='lightgreen'
    ></Box>
    <Text display='inline' ml='2'>
      Views: 6
    </Text>
  </Box>
  <Box ml='4' display='inline'>
    <Box
      display='inline-block'
      h='8px'
      w='8px'
      borderRadius='100%'
      backgroundColor='purple.300'
    ></Box>
    <Text display='inline' ml='2'>
      Clicks: 1
    </Text>
  </Box>
</Box>
export default Analytics
