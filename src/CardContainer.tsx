import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type CardData = components['schemas']['Card'];

function CardContainer() {
  const { uuid } = useParams<{ uuid: string }>();
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!uuid) return;
    client.GET('/api/cards/{uuid}', {
      params: { path: { uuid } },
    }).then(({ data, response }) => {
      if (data) {
        setCard(data);
      } else if (response.status === 404) {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [uuid]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">読み込み中...</div>
      </section>
    );
  }

  if (notFound) {
    return (
      <section className="section">
        <div className="container">カードが見つかりませんでした</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">{card?.name}</h1>
        <p className="subtitle">{card?.pinyin}</p>
        {card && card.tags.length > 0 && (
          <div className="tags">
            {card.tags.map((tag) => (
              <Link key={tag.slug} to={`/tags/${tag.slug}/cards`} className="tag">
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CardContainer;
