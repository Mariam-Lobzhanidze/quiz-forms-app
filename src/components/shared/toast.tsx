interface ToastComponentProps {
  message: string;
  show: boolean;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ message, show }) => {
  return (
    <div
      className={`${show ? "show" : ""} toast position-absolute top-50 start-50 translate-middle`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
      <div className="toast-header d-flex gap-2">
        <strong className="me-auto">FormsApp</strong>
      </div>
      <div className="toast-body fs-5">{message}</div>
    </div>
  );
};

export default ToastComponent;
