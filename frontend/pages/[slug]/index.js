import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { Container, Image, Text, Button, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Page({ page }) {
  const router = useRouter()
  const { slug } = router.query
  return (
    <>
      <Container maxW="container.md" centerContent>
        <Image
          borderRadius="full"
          boxSize="100px"
          src="test.png"
          fallbackSrc="https://via.placeholder.com/100"
          mt={10}
        />
        <Text fontSize="lg" mt={4}>
          @{slug}
        </Text>
        <Text fontSize="md" mt={4}>
          {page.Description}
        </Text>
        {page.Button.map((btn) => (
          <Link w="100%" href={btn.Url} key={btn.id} mt={4}>
            <Button
              colorScheme="red"
              variant="solid"
              w="100%"
              href={btn.Url}
              py={7}
              border="2px"
              borderRadius="10px"
              leftIcon
            >
              {btn.Text}
            </Button>
          </Link>
        ))}
      </Container>
    </>
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
