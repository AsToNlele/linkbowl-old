import { Text, Heading, Button, Container } from '@chakra-ui/react'
import { useState } from 'react'
import Content from '../../components/Content'
import ThemeList from '../../components/ThemeList'

export default function Admin({ pageprop }) {
  const [page, setPage] = useState(pageprop)
  console.log(page)

  return (
    <>
      Admin Panel
      <Button>XD</Button>
      <ThemeList />
      <Container centerContent>
        <Content page={page} />
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:1337/pages?slug=aston`)
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
