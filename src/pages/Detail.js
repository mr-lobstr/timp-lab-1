import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentById, deleteDocument } from '../services/documentService';
import { LoadingSpinner, ErrorAlert, Button } from '../components/UiItems';
import { useAuth } from '../context/AuthContext';
import securityLevels from '../securityLevels';
import './Detail.css';

function Detail() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const documentData = await getDocumentById(id);
                setDocument(documentData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить этот документ?")) {
            try {
                await deleteDocument(id);
                navigate('/');
            } catch (error) {
                setError({ message: 'Не удалось удалить документ.' });
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorAlert message={error.message} />;
    }

    if (!document) {
        return <p>Документ не найден.</p>; 
    }

    if (document.securityLevel > user.securityLevel) {
        return <ErrorAlert message={'Недостаточно прав для чтения документа.'} />;
    }

    const canEdit = user && (user.id === document.authorId);
    const canDelete = user && (user.id === document.authorId);

    return (
        <div>
            <h2>{document.title}</h2>
            <p><b>Создан:</b> {document.dateCreated}</p>
            <p><b>Автор:</b> {`${user.lastname} ${user.name[0]}. ${user.middlename[0]}.`}</p>
            <p><b>Номер документа:</b> {document.documentNumber}</p>
            <p><b>Уровень доступа:</b> {securityLevels[document.securityLevel]}</p>
            <div className="content-box">{document.content}</div>
            {
                canEdit && <Button onClick={() => navigate(`/edit/${document.id}`)}>Редактировать</Button>
            }
            {
                canDelete && <Button onClick={handleDelete}>Удалить</Button>
            }
        </div>
    );
}

export default Detail;
