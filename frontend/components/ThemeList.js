import { Center,  Box, Wrap, WrapItem, Image, Text} from '@chakra-ui/react';

const Theme = ({ data, isCurrent, onClickTheme }) => {
  let handleClick = () => {
    onClickTheme(data.slug);
  };
  return (
    <>
      <Center flexDirection="column" onClick={handleClick} display="inline-block" textAlign="center">
        <Box maxW="150px" p="1" border="2px" borderColor={isCurrent ? "gray" : "transparent"} borderRadius="5px" overflow="hidden">
          <Image
            width='100%'
            fallbackSrc='https://via.placeholder.com/240x340'
            padding="0"
            border="1px"
            borderColor="lightgray"
            borderRadius='5px'
            src="/thumbnail.jpg"
          />
        </Box>
        <Text>{data.name}</Text>
      </Center>
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
