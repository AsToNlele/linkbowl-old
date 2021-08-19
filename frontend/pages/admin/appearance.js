import { Text, Heading, Button, Container } from '@chakra-ui/react'
import { useState } from 'react'
import Content from '../../components/Content'
import ThemeList from '../../components/ThemeList'

export default function Admin({ pageprop, themes }) {
  const [page, setPage] = useState(pageprop)
  console.log(page)
  console.log(themes)

  const changeTheme = (slug) => {
    let filteredTheme = themes.filter((theme) => theme.slug === slug)
    let tempPage = { ...page }
    tempPage.theme = filteredTheme[0]
    setPage(tempPage)
  }

  return (
    <>
      Admin Panel
      <ThemeList
        themes={themes}
        currentTheme={page.theme.slug}
        onChange={changeTheme}
      />
      <Container centerContent>
        <Content page={page} />
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const pageRes = await fetch(`http://localhost:1337/pages?slug=aston`)
  const pageData = await pageRes.json()

  const themeRes = await fetch(`http://localhost:1337/themes`)
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
