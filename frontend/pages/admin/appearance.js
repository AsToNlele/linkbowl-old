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
  Stack,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import Display from '@/components/Display'
import ThemeList from '@/components/ThemeList/ThemeList'
import ImageUpload from '@/components/ImageUpload'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import scrollbar from '@/components/scrollbar'
import { withSession } from 'middlewares/session'
import { strapiAxios } from '@/utils/strapi'
import { API_URL } from '@/config/index'
import Link from 'next/link'

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
          background: #d7dce1 !important;
          overflow-x: hidden;
        }
      `}</style>
      <Box h='100vh' w='100vw' background=''>
        <Grid
          height='100%'
          gap='1px'
          templateColumns={{
            base: '100%',
            md: '[col1-start] 64px  [col2-start] 1.25fr  [col3-start] 0.75fr [col3-end]',
            lg: '[col1-start] 64px  [col2-start] 1.1fr  [col3-start] 0.9fr [col3-end]',
          }}
          templateRows={{
            base: '[row1-start] 48px [row2-start] 48px [row3-start] 48px [row4-start] 48px [row5-start] 48px',
            md: '[row1-start] 48px [row2-start] 48px [row3-start] 48px',
            lg: '[row1-start] 64px [row2-start] 64px [row3-start] 64px',
          }}
          borderRight='1px solid'
          borderColor='customgray'
        >
          <Box
            gridRowStart={{ md: 'row1-start' }}
            gridRowEnd={{ md: 'row5' }}
            gridColumn={{ md: 'col1-start' }}
            background='white'
            display='flex'
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
          <Box
            gridColumn={{ base: '', md: 'col2-start' }}
            gridRow={{ base: 'row4-start/row7', md: 'row2-start/row4' }}
            gridRowEnd='row5'
            background='lightgray'
            overflowY={{ base: '', md: 'scroll' }}
            css={scrollbar}
          >
            <Container centerContent maxW='container.sm'>
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
          <Box
            gridColumn={{ base: '', md: 'col3-start' }}
            gridRow={{ base: 'row2-start', md: 'row1-start' }}
            background='white'
            p='5'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            minWidth='40%'
          >
            <Text
              display='inline'
              fontSize='xs'
              fontWeight='bold'
              mr='1'
              whiteSpace='nowrap'
              flex='0'
            >
              My Linktree:
            </Text>
            <Box flex='1' minWidth='0' whiteSpace='nowrap'>
              <a href='/aston'>
                <Text
                  fontSize='xs'
                  textDecoration='underline'
                  textOverflow='ellipsis'
                  overflow='hidden'
                  whiteSpace='nowrap'
                >
                  https://linkbowl.aston.dev/aston
                </Text>
              </a>
            </Box>

            <Button
              borderRadius='md'
              fontSize='sm'
              fontWeight='light'
              padding='0'
              height='32px'
              pl='4'
              pr='4'
              bg='transparent'
              border='1px solid lightgray'
              _hover={{ background: 'lightgray' }}
              color='#000'
              ml='2'
            >
              Share
            </Button>
          </Box>
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
          <Box
            gridRow='row1-start'
            display={{ base: 'block', md: 'none' }}
            background='white'
          >
            Nav
          </Box>
        </Grid>
      </Box>
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
