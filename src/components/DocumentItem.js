import React from 'react';
import { Link } from 'react-router-dom';

function DocumentItem({ document }) {
    return (
        <li>
            <Link to={`/detail/${document.id}`}>
                {document.title} ({document.documentNumber})
            </Link>
        </li>
    );
}

export default DocumentItem;
