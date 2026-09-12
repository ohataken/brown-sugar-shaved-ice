import { useState } from 'react';
import { client } from '../api/client';
import type { components } from '../api/schema';

type OwnerCardData = components['schemas']['OwnerCard'];

type Props = {
  card: OwnerCardData;
  token: string;
};

function OwnerDraftCardForm({ card, token }: Props) {
  const [name, setName] = useState(card.name);
  const [pinyin, setPinyin] = useState(card.pinyin);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const updateCard = async (published_at?: string) => {
    setSubmitting(true);
    setSaved(false);
    setErrors([]);
    const { data, error } = await client.PUT('/api/owner/cards/{uuid}', {
      params: { path: { uuid: card.uuid }, header: { Authorization: token } },
      body: { card: { name, pinyin, published_at } },
    });
    setSubmitting(false);
    if (error && 'errors' in error) {
      setErrors(error.errors);
    }
    return data;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await updateCard();
    if (data) setSaved(true);
  };

  return (
    <form className="box" onSubmit={handleSave}>
      <div className="field">
        <label className="label">名前</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">ピンイン</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={pinyin}
            onChange={(e) => setPinyin(e.target.value)}
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
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${submitting ? 'is-loading' : ''}`}
            disabled={submitting}
          >
            保存
          </button>
        </div>
      </div>
    </form>
  );
}

export default OwnerDraftCardForm;
