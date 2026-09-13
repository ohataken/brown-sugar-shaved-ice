import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type CardData = components['schemas']['Card'];

function OwnerCardContainer() {
  const { uuid } = useParams<{ uuid: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
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
        <p>
          <Link to={`/owner/card/${uuid}/edit?token=${encodeURIComponent(token)}`}>編集</Link>
        </p>
        {card && card.tags.length > 0 && (
          <div className="tags">
            {card.tags.map((tag) => (
              <Link key={tag.slug} to={`/owner/tags/${tag.slug}/cards?token=${encodeURIComponent(token)}`} className="tag">
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        {card?.card_description && (
          <div className="content">
            <p>{card.card_description.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default OwnerCardContainer;
