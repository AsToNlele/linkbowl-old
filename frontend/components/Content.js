import { Container, Image, Text, Button, Link, color } from '@chakra-ui/react'

const Content = ({page}) => {
	const {theme} = page;
	console.log(page)
	return(
		<>
		<Image
          borderRadius="full"
          boxSize="100px"
          src={page.photo}
          objectFit="cover"
          fallbackSrc="placeholder.png"
          mt={10}
        />
        <Text fontSize="md" mt={4} color={theme.textColor} fontWeight="semibold">
          @{page.slug}
        </Text>
        {/* <Text fontSize="md" mt={4} color={theme.textColor}>
          {page.Description}
        </Text> */}
        {page.Button.map((btn) => (
          <Link w="100%" href={btn.Url} key={btn.id} mt={4}>
            <Button
              // colorScheme={theme.buttonInnerColor}
              backgroundColor="green.300"
              variant="solid"
              w="100%"
              href={btn.Url}
              py="7"
              border="2px"
              borderRadius="none"
              borderColor="green.300"
              leftIcon
            >
              <Text color={theme.buttonTextColor}>{btn.Text}</Text>
            </Button>
          </Link>
        ))}
		</>
	)
}

export default Content