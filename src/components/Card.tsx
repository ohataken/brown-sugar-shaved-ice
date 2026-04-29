type Props = {
  name: string;
  pinyin: string;
  revealed: boolean;
};

function Card({ name, pinyin, revealed }: Props) {
  return (
    <div>
      <div>{name}</div>
      {revealed && <div>{pinyin}</div>}
    </div>
  );
}

export default Card;
