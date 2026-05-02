import { Link } from 'react-router-dom';

type Tag = {
  slug: string;
  name: string;
};

type Props = {
  name: string;
  pinyin: string;
  revealed: boolean;
  tags: Tag[];
};

function Card({ name, pinyin, revealed, tags }: Props) {
  return (
    <div>
      <div>{name}</div>
      {revealed && <div>{pinyin}</div>}
      {tags.length > 0 && (
        <div className="tags">
          {tags.map((tag) => (
            <Link key={tag.slug} to={`/tags/${tag.slug}/play`} className="tag">
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
