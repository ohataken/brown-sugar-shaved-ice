import { useEffect, useState } from 'react';
import { client } from '../api/client';
import type { components } from '../api/schema';

type TagData = components['schemas']['Tag'];

type Props = {
  cardUuid: string;
  token: string;
  initialTags: TagData[];
};

function OwnerCardTagsEditor({ cardUuid, token, initialTags }: Props) {
  const [tags, setTags] = useState(initialTags);
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    client.GET('/api/tags').then(({ data }) => {
      if (data) setAllTags(data);
    });
  }, []);

  const attachableTags = allTags.filter((tag) => !tags.some((t) => t.slug === tag.slug));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    const { data, error } = await client.POST('/api/owner/cards/{card_uuid}/tags', {
      params: { path: { card_uuid: cardUuid }, header: { Authorization: token } },
      body: { tag_slug: selectedSlug },
    });
    setSubmitting(false);
    if (data) {
      setTags(data.tags);
      setSelectedSlug('');
    } else if (error && 'errors' in error) {
      setErrors(error.errors);
    }
  };

  const handleRemove = async (slug: string) => {
    setSubmitting(true);
    const { response } = await client.DELETE('/api/owner/cards/{card_uuid}/tags/{slug}', {
      params: { path: { card_uuid: cardUuid, slug }, header: { Authorization: token } },
    });
    setSubmitting(false);
    if (response.ok) {
      setTags((tags) => tags.filter((tag) => tag.slug !== slug));
    }
  };

  return (
    <form className="box" onSubmit={handleAdd}>
      <label className="label">タグ</label>
      {tags.length === 0 ? (
        <p>タグがありません</p>
      ) : (
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag.slug} className="tag">
              {tag.name}
              <button
                type="button"
                className="delete is-small"
                disabled={submitting}
                onClick={() => handleRemove(tag.slug)}
              />
            </span>
          ))}
        </div>
      )}
      <div className="field has-addons">
        <div className="control">
          <div className="select">
            <select value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)}>
              <option value="">タグを選択</option>
              {attachableTags.map((tag) => (
                <option key={tag.slug} value={tag.slug}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${submitting ? 'is-loading' : ''}`}
            disabled={submitting || !selectedSlug}
          >
            追加
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
  );
}

export default OwnerCardTagsEditor;
