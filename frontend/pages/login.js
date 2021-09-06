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
  Text
} from '@chakra-ui/react'

const LoginPage = () => {
  const router = useRouter()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    axios.post('/api/login', { login, password }).then((user) => {
      console.log(user)
      router.push('/admin/appearance')
    })
  }
  return (
    <Container centerContent>
    <Box borderRadius="lg" backgroundColor="lightgray" p="14" mt="10">
      <Text fontSize="2xl" fontWeight="bold">Linkbowl Login</Text>
      <FormControl id="login" isRequired>
        <FormLabel>Username/Email</FormLabel>
        <Input
          type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme='green' onClick={onLogin} mt="4">
        Login
      </Button>
      </Box>
    </Container>
  )
}

export default LoginPage
