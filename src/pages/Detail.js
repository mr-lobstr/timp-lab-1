import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentById, deleteDocument, getEmployeeById } from '../apiRequests';
import { LoadingSpinner, ErrorAlert, Button } from '../components/UiItems';
import { useAuth } from '../AuthContext';
import securityLevels from '../securityLevels';
import './Detail.css';

function Detail() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const documentData = await getDocumentById(id);
                setDocument(documentData);
                const authorData = await getEmployeeById(documentData.author_id);
                setAuthor(authorData);
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

    if (document.security_level > user.security_level) {
        return <ErrorAlert message={'Недостаточно прав для чтения документа.'} />;
    }

    const canChange = user && (user.id === document.author_id);

    return (
        <div>
            <h2>{document.title}</h2>
            <p><b>Создан:</b> {document.date_created}</p>
            <p><b>Автор:</b> {`${author.surname} ${author.name_[0]}. ${author.middle_name[0]}`}</p>
            <p><b>Номер документа:</b> {document.registration_number}</p>
            <p><b>Уровень доступа:</b> {securityLevels[document.security_level]}</p>
            <div className="content-box">{document.content}</div>
            {
                canChange && <Button onClick={() => navigate(`/edit/${document.id}`)}>Редактировать</Button>
            }
            {
                canChange && <Button onClick={handleDelete}>Удалить</Button>
            }
        </div>
    );
}

export default Detail;
