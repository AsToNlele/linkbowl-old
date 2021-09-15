import {Box, Grid} from '@chakra-ui/react'

function Layout() {
  return (
	  <Box h="100vh" w="100vw">
	  <Grid height="100%" templateColumns="[col1-start] 64px  [col2-start] 1.25fr  [col3-start] 0.75fr [col3-end]" templateRows="[row1-start] 64px [row2-start] 64px [row3-start] 64px [row4-start] 64px [row4-end] auto">
	  <Box gridColumn="col1-start" gridRowStart="row1-start" gridRowEnd="row5">aaaa</Box>
	  <Box gridColumn="col2-start" gridRow="row1-start">bbbb</Box>
	  <Box gridColumn="col2-start" gridRow="row2-start">cccc</Box>
	  <Box gridColumn="col2-start" gridRow="row3-start" gridRowEnd="row5">dddd</Box>
	  <Box gridColumn="col3-start" gridRow="row1-start">eeee</Box>
	  <Box gridColumn="col3-start" gridRow="row2-start" gridRowEnd="row5">ffff</Box>
	  </Grid>
	  </Box>
  )
}

export default Layout
