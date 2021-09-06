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

const LoginPage = () => {
  const router = useRouter()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const onLogin = async () => {
    setIsLoading(true)
    const res = await apiAxios().post('/api/login', { login, password })

    console.log(res)
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
      if(res.status === 401){
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
        <FormControl id='login' isRequired>
          <FormLabel>Username/Email</FormLabel>
          <Input
            type='text'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
          onClick={onLogin}
          mt='4'
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Login'}
        </Button>
      </Box>
    </Container>
  )
}

export default LoginPage
