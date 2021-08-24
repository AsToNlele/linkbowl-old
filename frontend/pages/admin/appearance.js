import {
  Text,
  Heading,
  Button,
  Flex,
  Box,
  Container,
  Input,
  Textarea,
  Image,
  Grid,
} from '@chakra-ui/react'
import AdminNavbar from '../../components/AdminNavbar'
import { useState, useEffect, useRef } from 'react'
import Content from '../../components/Content'
import ThemeList from '../../components/ThemeList'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import { API_URL } from '../../config/index'

export default function Admin({ pageprop, themes }) {
  const [page, setPage] = useState({
    photo: pageprop.photo,
    slug: pageprop.slug,
    Button: pageprop.Button,
    theme: pageprop.theme,
    title: pageprop.title,
    bio: pageprop.bio,
    id: pageprop.id,
  })
  console.log(page)
  console.log(themes)

  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
    }
  }, [page])

  const handleChange = (e) => {
    let { name, value } = e.target

    setPage({ ...page, [name]: value })
  }

  const handleSubmit = async () => {
    const res = await fetch(`${API_URL}/pages/${page.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(page),
    })

    if (res.ok) {
      console.log('success')
    } else {
      console.log('fail')
    }
  }

  const changeTheme = async (slug) => {
    let filteredTheme = themes.filter((theme) => theme.slug === slug)
    setPage({ ...page, theme: filteredTheme[0] })
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
          <Container centerContent maxW="container.md">
            <Text
              fontSize='xl'
              fontWeight='bold'
              textAlign='left'
              width='100%'
              mt='6'
              mb='4'
            >
              Profile
            </Text>
            <Box backgroundColor='white' p='4' width='100%'>
              <Box display='flex'>
                <Image
                  borderRadius='full'
                  fallbackSrc='/placeholder.png'
                  height='96px'
                  width='96px'
                  mr='4'
                />

                <Grid
                  templateColumns='repeat(auto-fit, minmax(150px,1fr))'
                  width='100%'
                  alignItems='center'
                  gap='2'
                >
                  <Button colorScheme='purple'>Pick an image</Button>
                  <Button>Remove</Button>
                </Grid>
              </Box>
              <Input
                name='title'
                onChange={handleChange}
                value={page.title}
                placeholder='Title'
                mt='4'
              />
              <Textarea
                name='bio'
                onChange={handleChange}
                value={page.bio}
                placeholder='Bio'
                mt='4'
              />
              <Button colorScheme='green' onClick={handleSubmit} mt='4'>
                Save
              </Button>
            </Box>
            <Text
              fontSize='xl'
              fontWeight='bold'
              textAlign='left'
              width='100%'
              mt='6'
              mb='4'
            >
              Themes
            </Text>
            <Box backgroundColor='white' p='4' width='100%' display="flex" alignItems="center">
              <ThemeList
                themes={themes}
                currentTheme={page.theme.slug}
                onChange={changeTheme}
              />
            </Box>
          </Container>
        </Box>

        <Box flex='1'>
          <Container style={{ transform: 'scale(0.5)', transformOrigin: 'top' }} centerContent>
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
          </Container>
        </Box>
      </Flex>
    </>
  )
}

export async function getServerSideProps() {
  const pageRes = await fetch(`${API_URL}/pages?slug=aston`)
  const pageData = await pageRes.json()

  const themeRes = await fetch(`${API_URL}/themes`)
  const themeData = await themeRes.json()

  if (!pageData || !themeData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageprop: pageData[0],
      themes: themeData,
    },
  }
}
