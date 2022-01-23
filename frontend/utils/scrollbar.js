export default {
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '10px',
    paddingRight: '10px',
  },

  /* Track */
  '&::-webkit-scrollbar-track': {
    background: '#f5f6f8',
  },

  /* Handle */
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
  },

  /* Handle on hover */
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}
