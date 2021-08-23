import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { Container, Image, Text, Button, Link, color } from '@chakra-ui/react'
import Content from '../../components/Content'
import { API_URL } from '../../config/index'

export default function Page({ page }) {
  const { theme } = page
  console.log(page)
  return (
    <div>
      <style jsx global>{`
        body {
          background: ${theme.backgroundColor} !important;
        }
      `}</style>
      <Head>
        <title>@{page.slug}</title>
      </Head>
      <Container centerContent>
        <Content page={page} theme={page.theme} />
      </Container>
    </div>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/pages?slug=${slug}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page: data[0],
    },
  }
}
