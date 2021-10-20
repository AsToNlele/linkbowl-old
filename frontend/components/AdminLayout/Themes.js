import {
  Box,
  Container,
  Text,
  Image,
  Input,
  Textarea,
  Button,
  Grid,
  Spinner,
} from '@chakra-ui/react'
import ThemeList from '@/components/ThemeList/ThemeList'
import scrollbar from '@/components/scrollbar'
import { API_URL } from '@/config'
import ImageUpload from '@/components/ImageUpload'

function Themes({
  page,
  onImageUploaded,
  onImageRemoval,
  onChange,
  onSubmit,
  isLoading,
  themes,
  onChangeTheme,
}) {
  const handleImageUploaded = () => {
    onImageUploaded()
  }

  const handleImageRemoval = () => {
    onImageRemoval()
  }

  const handleChange = (e) => {
    onChange(e)
  }
  const handleSubmit = () => {
    onSubmit()
  }
  const handleChangeTheme = (slug) => {
    onChangeTheme(slug)
  }

  return (
    <Box
      gridColumn={{ base: '', md: 'col2-start' }}
      gridRow={{ base: 'row4-start/row7', md: 'row2-start/row4' }}
      gridRowEnd='row5'
      background='lightgray'
      overflowY={{ base: '', md: 'scroll' }}
      overflowX='hidden'
      css={scrollbar}
    >
      <Container centerContent maxW='container.sm'>
        <Text
          fontSize='xl'
          fontWeight='bold'
          textAlign='left'
          width='100%'
          mt='6'
          mb='4'
        >
          Profile
        </Text>
        <Box backgroundColor='white' p='4' width='100%'>
          <Box display='flex'>
            <Image
              borderRadius='full'
              fallbackSrc='/placeholder.png'
              height='96px'
              width='96px'
              mr='4'
              src={page.photo ? `${API_URL}${page.photo.url}` : null}
            />

            <Grid
              templateColumns='repeat(auto-fit, minmax(150px,1fr))'
              width='100%'
              alignItems='center'
              gap='2'
            >
              <ImageUpload
                pageId={page.id}
                imageUploaded={handleImageUploaded}
              />
              <Button colorScheme='red' onClick={handleImageRemoval}>
                Remove
              </Button>
            </Grid>
          </Box>
          <Input
            name='title'
            onChange={handleChange}
            value={page.title}
            placeholder='Title'
            mt='4'
          />
          <Textarea
            name='bio'
            onChange={handleChange}
            value={page.bio}
            placeholder='Bio'
            mt='4'
          />
          <Button
            colorScheme='green'
            onClick={handleSubmit}
            mt='4'
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Save'}
          </Button>
        </Box>
        <Text
          fontSize='xl'
          fontWeight='bold'
          textAlign='left'
          width='100%'
          mt='6'
          mb='4'
        >
          Themes
        </Text>
        <Box
          backgroundColor='white'
          p='4'
          width='100%'
          display='flex'
          alignItems='center'
        >
          <ThemeList
            themes={themes}
            currentTheme={page.theme.slug}
            onChange={handleChangeTheme}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Themes
