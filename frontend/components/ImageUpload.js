import { useState, createRef } from 'react'
import { Button, Spinner, useToast } from '@chakra-ui/react'
import { strapiAxios } from '@/utils/strapi'

const ImageUpload = ({ pageId, imageUploaded }) => {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const inputFileRef = createRef()
  const handleImageUpload = async (e) => {
    let image = e.target.files[0]

    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'page')
    formData.append('refId', pageId)
    formData.append('field', 'photo')
    setIsLoading(true)
    const res = await strapiAxios().post(`/upload`, formData)
    if (res.status === 200) {
      imageUploaded()
      setIsLoading(false)
      toast({
        title: 'Image Uploaded!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Image upload failed!',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <input
        type='file'
        onChange={handleImageUpload}
        style={{ color: 'rgba(0,0,0,0)', display: 'none' }}
        ref={inputFileRef}
      />
      <Button
        colorScheme='purple'
        onClick={() => inputFileRef.current.click()}
        isDisabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Pick an Image'}
      </Button>
    </>
  )
}

export default ImageUpload
