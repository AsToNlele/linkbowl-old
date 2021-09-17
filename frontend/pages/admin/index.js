import { Box, Grid, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { withSession } from 'middlewares/session'
import { strapiAxios } from '@/utils/strapi'

// Layout Components
import Sidebar from '@/components/AdminLayout/Sidebar'
import Navbar from '@/components/AdminLayout/Navbar'
import Analytics from '@/components/AdminLayout/Analytics'
import LinkShare from '@/components/AdminLayout/LinkShare'
import MobileNavbar from '@/components/AdminLayout/MobileNavbar'
import Device from '@/components/AdminLayout/Device'
import Links from '@/components/AdminLayout/Links'

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
      <Box h='100vh' w='100vw'>
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
          <Sidebar />
          <Navbar />
          <Analytics />
          <Links
            onAddLink={addLink}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            page={page}
            onChangeButtons={changeButtons}
          />
          <LinkShare />
          <Device page={page} />
          <MobileNavbar />
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
