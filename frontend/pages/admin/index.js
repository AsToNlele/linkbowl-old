import {
  Button,
  Container,
  Flex,
  Box,
  Grid,
  Spinner,
  useToast,
  Text,
  Image,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import Display from '@/components/Display'
import LinkButtonList from '@/components/LinkButton/LinkButtonList'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'
import scrollbar from '@/components/scrollbar'
import { v4 as uuidv4 } from 'uuid'
import { withSession } from 'middlewares/session'
import { strapiAxios } from '@/utils/strapi'
import Link from 'next/link'

export default function Admin({ pageprop }) {
  const [page, setPage] = useState(pageprop)
  const [isLoading, setIsLoading] = useState(false)
  console.log(page)

  const toast = useToast()

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await strapiAxios().put(`/pages/${page.id}`, {
      Button: page.Button,
    })
    if (res.status === 200) {
      console.log('success')
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

  const changeButtons = async (buttons) => {
    setPage({ ...page, Button: buttons })
  }

  const addLink = () => {
    let btns = page.Button
    let btn = {
      Text: 'New Title',
      Url: 'https://linkbowl.aston.dev',
      id: uuidv4(),
    }
    btns.unshift(btn)

    setPage({ ...page, Button: btns })
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
                src="/logo.png"
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
            gridRow={{ base: 'row4-start', md: 'row2-start' }}
            px='5'
            background='white'
            display='flex'
            alignItems='center'
          >
            <Text fontSize='sm' fontWeight='bold'>
              Lifetime Analytics:
            </Text>
            <Box ml='4' display='inline'>
              <Box
                display='inline-block'
                h='8px'
                w='8px'
                borderRadius='100%'
                backgroundColor='lightgreen'
              ></Box>
              <Text display='inline' ml='2'>
                Views: 6
              </Text>
            </Box>
            <Box ml='4' display='inline'>
              <Box
                display='inline-block'
                h='8px'
                w='8px'
                borderRadius='100%'
                backgroundColor='purple.300'
              ></Box>
              <Text display='inline' ml='2'>
                Clicks: 1
              </Text>
            </Box>
          </Box>
          <Box
            gridColumn={{ base: '', md: 'col2-start' }}
            gridRow={{ base: 'row5-start/row7', md: 'row3-start/row4' }}
            gridRowEnd='row5'
            background='lightgray'
            overflowY={{ base: '', md: 'scroll' }}
            css={scrollbar}
          >
            <Container centerContent maxW='container.sm'>
              <Grid
                templateColumns='repeat(auto-fit, minmax(150px,1fr))'
                width='100%'
                alignItems='center'
                gap='2'
                mt='14'
                mb='8'
              >
                <Button colorScheme='purple' onClick={addLink}>
                  Add New Link
                </Button>
                <Button
                  colorScheme='green'
                  onClick={handleSubmit}
                  isDisabled={isLoading}
                >
                  {isLoading ? <Spinner /> : 'Save'}
                </Button>
              </Grid>
              <LinkButtonList buttons={page.Button} onChange={changeButtons} />
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
              My Linkbowl:
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

  const pageData = await strapiAxios()
    .get('/pages?slug=aston')
    .then((res) => res.data)

  if (!pageData) {
    return {
      props: {
        pageprop: {},
      },
    }
  }

  return {
    props: {
      pageprop: pageData[0],
    },
  }
})
