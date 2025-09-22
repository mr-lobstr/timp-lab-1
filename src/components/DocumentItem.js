import { Link } from 'react-router-dom';
import './DocumentItem.css'

function DocumentItem({ document }) {
  return (
    <li className="document-item">
      <Link to={`/detail/${document.id}`} className="document-link">
        <span className="document-title">{document.title}</span>
        <div className="document-meta">
          <div className="document-type">{document.type_}</div>
          <div className="document-number">{document.registration_number}</div>
        </div>
      </Link>
    </li>
  );
}

export default DocumentItem;
