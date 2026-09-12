import { useState } from 'react';
import type { components } from '../api/schema';

type OwnerCardData = components['schemas']['OwnerCard'];

type Props = {
  card: OwnerCardData;
};

function OwnerDraftCardForm({ card }: Props) {
  const [name, setName] = useState(card.name);
  const [pinyin, setPinyin] = useState(card.pinyin);

  return (
    <form className="box">
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
    </form>
  );
}

export default OwnerDraftCardForm;
