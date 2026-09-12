import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type OwnerCardData = components['schemas']['OwnerCard'];

function OwnerDraftsContainer() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [cards, setCards] = useState<OwnerCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    client.GET('/api/owner/cards/drafts', {
      params: { header: { Authorization: token } },
    }).then(({ data, error }) => {
      if (data) {
        setCards(data);
      } else if (error) {
        setErrors(error.errors);
      }
      setLoading(false);
    });
  }, [token]);

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

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">下書き一覧</h1>
        {cards.length === 0 ? (
          <div>下書きがありません</div>
        ) : (
          <ul>
            {cards.map((card) => (
              <li key={card.uuid}>
                {card.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default OwnerDraftsContainer;
