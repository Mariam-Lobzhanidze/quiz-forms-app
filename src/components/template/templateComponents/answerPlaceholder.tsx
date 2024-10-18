import "./template.scss";

interface AnswersPlaceholderProps {
  placeholderText: string;
}
const AnswersPlaceholder: React.FC<AnswersPlaceholderProps> = ({ placeholderText }) => {
  return (
    <div className="placeholder-input-container">
      <input
        disabled
        type="text"
        className="form-control bg-transparent mt-4 placeholder-input"
        placeholder={placeholderText}
      />
    </div>
  );
};

export default AnswersPlaceholder;
