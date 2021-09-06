import { strapiAxios } from '@/utils/strapi'

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

    const res = await strapiAxios().post(`/upload`,formData)
    if(res.status === 200){
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
