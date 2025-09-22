import { useState, useEffect } from 'react';
import { getAllDocuments } from '../apiRequests';
import { LoadingSpinner, ErrorAlert } from '../components/UiItems';
import DocumentItem from '../components/DocumentItem';
import PageContainer from '../components/PageContainer';

function Home() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error.message} />;

    return (
        <PageContainer
            elems={documents}
            func={
                documents.map(document => (
                    <DocumentItem key={document.id} document={document} />
                ))
            }
            navigatePath="/add"
            actionMess="Добавить документ"
            elseMess="Не найдены."
        />
    );
}

export default Home;
