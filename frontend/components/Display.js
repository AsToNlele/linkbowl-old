import { Container, Image, Text, Button, Link, color } from '@chakra-ui/react'
import {API_URL} from '@/config/index'

const Display = ({ page }) => {
  let { theme } = page
  return (
    <>  
      <Image
        borderRadius="full"
        boxSize="85px"
        src={page.photo ? `${API_URL}${page.photo.url}` : null}
        objectFit="cover"
        fallbackSrc="/placeholder.png"
        mt={20}
      />
      <Text
        fontSize="md"
        mt={3}
        mb={4}
        color={theme && theme.textColor ? theme.textColor : 'black'}
        fontWeight="semibold"
      >
        {page.title != "" ? page.title : "@"+page.slug}
      </Text>
      <Text fontSize="md" mt={2} color={theme.textColor}>
          {page.bio}
        </Text>
      {page.Button.map((btn) => (
        <a style={{width:"100%",marginTop:"10px", display: btn.Enabled ? 'block' : 'none'}} href={btn.Url} target="_blank" key={btn.id}>
          <Button
            // colorScheme={theme.buttonInnerColor}
            backgroundColor={
              theme && theme.buttonInnerColor
                ? theme.buttonInnerColor
                : 'green.300'
            }
            variant="solid"
            w="100%"
            href={btn.Url}
            py="7"
            border="2px"
            borderRadius={
              theme && theme.buttonBorderRadius
                ? theme.buttonBorderColor
                : 'none'
            }
            borderColor={
              theme && theme.buttonBorderColor
                ? theme.buttonBorderColor
                : 'green.200'
            }
            leftIcon
            color={
              theme && theme.buttonTextColor ? theme.buttonTextColor : 'white'
            }
            _hover={{
              color:
                theme && theme.buttonInnerColor
                  ? theme.buttonInnerColor
                  : 'green.200',
              backgroundColor:
                theme && theme.buttonTextColor
                  ? theme.buttonTextColor
                  : 'white',
            }}
          >
            {btn.Text}
          </Button>
        </a>
      ))}
    </>
  )
}

export default Display 
