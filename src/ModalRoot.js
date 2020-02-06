import  React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import modalTypes  from './modals/index'
import Modal from 'react-modal'

const MODAL_TYPES = {
  'alert': modalTypes.alertModal,
  'confirm': modalTypes.confirmModal,
  'delete': modalTypes.deleteModal,
  'prompt': modalTypes.promptModal
}

function ModalRoot( props ) {
  let [state, setState] = useState({ modalIsOpen: props && props.modalProps.open })

  useEffect(() => {
    if(props && props.modalProps.open !== state.modalIsOpen)
      setState({ modalIsOpen: props.modalProps.open})
  })
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.modalProps.open !== this.props.modalProps.open) {
  //     this.setState({
  //       modalIsOpen: nextProps.modalProps.open
  //     })
  //   }
  // }

  const closeModal = () => {
    props.hideModal();
  }

  if (props && !props.modalType) {
    return null
  }

  const SpecifiedModal = MODAL_TYPES[props.modalType]
  return (
      // <div style={{display: 'block'}}>
      <div>
        <Modal
          isOpen={state.modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          overlayClassName="modal fade show"
          bodyOpenClassName="modal-open"
          className="modal-dialog modal-dialog-centered"
        >
          <SpecifiedModal 
            closeModal={closeModal}
            { ...props.modalProps}
          />
        </Modal>
      </div>
    )

}

const mapStateToProps = state => ({
    ...state.modalReducer
  })

export default connect(mapStateToProps, null)(ModalRoot)
