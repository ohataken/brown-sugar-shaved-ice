import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';
import OwnerDraftCardForm from './components/OwnerDraftCardForm';

type OwnerCardData = components['schemas']['OwnerCard'];

function OwnerDraftEdit() {
  const { uuid } = useParams<{ uuid: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [card, setCard] = useState<OwnerCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!uuid) return;
    client.GET('/api/owner/cards/drafts/{uuid}', {
      params: { path: { uuid }, header: { Authorization: token } },
    }).then(({ data, response }) => {
      if (data) {
        setCard(data);
      } else if (response.status === 404) {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [uuid, token]);

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
        <div className="container">下書きが見つかりませんでした</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">下書きを編集</h1>
        {card && <OwnerDraftCardForm card={card} />}
      </div>
    </section>
  );
}

export default OwnerDraftEdit;
