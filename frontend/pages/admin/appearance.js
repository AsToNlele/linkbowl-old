import { Box, Grid, useToast } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { withSession } from 'middlewares/session'
import { strapiAxios } from '@/utils/strapi'

// Layout Components
import Sidebar from '@/components/AdminLayout/Sidebar'
import Navbar from '@/components/AdminLayout/Navbar'
import LinkShare from '@/components/AdminLayout/LinkShare'
import Device from '@/components/AdminLayout/Device'
import MobileNavbar from '@/components/AdminLayout/MobileNavbar'
import Themes from '@/components/AdminLayout/Themes'

export default function Admin({ pageprop, themes, slug }) {
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
    setPage({ ...page, photo: data.photo })
  }

  const handleImageRemoval = async () => {
    const data = await strapiAxios()
      .delete(`/upload/files/${page.photo.id}`)
      .then((res) => res.data)
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

  const handleChangeTheme = async (slug) => {
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
          <Sidebar />
          <Navbar />
          <Themes
            page={page}
            onImageUploaded={handleImageUploaded}
            onImageRemoval={handleImageRemoval}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            themes={themes}
            onChangeTheme={handleChangeTheme}
          />
          <LinkShare slug={slug} />
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
    .get(`/pages?slug=${user.username}`)
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
      slug: user.username,
    },
  }
})
