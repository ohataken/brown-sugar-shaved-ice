import { useState } from 'react';
import type { components } from '../api/schema';

type TagData = components['schemas']['Tag'];

type Props = {
  initialTags: TagData[];
};

function OwnerCardTagsEditor({ initialTags }: Props) {
  const [tags] = useState(initialTags);

  return (
    <form className="box">
      <label className="label">タグ</label>
      {tags.length === 0 ? (
        <p>タグがありません</p>
      ) : (
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag.slug} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </form>
  );
}

export default OwnerCardTagsEditor;
