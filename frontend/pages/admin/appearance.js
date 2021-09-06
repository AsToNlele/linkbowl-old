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
  Spinner,
  useToast,
} from '@chakra-ui/react'
import AdminNavbar from '@/components/Layout/AdminNavbar'
import { useState, useEffect, useRef } from 'react'
import Display from '@/components/Display'
import ThemeList from '@/components/ThemeList/ThemeList'
import ImageUpload from '@/components/ImageUpload'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import { withSession } from 'middlewares/session'
import { strapiAxios } from '@/utils/strapi'
import { API_URL } from '@/config/index'

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

  const [isLoading, setIsLoading] = useState(false)

  console.log(page)
  console.log(themes)

  const initialRender = useRef(true)

  const toast = useToast()

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
    }
  }, [page])

  const handleImageUploaded = async () => {
    const data = await strapiAxios()
      .get(`/pages/${page.id}`)
      .then((res) => res.data)
    console.log(data)
    setPage({ ...page, photo: data.photo })
  }

  const handleImageRemoval = async () => {
    const data = await strapiAxios()
      .delete(`/upload/files/${page.photo.id}`)
      .then((res) => res.data)
    console.log(data)
    if (data) {
      handleImageUploaded()
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setPage({ ...page, [name]: value })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await strapiAxios()
      .put(`/pages/${page.id}`, page)
      .catch((err) => console.log(err))

    // TODO Succcess Notification
    if (res.status === 200) {
      setIsLoading(false)
      toast({
        title: 'Saved Successfully!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Failed to Save!',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
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
          <Container centerContent maxW='container.md'>
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
                  src={page.photo ? `${API_URL}${page.photo.url}` : null}
                />

                <Grid
                  templateColumns='repeat(auto-fit, minmax(150px,1fr))'
                  width='100%'
                  alignItems='center'
                  gap='2'
                >
                  <ImageUpload
                    pageId={page.id}
                    imageUploaded={handleImageUploaded}
                  />
                  <Button colorScheme='red' onClick={handleImageRemoval}>
                    Remove
                  </Button>
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
              <Button
                colorScheme='green'
                onClick={handleSubmit}
                mt='4'
                isDisabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Save'}
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
            <Box
              backgroundColor='white'
              p='4'
              width='100%'
              display='flex'
              alignItems='center'
            >
              <ThemeList
                themes={themes}
                currentTheme={page.theme.slug}
                onChange={changeTheme}
              />
            </Box>
          </Container>
        </Box>

        <Box flex='1'>
          <Container
            style={{ transform: 'scale(0.5)', transformOrigin: 'top' }}
            centerContent
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
          </Container>
        </Box>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user')
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  console.log('SUCCESS')

  const pageData = await strapiAxios()
    .get('/pages?slug=aston')
    .then((res) => res.data)

  const themeData = await strapiAxios()
    .get('themes')
    .then((res) => res.data)

  if (!pageData || !themeData) {
    return {
      props: {},
    }
  }

  return {
    props: {
      pageprop: pageData[0],
      themes: themeData,
    },
  }
})
