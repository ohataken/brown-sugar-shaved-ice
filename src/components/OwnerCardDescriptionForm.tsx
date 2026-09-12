import { useEffect, useState } from 'react';
import { client } from '../api/client';

type Props = {
  cardUuid: string;
  token: string;
};

function OwnerCardDescriptionForm({ cardUuid, token }: Props) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    client.GET('/api/owner/cards/{card_uuid}/card_description', {
      params: { path: { card_uuid: cardUuid }, header: { Authorization: token } },
    }).then(({ data, error }) => {
      if (data) {
        setContent(data.content);
      } else if (error && 'errors' in error) {
        setErrors(error.errors);
      }
      setLoading(false);
    });
  }, [cardUuid, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSaved(false);
    setErrors([]);
    const { data, error } = await client.POST('/api/owner/cards/{card_uuid}/card_description', {
      params: { path: { card_uuid: cardUuid }, header: { Authorization: token } },
      body: { card_description: { content } },
    });
    setSubmitting(false);
    if (data) {
      setSaved(true);
    } else if (error && 'errors' in error) {
      setErrors(error.errors);
    }
  };

  if (loading) {
    return <div className="box">読み込み中...</div>;
  }

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">説明</label>
        <div className="control">
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      {errors.length > 0 && (
        <div className="notification is-danger">
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {saved && <p className="help is-success">保存しました</p>}
      <div className="field">
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${submitting ? 'is-loading' : ''}`}
            disabled={submitting}
          >
            説明を保存
          </button>
        </div>
      </div>
    </form>
  );
}

export default OwnerCardDescriptionForm;
