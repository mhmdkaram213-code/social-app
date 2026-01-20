import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import updateMyPost from "../../services/updatePost";
import { useState } from "react";
import deleteMyPost from "../../services/deletePostApi";
import toast from "react-hot-toast";
export default function PostDropDown({ callback, postId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [postBody, setPostBody] = useState('')
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  async function addPost(e) {
    e.preventDefault()
    setIsLoading(true)
    toast.success('Successfully Updated Post', { duration: 4000 })
    const formData = new FormData()
    formData.append('body', postBody ?? '')
    if (image) {
      formData.append('image', image)
    }
    const response = await updateMyPost(formData , postId)
    if (response.message == 'success') {
      await callback()
      setPostBody('')
      setImage('')
      setImageUrl('')
    }
    setIsLoading(false)
  }
  function handleImg(e) {
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    e.target.value = ''
  }
  async function deletePost() {
    setIsLoading(true)
    toast.success('Successfully Deleted Post', { duration: 4000 })
    const response = await deleteMyPost(postId)
    if (response.message == 'success') {
      await callback()
    }
    setIsLoading(false)
  }
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button className="bg-white">...</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit">
            <Button className="bg-white border-0" onPress={onOpen}>Edit Post</Button>
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            isDisabled={isLoading}
            onClick={deletePost}
          >
            {isLoading ? "Deleting..." : "Delete Post"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Post</ModalHeader>
              <ModalBody>
                <form onSubmit={addPost}>
                  <div className="editor bg-gray-50 mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-3xl">
                    <h2 className='text-xl font-bold text-center mb-4'>New Post</h2>
                    <textarea value={postBody} onChange={(e) => setPostBody(e.target.value)} className="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none" spellCheck="false" placeholder="Add your Post" />
                    {/* icons */}
                    {imageUrl && <div className='relative'>
                      <img className='w-full h-96 object-cover' src={imageUrl} alt="post body" />
                      <svg onClick={() => {
                        setImageUrl('')
                        setImage('')
                      }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>}
                    <input onChange={handleImg} id={postId} type="file" className='hidden' />
                    <div className="icons flex text-gray-500 m-2">
                      <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <label htmlFor={postId}><svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></label>
                      <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                    </div>
                    {/* buttons */}
                    <div className="buttons flex justify-end">
                      <Button isLoading={isLoading} type='submit' className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
