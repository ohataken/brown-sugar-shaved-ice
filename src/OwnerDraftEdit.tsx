import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';
import OwnerCardDescriptionForm from './components/OwnerCardDescriptionForm';
import OwnerCardTagsEditor from './components/OwnerCardTagsEditor';
import OwnerDraftCardForm from './components/OwnerDraftCardForm';

type OwnerDraftCardData = components['schemas']['OwnerDraftCard'];

function OwnerDraftEdit() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [card, setCard] = useState<OwnerDraftCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!uuid) return;
    client.GET('/api/owner/cards/drafts/{uuid}', {
      params: { path: { uuid }, header: { Authorization: token } },
    }).then(({ data, error, response }) => {
      if (data) {
        setCard(data);
      } else if (response.status === 404) {
        setNotFound(true);
      } else if (error && 'errors' in error) {
        setErrors(error.errors);
      }
      setLoading(false);
    });
  }, [uuid, token]);

  const handlePublished = () => {
    navigate(`/owner/drafts?token=${encodeURIComponent(token)}`);
  };

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
        <h1 className="title">下書きを編集</h1>
        {card && <OwnerDraftCardForm card={card} token={token} onPublished={handlePublished} />}
        {card && <OwnerCardTagsEditor initialTags={card.tags} />}
        {card && <OwnerCardDescriptionForm cardUuid={card.uuid} token={token} />}
      </div>
    </section>
  );
}

export default OwnerDraftEdit;
