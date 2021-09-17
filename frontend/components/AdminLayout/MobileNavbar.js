import { Box } from '@chakra-ui/react'
function MobileNavbar() {
  return (
    <Box
      gridRow='row1-start'
      display={{ base: 'block', md: 'none' }}
      background='white'
    >
      Nav
    </Box>
  )
}

export default MobileNavbar
