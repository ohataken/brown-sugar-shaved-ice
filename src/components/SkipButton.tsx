type Props = {
  onClick: () => void;
};

function SkipButton({ onClick }: Props) {
  return (
    <button type="button" onClick={onClick}>
      スキップ
    </button>
  );
}

export default SkipButton;
