import { Modal } from "flowbite-react";

type Props = {
  show: boolean
  handleModal: any
  children: React.ReactNode
}

export default function WrapperModal(props: Props) {
  return (
    <Modal
      show={props.show}
      size="md"
      popup={true}
      onClose={props.handleModal}
    >
      <Modal.Header />
      <Modal.Body>
        {props.children}
      </Modal.Body>
    </Modal>
  )
}