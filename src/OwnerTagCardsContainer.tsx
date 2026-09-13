import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type CardData = components['schemas']['Card'];
type OwnerDraftCardData = components['schemas']['OwnerDraftCard'];

function OwnerTagCardsContainer() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [cards, setCards] = useState<CardData[]>([]);
  const [drafts, setDrafts] = useState<OwnerDraftCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.GET('/api/tags/{tag_slug}/cards', {
      params: { path: { tag_slug: slug } },
    }).then(({ data, response }) => {
      if (data) {
        setCards(data);
      } else if (response.status === 404) {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    client.GET('/api/owner/cards/drafts', {
      params: { header: { Authorization: token } },
    }).then(({ data }) => {
      if (data) {
        setDrafts(data.filter((card) => card.tags.some((tag) => tag.slug === slug)));
      }
    });
  }, [slug, token]);

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
        <div className="container">タグが見つかりませんでした</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">タグのカード一覧</h1>
        <p className="subtitle">{slug}</p>
        <h2 className="title is-5">公開済み</h2>
        {cards.length === 0 ? (
          <p>公開済みのカードがありません</p>
        ) : (
          <ul>
            {cards.map((card) => (
              <li key={card.uuid}>
                <Link to={`/owner/card/${card.uuid}/edit?token=${encodeURIComponent(token)}`}>{card.name}</Link>
              </li>
            ))}
          </ul>
        )}
        <h2 className="title is-5">下書き</h2>
        {drafts.length === 0 ? (
          <p>下書きのカードがありません</p>
        ) : (
          <ul>
            {drafts.map((card) => (
              <li key={card.uuid}>
                <Link to={`/owner/drafts/${card.uuid}/edit?token=${encodeURIComponent(token)}`}>{card.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default OwnerTagCardsContainer;
