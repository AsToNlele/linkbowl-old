import {
  Center,
  Text,
  Heading,
  Button,
  Container,
  Flex,
  Box,
} from '@chakra-ui/react'
import AdminNavbar from '@/components/Layout/AdminNavbar'
import { useState } from 'react'
import Display from '@/components/Display'
import LinkButtonList from '@/components/LinkButton/LinkButtonList'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import { API_URL } from '../../config/index'

export default function Admin({ pageprop }) {
  const [page, setPage] = useState(pageprop)
  console.log(page)

  const changeButtons = async (buttons) => {
    setPage({ ...page, Button: buttons })
  }

  return (
    <>
      <style jsx global>{`
        body {
          background: #f5f6f8 !important;
        }
      `}</style>
      <AdminNavbar />
      <Flex height='calc(100vh - 68px)' backgroundColor='lightgray'>
        <Box
          flex='2'
          css={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '10px',
              paddingRight: '10px',
            },

            /* Track */
            '&::-webkit-scrollbar-track': {
              background: '#f5f6f8',
            },

            /* Handle */
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
            },

            /* Handle on hover */
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
            borderRight: '1px solid gray',
          }}
        >
          <Container centerContent maxW='container.md'>
            <LinkButtonList buttons={page.Button} onChange={changeButtons} />
          </Container>
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
                <Display page={page} />
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
