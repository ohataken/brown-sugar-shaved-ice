import { useEffect, useState } from 'react';
import { client } from '../api/client';

type Props = {
  cardUuid: string;
  token: string;
};

function OwnerCardDescriptionForm({ cardUuid, token }: Props) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.GET('/api/owner/cards/{card_uuid}/card_description', {
      params: { path: { card_uuid: cardUuid }, header: { Authorization: token } },
    }).then(({ data }) => {
      if (data) {
        setContent(data.content);
      }
      setLoading(false);
    });
  }, [cardUuid, token]);

  if (loading) {
    return <div className="box">読み込み中...</div>;
  }

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
