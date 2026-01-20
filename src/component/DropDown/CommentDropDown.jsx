import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import deleteMyComment from "../../services/deleteComment";
import { useState } from "react";
import updateMyComment from "../../services/updateCommentApi";
import toast from "react-hot-toast";
export default function CommentDropDown({ id, callback }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentContent, setCommentContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  async function deleteComment() {
    setIsLoading(true)
    toast.success('Successfully Deleted Comment', { duration: 4000 })
    const response = await deleteMyComment(id)
    if (response.message == 'success') {
      await callback()
    }
    setIsLoading(false)
  }
  async function updateComment(e) {
    e.preventDefault()
    setIsLoading(true)
    toast.success('Successfully Updated Comment', { duration: 4000 })
    const response = await updateMyComment(commentContent, id)
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
            <Button className="bg-white border-0" onPress={onOpen}>Edit Comment</Button>
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            isDisabled={isLoading}
            onClick={deleteComment}
          >
            {isLoading ? "Deleting..." : "Delete Comment"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Comment</ModalHeader>
              <ModalBody>
                <form onSubmit={updateComment} className='flex gap-1'>
                  <Input onChange={(e) => setCommentContent(e.target.value)} placeholder='Add your Comment' variant='bordered' />
                  <Button isLoading={isLoading} type='submit' color='primary'>Update Comment</Button>
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