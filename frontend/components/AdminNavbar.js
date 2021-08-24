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

const MenuItems = ({url,children }) => (
  <Link href={url}><Text mt={{ base: 4, md: 0 }} mr={14} display="block" _hover={{cursor:"pointer"}}>
    {children}
  </Text>
  </Link>
)

export const AdminNavbar = ({links}) => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="white"
      color="black"
      pt="5"
      overflow="hidden"
      position="sticky"
      top="0"
      width="100%"
      zIndex="100"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="md" mr="9" letterSpacing={'-.1rem'}>
         Linkbowl 
        </Heading>
      </Flex>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems url="/admin">Links</MenuItems>
        <MenuItems url="/admin/appearance">Appearance</MenuItems>
      </Box>
      <Flex align="center">
        <Text fontWeight="bold" fontSize="sm">My Linkbowl</Text><Text fontSize="sm" pl="2" pr="4"><a href="https://linkbowl.aston.dev/aston" target="_blank" style={{textDecoration:"underline"}}>https://linkbowl.aston.dev/aston</a></Text>
        <Link href="/admin"><Button borderRadius="lg" fontSize="sm" fontWeight="light" padding="0" height="32px" pl="4" pr="4" bg="transparent" border="1px solid lightgray" borderRadius="md" _hover={{background: "lightgray"}} color="black">
          Share
        </Button></Link>
      </Flex>
    </Flex>
  )
}

export default AdminNavbar
