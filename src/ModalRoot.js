import  React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import modalTypes  from './modals/index'

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
  }, [props])

  const closeModal = () => {
    props.hideModal();
  }

  if (props && !props.modalType) {
    return null
  }
  let style= state.modalIsOpen ? {display: 'block'} : {display: 'none'}
  const SpecifiedModal = MODAL_TYPES[props.modalType]
  return (
      <div className="modal" style={style}>
        <div className="modal-dialog">
          <SpecifiedModal 
            closeModal={closeModal}
            { ...props.modalProps}
          />
        </div>
      </div>
    )

}

const mapStateToProps = state => ({
    ...state.modalReducer
  })

export default connect(mapStateToProps, null)(ModalRoot)
