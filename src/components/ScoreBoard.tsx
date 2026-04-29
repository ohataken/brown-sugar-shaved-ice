type Props = {
  correct: number;
  viewed: number;
  skipped: number;
  total: number;
};

function ScoreBoard({ correct, viewed, skipped, total }: Props) {
  return (
    <div>
      正解 {correct} / 見た {viewed} / スキップ {skipped} / 全 {total}
    </div>
  );
}

export default ScoreBoard;
