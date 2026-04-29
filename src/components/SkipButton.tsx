type Props = {
  onClick: () => void;
};

function SkipButton({ onClick }: Props) {
  return (
    <button type="button" className="button is-light" onClick={onClick}>
      スキップ
    </button>
  );
}

export default SkipButton;
