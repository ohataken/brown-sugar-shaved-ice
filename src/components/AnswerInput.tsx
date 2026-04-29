type Props = {
  value: string;
  onChange: (value: string) => void;
};

function AnswerInput({ value, onChange }: Props) {
  return (
    <div className="field">
      <div className="control">
        <input
          className="input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default AnswerInput;
