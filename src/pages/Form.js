import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDocument, updateDocument, getDocumentById } from '../services/documentService';
import { Input, Button, ErrorAlert, Select } from '../components/UiItems';
import { useAuth } from '../context/AuthContext';
import securityLevels from '../securityLevels';

const validateDocNumber = (number) => {
    const regex = /^ГС\/([А-Я]+)-(\d{4})\/(\d{2})-([А-Я0-9]+)$/;      
    const match = number.match(regex);
          
    if (!match) {
        return "Номер документа должен соответствовать формату:\n"
             + "ГС/{Подразделение}-{Год}/{Месяц}-{Индекс}";
    };
          
    const year = parseInt(match[2], 10);
    const month = parseInt(match[3], 10);
          
    if (year < 2000 || year > 2100) {
        return "Год должен быть в диапазоне 2000-2100";
    }
    if (month < 1 || month > 12) {
        return "Месяц должен быть в диапазоне 1-12";
    }
    return null;
};

function Form() {
    const [title, setTitle] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [content, setContent] = useState('');
    const [securityLevel, setSecurityLevel] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const fetchDocument = async () => {
                try {
                    const document = await getDocumentById(id);
                    if (document.authorId !== user.id && user.securityLevel !== 'admin') {
                        setError({ message: 'У вас нет прав на редактирование этого документа.' });
                        navigate(`/detail/${id}`);
                        return;
                    }

                    setTitle(document.title);
                    setDocumentNumber(document.documentNumber);
                    setContent(document.content);
                    setSecurityLevel(document.securityLevel);
                } catch (error) {
                    setError({ message: 'Не удалось загрузить документ для редактирования.' });
                }
            };
            
            fetchDocument();
        }
    }, [id, isEditMode, user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const documentData = {
            title,
            documentNumber,
            content,
            securityLevel
        };

        const err = validateDocNumber(documentData.documentNumber);

        if (err) {
            setError({message : err});
            return;
        }

        try {
            documentData.dateCreated = new Date().toISOString().slice(0, 10);
            documentData.authorId = user.id;

            if (isEditMode) {
                await updateDocument(id, documentData);
            } else {
                await createDocument(documentData);
            }
            
            navigate('/');
        } catch (error) {
            setError({
                message: isEditMode 
                    ? 'Не удалось обновить документ.'
                    : 'Не удалось добавить документ.'
            });
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Редактировать документ' : 'Добавить документ'}</h2>
            {
                error && <ErrorAlert message={error.message} />
            }
            <form onSubmit={handleSubmit}>
                <Input
                    label="Название"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Input
                    label="Номер документа"
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    required
                />
                <Input
                    label="Содержание"
                    type="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <Select
                    label="Уровень доступа"
                    value={securityLevel}
                    usersSequrityLevel={user.securityLevel}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                    options={securityLevels}
                />
                <Button type="submit">Сохранить</Button>
            </form>
        </div>
    );
}

export default Form;
