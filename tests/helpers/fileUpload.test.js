import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'karlux',
  api_key: '773216615862951',
  api_secret: '2e0w0pt7DHMWg8wC1h4lwc-XHYc',
  secure: true
})

describe('testing on fileUpload helper', () => {
  test('should correctly upload the file to cloudinary', async () => {
    const imageUrl = 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'photo.jpg')

    const url = await fileUpload(file)

    // delete photo that was uploaded for test

    expect(typeof url).toBe('string')

    const photoId = url.split('/').pop().split('.').shift()

    // await cloudinary.api.delete_resources([`journal/${photoId}`])
    // to ensure that the file to delete is an image
    await cloudinary.api.delete_resources([`journal/${photoId}`], { resource_type: 'image' })
  })

  test('should return null', async () => {
    const file = new File([], 'photo.jpg')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})