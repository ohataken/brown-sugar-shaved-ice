import { useEffect, useState } from 'react';
import { client } from './api/client';
import type { components } from './api/schema';

type TagData = components['schemas']['Tag'];

function OwnerTagsContainer() {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.GET('/api/tags').then(({ data }) => {
      if (data) setTags(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container">読み込み中...</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">タグ一覧</h1>
        {tags.length === 0 ? (
          <div>タグがありません</div>
        ) : (
          <ul>
            {tags.map((tag) => (
              <li key={tag.slug}>
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default OwnerTagsContainer;
