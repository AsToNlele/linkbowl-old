import { Text, Heading, Button, Container, Flex, Box } from '@chakra-ui/react'
import { useState } from 'react'
import Content from '../../components/Content'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import { API_URL } from '../../config/index'

export default function Admin({ pageprop }) {
  const [page, setPage] = useState(pageprop)
  console.log(page)

  return (
    <>
      Admin Panel
      <Flex>
        <Box flex='2'>
          
        </Box>
        <Box flex='1'>
          <Box style={{ transform: 'scale(0.5)', transformOrigin: 'top' }}>
            <DeviceFrameset device='iPhone X' color='gold'>
              <Container
                centerContent
                backgroundColor={page.theme.backgroundColor}
                height='100%'
                width='100%'
              >
                <Content page={page} />
              </Container>
            </DeviceFrameset>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/pages?slug=aston`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageprop: data[0],
    },
  }
}
