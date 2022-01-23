import { useState } from 'react'
import { useRouter } from 'next/router'
import { apiAxios } from '@/utils/api'
import {
  Input,
  Button,
  Container,
  Box,
  FormControl,
  FormLabel,
  Text,
  Spinner,
  useToast,
} from '@chakra-ui/react'

const RegisterPage = () => {
  const router = useRouter()

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    const res = await apiAxios().post('/api/register', {
      login,
      email,
      password,
    })

    if (res.status === 200) {
      setIsLoading(false)
      toast({
        title: 'Success!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      router.push('/admin/appearance')
    } else {
      setIsLoading(false)
      if (res.status === 401) {
        toast({
          title: 'Wrong Login!',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Connection error!',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }
  return (
    <Container centerContent>
      <Box borderRadius='lg' backgroundColor='lightgray' p='14' mt='10'>
        <Text fontSize='2xl' fontWeight='bold'>
          Linkbowl Login
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id='login' isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme='green'
            mt='4'
            isDisabled={isLoading}
            type='submit'
          >
            {isLoading ? <Spinner /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default RegisterPage
