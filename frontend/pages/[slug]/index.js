import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { Container, Image, Text, Button, Link, color } from '@chakra-ui/react'
import Content from '../../components/Content'

export default function Page({ page }) {
  const {theme} = page;
  console.log(page)
  return (
   <div>
    <style jsx global>
    {`
        body {
            background: ${theme.backgroundColor} !important;
        }
    `}
    </style>
      <Head>
        <title>@{page.slug}</title>
      </Head>
      <Container maxWidth="50%" centerContent>
      <Content page={page} />
      </Container>
    </div>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`http://localhost:1337/pages?slug=${slug}`)
  const data = await res.json()
  console.log('REQUEST!!!')
  console.log(data)

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
