import { useState } from 'react';
import { client } from '../api/client';

type Props = {
  token: string;
  onCreated: (uuid: string) => void;
};

function OwnerDraftCreateForm({ token, onCreated }: Props) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { data } = await client.POST('/api/owner/cards', {
      params: { header: { Authorization: token } },
      body: { card: { name } },
    });
    setSubmitting(false);
    if (data) onCreated(data.uuid);
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${submitting ? 'is-loading' : ''}`}
            disabled={submitting}
          >
            新規作成
          </button>
        </div>
      </div>
    </form>
  );
}

export default OwnerDraftCreateForm;
