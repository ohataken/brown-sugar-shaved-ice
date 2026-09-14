import { Link } from 'react-router-dom';

type Props = {
  uuid: string;
};

function EditButton({ uuid }: Props) {
  return (
    <Link to={`/owner/cards/${uuid}/edit`} className="button">
      編集
    </Link>
  );
}

export default EditButton;
