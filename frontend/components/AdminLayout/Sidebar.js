import { Box, Image, Stack } from '@chakra-ui/react'

function Sidebar() {
  return (
    <Box
      gridRowStart={{ md: 'row1-start' }}
      gridRowEnd={{ md: 'row5' }}
      gridColumn={{ md: 'col1-start' }}
      background='white'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      display={{ base: 'none', md: 'flex' }}
    >
      <Box>
        <Image
          borderRadius='full'
          boxSize='64px'
          objectFit='cover'
          src='/logo.png'
          fallbackSrc='https://via.placeholder.com/64x64'
          p='2'
        />
      </Box>
      <Stack spacing='2' mb='4'>
        <Image
          borderRadius='full'
          boxSize='64px'
          objectFit='cover'
          fallbackSrc='https://via.placeholder.com/64x64'
          p='2'
        />
        <Image
          borderRadius='full'
          boxSize='64px'
          objectFit='cover'
          fallbackSrc='https://via.placeholder.com/64x64'
          p='2'
        />
        <Image
          borderRadius='full'
          boxSize='64px'
          objectFit='cover'
          fallbackSrc='/placeholder.png'
          p='2'
        />
      </Stack>
    </Box>
  )
}

export default Sidebar
