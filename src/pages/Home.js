import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllDocuments } from '../services/documentService';
import DocumentItem from '../components/DocumentItem';
import { LoadingSpinner, ErrorAlert, Button } from '../components/UiItems';

function Home() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getAllDocuments();
                setDocuments(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorAlert message={error.message} />;
    }

    return (
        <div>
            <h2>Список документов</h2>
            {documents.length > 0 ? (
                <ul>
                    {documents.map(document => (
                        <DocumentItem key={document.id} document={document} />
                    ))}
                </ul>
            ) : (
                <p>Документы не найдены.</p>
            )}
            <Button onClick={() => navigate("/add")}>Добавить документ</Button>
            <Button className="logout_button" onClick={() => logout()}>Выйти</Button>
        </div>
    );
}

export default Home;
