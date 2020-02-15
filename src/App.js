import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import ModalRoot from './ModalRoot';
import { showModal, hideModal } from './store/modalActions';
import './css/index.css'
import './css/template.css'
import './css/app.css'
// import './css/modal.css'

const MESSAGE = "A redux modal component."
function App( props ) {
  console.log("props", props)
  let [state, setState] = useState({ address: '' })

  const closeModal = () => {
    props && props.hideModal();
  }

  const onInputChange = (event) => {
    setState({ [event.target.name]: event.target.value })
  }

  const showInput = () => {
    const { address } = state
    const message = address ? `Address: ${address}` : 'No address entered'
    props && props.showModal({
      open: true,
      title: 'Prompt Modal',
      message,
      closeModal: closeModal
    }, 'alert')
  }

  const openAlertModal = () => {
    props && props.showModal({
      open: true,
      title: 'Alert Modal',
      message: MESSAGE,
      closeModal: closeModal
    }, 'alert')
  }

  const openConfirmModal = () => {
    props && props.showModal({
      open: true,
      title: 'Confirm Modal',
      message: MESSAGE,
      confirmAction: closeModal,
      closeModal: closeModal
    }, 'confirm')
  }

  const openDeleteModal = () => {
    props && props.showModal({
      open: true,
      title: 'Delete Modal',
      message: MESSAGE,
      deleteAction: closeModal,
      closeModal: closeModal,
      deleteText: 'delete'
    }, 'delete')
  }

  const openPromptModal = () => {
    props && props.showModal({
      open: true,
      title: 'Prompt Modal',
      fields: [{
        name: 'address',
        placeholder: 'Enter your address',
        showLabel: false
      }],
      onInputChange: onInputChange,
      confirmAction: showInput
    }, 'prompt')
  }

    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">A Redux Modal Component</h1>
        </header>
        <div className="container">
          <div className="modal-types row d-flex justify-content-center align-items-center">
            <div className="col">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={openAlertModal}
              >alert</button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={openConfirmModal}
              >confirm</button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={openDeleteModal}
              >delete</button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={openPromptModal}
              >prompt</button>
            </div>
          </div>
        </div>
        <span className="app-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </span>
        <ModalRoot hideModal={ props.hideModal} />
      </div>
    );

}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    console.log("modalProps, modalType", modalProps, modalType)
    dispatch(showModal({modalProps, modalType}))
  }
})

export default connect(null, mapDispatchToProps)(App);



