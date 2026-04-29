type Props = {
  onClick: () => void;
  disabled: boolean;
};

function RevealButton({ onClick, disabled }: Props) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      答えを見る
    </button>
  );
}

export default RevealButton;
