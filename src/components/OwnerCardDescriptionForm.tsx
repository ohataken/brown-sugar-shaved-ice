import { useState } from 'react';

function OwnerCardDescriptionForm() {
  const [content, setContent] = useState('');

  return (
    <form className="box">
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
    </form>
  );
}

export default OwnerCardDescriptionForm;
