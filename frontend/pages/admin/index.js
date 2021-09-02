import {
  Center,
  Text,
  Button,
  Container,
  Flex,
  Box,
  Grid,
} from '@chakra-ui/react'
import AdminNavbar from '@/components/Layout/AdminNavbar'
import { useState } from 'react'
import Display from '@/components/Display'
import LinkButtonList from '@/components/LinkButton/LinkButtonList'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import { API_URL } from '../../config/index'
import { v4 as uuidv4 } from 'uuid';

export default function Admin({ pageprop }) {
  const [page, setPage] = useState(pageprop)
  console.log(page)

  const handleSubmit = async () => {
    let btns = page.Button
    btns.forEach(function(btn){ delete btn.id; delete btn._id });
    const res = await fetch(`${API_URL}/pages/${page.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"Button":btns}),
    })

    if (res.ok) {
      console.log('success')
    } else {
      console.log('fail')
    }
  }

  const changeButtons = async (buttons) => {
    setPage({ ...page, Button: buttons })
  }

  const addLink = () => {
    let btns = page.Button;
    let btn = {
      Text: "New Title",
      Url: "https://linkbowl.aston.dev",
      id: uuidv4()
    }
    btns.unshift(btn)

    setPage({...page, Button: btns})
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
            <Grid
              templateColumns='repeat(auto-fit, minmax(150px,1fr))'
              width='100%'
              alignItems='center'
              gap='2'
              mt="14"
              mb="8"
            >
              <Button colorScheme='purple' onClick={addLink}>Add New Link</Button>
              <Button colorScheme='green' onClick={handleSubmit}>Save</Button>
            </Grid>
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
