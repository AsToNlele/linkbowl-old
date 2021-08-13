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
import NextLink from 'next/link'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

export const Navbar = () => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="black"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Linktree
        </Heading>
      </Flex>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Blog</MenuItems>
        <MenuItems>Pricing</MenuItems>
        <MenuItems>Help</MenuItems>
      </Box>
      <Flex align="center">
        <Text mr="5">Log in</Text>
        <Button bg="green.200" color="black">
          SIGN UP FREE
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
