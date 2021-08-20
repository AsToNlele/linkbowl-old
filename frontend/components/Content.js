import { Container, Image, Text, Button, Link, color } from '@chakra-ui/react'

const Content = ({ page }) => {
  let { theme } = page
  return (
    <>
      <Image
        borderRadius="full"
        boxSize="85px"
        src={page.photo}
        objectFit="cover"
        fallbackSrc="/placeholder.png"
        mt={10}
      />
      <Text
        fontSize="md"
        mt={3}
        mb={4}
        color={theme && theme.textColor ? theme.textColor : 'black'}
        fontWeight="semibold"
      >
        @{page.slug}
      </Text>
      {/* <Text fontSize="md" mt={4} color={theme.textColor}>
          {page.Description}
        </Text> */}
      {page.Button.map((btn) => (
        <Link w="100%" href={btn.Url} key={btn.id} mt={4}>
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
        </Link>
      ))}
    </>
  )
}

export default Content
