import React from 'react';
import Modal from 'react-modal';

export const ErrorModal = (props) => (
    <Modal
      isOpen={!!props.error}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="modal"
    >
      <div className="modal-container">
        <div className="modal-message">{props.error}</div>
        <button className="modal-button" onClick={props.closeModal}>Close</button>
      </div>
    </Modal>
)

export default ErrorModal;