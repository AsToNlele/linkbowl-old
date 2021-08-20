import { Flex,Center, Button, Box, Wrap, WrapItem, Image, Text, AspectRatio} from '@chakra-ui/react';

const Theme = ({ data, isCurrent, onClickTheme }) => {
  let handleClick = () => {
    onClickTheme(data.slug);
  };
  return (
    <>
      <Center flexDirection="column" onClick={handleClick} display="inline-block" textAlign="center">
        <Box maxW="150px" p="1" border="3px" borderColor={isCurrent ? "gray" : "transparent"} borderRadius="5px" overflow="hidden">
          <Image
            width='100%'
            src="/thumbnail.jpg"
            fallbackSrc='https://via.placeholder.com/240x340'
            border="1px"
            borderRadius='5px'
            borderColor="lightgray"
          />
        </Box>
        <Text>{data.name}</Text>
      </Center>
      {/* <Button colorScheme={isCurrent ? 'red' : 'green'} onClick={handleClick}>
        {data.slug}
      </Button> */}
    </>
  );
};

const ThemeList = ({ themes, currentTheme, onChange }) => {
  let themeClicked = (slug) => {
    onChange(slug);
  };
  return (
    <>
      <div>Theme List!</div>
      <Wrap spacing="20px">
      {themes.map((theme) => {
        let curr = false;
        if (theme.slug === currentTheme) curr = true;
        return (
          <WrapItem
            key={theme.slug}
          >
          <Theme
            data={theme}
            isCurrent={curr}
            onClickTheme={themeClicked}
          />
          </WrapItem>
        );
      })}
      </Wrap>
    </>
  );
};

export default ThemeList;
