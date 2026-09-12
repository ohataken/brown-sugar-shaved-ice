import { useState } from 'react';

function OwnerDraftCreateForm() {
  const [name, setName] = useState('');

  return (
    <form className="box">
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
      </div>
    </form>
  );
}

export default OwnerDraftCreateForm;
