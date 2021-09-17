import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
function Navbar() {
  return (
    <Box
      gridColumn={{ base: '', md: 'col2-start' }}
      gridRow={{ base: 'row3-start', md: 'row1-start' }}
      display='flex'
      background='white'
      alignItems='center'
      justifyContent={{ base: 'center', md: 'start' }}
      px='5'
    >
      <Link href='/admin'>
        <Box
          mr='8'
          cursor='pointer'
          h='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Text>Links</Text>
        </Box>
      </Link>
      <Link href='/admin/appearance'>
        <Box
          mr='8'
          cursor='pointer'
          h='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Text>Appearance</Text>
        </Box>
      </Link>
    </Box>
  )
}

export default Navbar
