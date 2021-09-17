import { Box, Container } from '@chakra-ui/react'
import Display from '@/components/Display'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'

function Device({ page }) {
  return (
    <Box
      gridColumn={{ md: 'col3-start' }}
      gridRow={{ md: 'row2-start' }}
      gridRowEnd={{ md: 'row5' }}
      background='lightgray'
      display={{ base: 'none', md: 'block' }}
      overflow='hidden'
    >
      <Box
        style={{ transform: 'scale(0.6)', transformOrigin: 'top' }}
        maxWidth='100%'
        mt='4'
      >
        <DeviceFrameset device='iPhone X' color='gold'>
          <Container
            centerContent
            backgroundColor={page.theme.backgroundColor}
            height='100%'
            width='100%'
          >
            <Display page={page} />
          </Container>
        </DeviceFrameset>
      </Box>
    </Box>
  )
}

export default Device
