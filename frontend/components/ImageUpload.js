import { useState,useRef, createRef } from 'react'
import { Button } from '@chakra-ui/react'
import { API_URL } from '@/config/index'

const ImageUpload = ({ pageId, imageUploaded }) => {

  const inputFileRef = createRef()
  const handleImageUpload = async (e) => {
    console.log(e.target.files[0])

    let image = e.target.files[0]

    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'page')
    formData.append('refId', pageId)
    formData.append('field', 'photo')
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      console.log('success')
      console.log(res)
      imageUploaded()
    }
  }

  return (
    <>
      <input type='file' onChange={handleImageUpload} style={{color:"rgba(0,0,0,0)",display:"none"}} ref={inputFileRef}/>
      <Button colorScheme="purple" onClick={()=>inputFileRef.current.click()}>Pick an Image</Button>
    </>
  )
}

export default ImageUpload
