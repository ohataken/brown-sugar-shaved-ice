import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { client } from './api/client';

function OwnerTagNewContainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    const { data, error } = await client.POST('/api/owner/tags', {
      params: { header: { Authorization: token } },
      body: { tag: { name, slug } },
    });
    setSubmitting(false);
    if (data) {
      navigate(`/owner/tags/${data.slug}/cards?token=${encodeURIComponent(token)}`);
    } else if (error) {
      setErrors(error.errors);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">タグを作成</h1>
        <form className="box" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">名前</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="動詞"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">slug</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="verbs"
                pattern="[a-z0-9-]+"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
            <p className="help">小文字の英数字とハイフンだけ使えます</p>
          </div>
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className={`button is-primary ${submitting ? 'is-loading' : ''}`}
                disabled={submitting}
              >
                作成
              </button>
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
        </form>
      </div>
    </section>
  );
}

export default OwnerTagNewContainer;
