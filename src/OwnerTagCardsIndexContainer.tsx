import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type OwnerTagData = components['schemas']['OwnerTagWithCards']['tag'];

function OwnerTagCardsIndexContainer() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [tag, setTag] = useState<OwnerTagData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!slug) return;
    client.GET('/api/owner/tags/{tag_slug}/cards', {
      params: { path: { tag_slug: slug }, header: { Authorization: token } },
    }).then(({ data, error, response }) => {
      if (data) {
        setTag(data.tag);
      } else if (response.status === 404) {
        setNotFound(true);
      } else if (error) {
        setErrors(error.errors);
      }
      setLoading(false);
    });
  }, [slug, token]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">読み込み中...</div>
      </section>
    );
  }

  if (errors.length > 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-danger">
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
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

  const now = new Date();
  const cards = tag.cards.filter((card) => card.published_at !== null && new Date(card.published_at) <= now);
  const scheduled = tag.cards.filter((card) => card.published_at !== null && new Date(card.published_at) > now);
  const drafts = tag.cards.filter((card) => card.published_at === null);

  return (
    <section className="section">
      <div className="container">
        <div className="block">
          <h1 className="tag is-large">{tag.name}</h1>
        </div>
        <p>
          <Link to={`/tags/${slug}/cards`}>公開ページを見る</Link>
        </p>
        <h2 className="title is-5">公開済み</h2>
        {cards.length === 0 ? (
          <p>公開済みのカードがありません</p>
        ) : (
          cards.map((card) => (
            <div key={card.uuid} className="card">
              <div className="card-content">
                <div className="content is-large">
                  <h1>
                    <Link to={`/owner/cards/${card.uuid}/edit?token=${encodeURIComponent(token)}`} className="has-text-inherit">{card.name}</Link>
                  </h1>
                  <p>{card.pinyin}</p>
                </div>
                <div className="tags">
                  {card.tags.map((cardTag) => (
                    <Link key={cardTag.slug} to={`/owner/tags/${cardTag.slug}/cards?token=${encodeURIComponent(token)}`} className="tag">
                      {cardTag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
        <h2 className="title is-5">公開予定</h2>
        {scheduled.length === 0 ? (
          <p>公開予定のカードがありません</p>
        ) : (
          scheduled.map((card) => (
            <div key={card.uuid} className="card">
              <div className="card-content">
                <div className="content is-large">
                  <h1>{card.name}</h1>
                  <p>{card.pinyin}</p>
                </div>
                <div className="tags">
                  {card.tags.map((cardTag) => (
                    <Link key={cardTag.slug} to={`/owner/tags/${cardTag.slug}/cards?token=${encodeURIComponent(token)}`} className="tag">
                      {cardTag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
        <h2 className="title is-5">下書き</h2>
        {drafts.length === 0 ? (
          <p>下書きのカードがありません</p>
        ) : (
          drafts.map((card) => (
            <div key={card.uuid} className="card">
              <div className="card-content">
                <div className="content is-large">
                  <h1>
                    <Link to={`/owner/drafts/${card.uuid}/edit?token=${encodeURIComponent(token)}`} className="has-text-inherit">{card.name}</Link>
                  </h1>
                  <p>{card.pinyin}</p>
                </div>
                <div className="tags">
                  {card.tags.map((cardTag) => (
                    <Link key={cardTag.slug} to={`/owner/tags/${cardTag.slug}/cards?token=${encodeURIComponent(token)}`} className="tag">
                      {cardTag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default OwnerTagCardsIndexContainer;
