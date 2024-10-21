/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import { useDropzone } from "react-dropzone";

interface ModalProps {
  modalId: string;
  onImageUpload(imgData: string): void;
}

const ImageUploadModal: React.FC<ModalProps> = ({ modalId, onImageUpload }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onSelectFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      onImageUpload(dataUrl);
      closeModal();
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        onSelectFile(acceptedFiles[0]);
      }
    },
  });

  const closeModal = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              insert image
            </h1>
            <button
              ref={closeButtonRef}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div
            {...getRootProps({ className: "dropzone" })}
            className="modal-body d-flex flex-column gap-3 align-items-center justify-content-center">
            <button type="button" className="btn btn-primary w-25">
              Browse
              <input {...getInputProps()} />
            </button>{" "}
            or drag an image here
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
