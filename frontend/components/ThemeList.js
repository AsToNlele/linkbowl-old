import { Button } from '@chakra-ui/react'

const Theme = ({ data, isCurrent, onClickTheme }) => {
  let handleClick = () => {
    onClickTheme(data.slug)
  }
  return (
    <>
      <Button colorScheme={isCurrent ? 'red' : 'green'} onClick={handleClick}>
        {data.slug}
      </Button>
    </>
  )
}

const ThemeList = ({ themes, currentTheme, onChange }) => {
  let themeClicked = (slug) => {
    onChange(slug)
  }
  return (
    <>
      <div>Theme List!</div>
      {themes.map((theme) => {
        let curr = false
        if (theme.slug === currentTheme) curr = true
        return (
          <Theme
            key={theme.slug}
            data={theme}
            isCurrent={curr}
            onClickTheme={themeClicked}
          />
        )
      })}
    </>
  )
}

export default ThemeList
