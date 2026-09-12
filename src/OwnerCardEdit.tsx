import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';
import OwnerCardDescriptionForm from './components/OwnerCardDescriptionForm';
import OwnerCardTagsEditor from './components/OwnerCardTagsEditor';

type TagData = components['schemas']['Tag'];

function OwnerCardEdit() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [name, setName] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!uuid) return;
    client.GET('/api/cards/{uuid}', { params: { path: { uuid } } }).then(({ data, response }) => {
      if (data) {
        setName(data.name);
        setPinyin(data.pinyin);
        setTags(data.tags);
      } else if (response.status === 404) {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [uuid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid) return;
    setSubmitting(true);
    setErrors([]);
    const { data, error } = await client.PUT('/api/owner/cards/{uuid}', {
      params: { path: { uuid }, header: { Authorization: token } },
      body: { card: { name, pinyin } },
    });
    setSubmitting(false);
    if (data) {
      navigate('/');
    } else if (error && 'errors' in error) {
      setErrors(error.errors);
    }
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
        <div className="container">カードが見つかりませんでした</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">カードを編集</h1>
        <form onSubmit={handleSubmit}>
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
                required
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
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className={`button is-primary ${submitting ? 'is-loading' : ''}`}
                disabled={submitting}
              >
                更新
              </button>
            </div>
          </div>
        </form>
        {uuid && <OwnerCardTagsEditor cardUuid={uuid} token={token} initialTags={tags} />}
        {uuid && <OwnerCardDescriptionForm cardUuid={uuid} token={token} />}
      </div>
    </section>
  );
}

export default OwnerCardEdit;
