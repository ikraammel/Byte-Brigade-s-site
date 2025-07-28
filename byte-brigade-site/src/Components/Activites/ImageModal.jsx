import React from 'react';
import { Modal } from 'react-bootstrap';

function ImageModal({ show, onHide, images, index, setIndex }) {
  if (!images || index === null) return null;

  const handleNext = () => {
    const nextIndex = (index + 1) % images.length;
    setIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (index - 1 + images.length) % images.length;
    setIndex(prevIndex);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="image-modal">
      <Modal.Body className="position-relative p-0">
        <img
          src={images[index]}
          alt="Aperçu"
          className="w-100"
          style={{ maxHeight: '80vh', objectFit: 'contain' }}
        />

        <button className="modal-prev" onClick={handlePrev}>‹</button>
        <button className="modal-next" onClick={handleNext}>›</button>
        <button className="btn-close position-absolute top-0 end-0 m-3" onClick={onHide} />
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;
