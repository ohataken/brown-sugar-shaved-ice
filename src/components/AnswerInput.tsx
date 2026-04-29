type Props = {
  value: string;
  onChange: (value: string) => void;
};

function AnswerInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default AnswerInput;
