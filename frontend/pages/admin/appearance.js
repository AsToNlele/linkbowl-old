import {
  Text,
  Heading,
  Button,
  Flex,
  Box,
  Container,
  AspectRatio,
} from '@chakra-ui/react';
import { useState } from 'react';
import Content from '../../components/Content';
import ThemeList from '../../components/ThemeList';
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/lib/css/marvel-devices.min.css'

export default function Admin({ pageprop, themes }) {
  const [page, setPage] = useState(pageprop);
  console.log(page);
  console.log(themes);

  const changeTheme = (slug) => {
    let filteredTheme = themes.filter((theme) => theme.slug === slug);
    let tempPage = { ...page };
    tempPage.theme = filteredTheme[0];
    setPage(tempPage);
  };

  return (
    <>
      Admin Panel
      <Flex>
        <Box flex='2'>
          <Container centerContent>
            <ThemeList
              themes={themes}
              currentTheme={page.theme.slug}
              onChange={changeTheme}
            />
          </Container>
        </Box>

        <Box flex='1'>
          <Box style={{transform:"scale(0.5)", transformOrigin:"top"}}>
          <DeviceFrameset device="iPhone X" color="gold">
            <Container centerContent backgroundColor={page.theme.backgroundColor} height="100%" width="100%"><Content page={page} /></Container>
          </DeviceFrameset>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export async function getServerSideProps() {
  const pageRes = await fetch(`http://localhost:1337/pages?slug=aston`);
  const pageData = await pageRes.json();

  const themeRes = await fetch(`http://localhost:1337/themes`);
  const themeData = await themeRes.json();

  if (!pageData || !themeData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageprop: pageData[0],
      themes: themeData,
    },
  };
}
