import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from './api/client';
import type { components } from './api/schema';

type TagData = components['schemas']['Tag'];

function TagsIndexContainer() {
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
          <div className="fixed-grid has-1-cols">
            <div className="grid">
              {tags.map((tag) => (
                <div key={tag.slug} className="cell">
                  <Link to={`/tags/${tag.slug}`} className="tag is-large">
                    {tag.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TagsIndexContainer;
