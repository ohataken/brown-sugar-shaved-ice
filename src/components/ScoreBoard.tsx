type Props = {
  correct: number;
  viewed: number;
  total: number;
};

function ScoreBoard({ correct, viewed, total }: Props) {
  return (
    <div>
      正解 {correct} / 見た {viewed} / 全 {total}
    </div>
  );
}

export default ScoreBoard;
