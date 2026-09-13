import { Link } from 'react-router-dom';

type Tag = {
  slug: string;
  name: string;
};

type Props = {
  uuid: string;
  name: string;
  pinyin: string;
  revealed: boolean;
  tags: Tag[];
};

function Card({ uuid, name, pinyin, revealed, tags }: Props) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content is-large">
          <h1>{name}</h1>
          {revealed && <p>{pinyin}</p>}
        </div>
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
    </div>
  );
}

export default Card;
