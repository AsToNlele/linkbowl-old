import { Button, useToast } from '@chakra-ui/react'

function ShareButton({ url }) {
  const toast = useToast()
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)

    toast({
      title: 'Saved Link to Clipboard!',
      status: 'success',
      position: 'top-right',
      duration: 5000,
      isClosable: true,
    })
  }
  return (
    <Button
      borderRadius='md'
      fontSize='sm'
      fontWeight='light'
      padding='0'
      height='32px'
      pl='4'
      pr='4'
      bg='transparent'
      border='1px solid lightgray'
      _hover={{ background: 'lightgray' }}
      color='#000'
      ml='2'
      onClick={copyToClipboard}
    >
      Share
    </Button>
  )
}

export default ShareButton
