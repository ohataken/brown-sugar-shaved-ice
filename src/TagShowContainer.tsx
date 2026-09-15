import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type TagData = components['schemas']['TagWithCards']['tag'];

function TagShowContainer() {
  const { slug } = useParams<{ slug: string }>();
  const [tag, setTag] = useState<TagData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.GET('/api/tags/{tag_slug}/cards', {
      params: { path: { tag_slug: slug } },
    }).then(({ data, response }) => {
      if (data) {
        setTag(data.tag);
      } else if (response.status === 404) {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">読み込み中...</div>
      </section>
    );
  }

  if (notFound || !tag) {
    return (
      <section className="section">
        <div className="container">タグが見つかりませんでした</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="block">
          <h1 className="tag is-large">{tag.name}</h1>
        </div>
        <p>
          <Link to={`/tags/${slug}/play`} className="button is-primary">プレイする</Link>
        </p>
        {tag.cards.length === 0 ? (
          <p>カードがありません</p>
        ) : (
          tag.cards.map((card) => (
            <div key={card.uuid} className="card">
              <div className="card-content">
                <div className="content is-large">
                  <h1>
                    <Link to={`/cards/${card.uuid}`} className="has-text-inherit">{card.name}</Link>
                  </h1>
                  <p>{card.pinyin}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default TagShowContainer;
