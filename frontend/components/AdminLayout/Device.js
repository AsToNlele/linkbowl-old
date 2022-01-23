import { Box, Container } from '@chakra-ui/react'
import Display from '@/components/Display'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import { useRef, useEffect, useState } from 'react'

function Device({ page }) {
  const deviceRef = useRef()
  const deviceSize = 864
  const preferedRatio = 0.75
  const [deviceScale, setDeviceScale] = useState(0.7)

  useEffect(() => {
    const updateScale = () => {
      let calculatedScale =
        (deviceRef.current.clientHeight * preferedRatio) / deviceSize
      setDeviceScale(calculatedScale)
    }
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])
  return (
    <Box
      gridColumn={{ md: 'col3-start' }}
      gridRow={{ md: 'row2-start' }}
      gridRowEnd={{ md: 'row5' }}
      background='lightgray'
      display={{ base: 'none', md: 'block' }}
      overflow='hidden'
      ref={deviceRef}
      position='relative'
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        maxWidth='100%'
        mt='4'
        textAlign='center'
        transform={`translate(-50%,-50%) scale(${deviceScale})`}
        // transformOrigin=''
        position='absolute'
        left='50%'
        top='50%'
      >
        <DeviceFrameset device='iPhone X' color='gold'>
          <Container
            centerContent
            backgroundColor={
              page.theme?.backgroundColor ? page.theme.backgroundColor : 'white'
            }
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
