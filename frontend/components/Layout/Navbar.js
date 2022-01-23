import {
  Box,
  Switch,
  Flex,
  Button,
  IconButton,
  Text,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import { useState } from 'react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const MenuItems = ({ url, children }) => (
  <Link href={url}>
    <Text
      mt={{ base: 4, md: 0 }}
      mr={14}
      display='block'
      _hover={{ cursor: 'pointer' }}
    >
      {children}
    </Text>
  </Link>
)

export const Navbar = ({ links }) => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1rem'
      bg='white'
      color='black'
      pt='5'
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='md' mr='9' letterSpacing={'-.1rem'}>
          Linkbowl
        </Heading>
      </Flex>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems='center'
        flexGrow={1}
      >
        <MenuItems url='#'>Blog</MenuItems>
        <MenuItems url='#'>Pricing</MenuItems>
        <MenuItems url='#'>Help</MenuItems>
      </Box>
      <Flex align='center'>
        <Link href='/admin'>
          <a>
            <Text mr='5'>Log in</Text>
          </a>
        </Link>
        <Link href='/register'>
          <Button
            borderRadius='lg'
            fontSize='sm'
            fontWeight='semibold'
            padding='0'
            height='32px'
            pl='4'
            pr='4'
            bg='green.300'
            _hover={{ background: 'green.400' }}
            color='black'
          >
            SIGN UP FREE
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
