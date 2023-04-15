import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  show: boolean
  handleModal: any
  confirmAction: (callback: () => void) => void
  message: string
  confirmMessage: string
  cancelMessage: string
}

export default function PopUpModal(props: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  const resetModal = () => setLoading(false)

  const clickConfirmButton = () => {
    setLoading(true)
    props.confirmAction(resetModal)
  }

  return (
    <Modal
      show={props.show}
      size="md"
      popup={true}
      onClose={props.handleModal}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {props.message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={clickConfirmButton}
              disabled={loading}
            >
              {props.confirmMessage}
            </Button>
            <Button
              color="gray"
              onClick={props.handleModal}
              disabled={loading}
            >
              {props.cancelMessage}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
