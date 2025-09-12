import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDocument, updateDocument, getDocumentById } from '../apiRequests';
import { Input, Button, ErrorAlert, Select } from '../components/UiItems';
import { useAuth } from '../AuthContext';
import securityLevels from '../securityLevels';

const validateRegNumber = (number) => {
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
    const [type, setType] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [securityLevel, setSecurityLevel] = useState(0);
    const [content, setContent] = useState('');

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
                    if (document.author_id !== user.id && user.role !== 'администратор') {
                        setError({ message: 'У вас нет прав на редактирование этого документа.' });
                        navigate(`/detail/${id}`);
                        return;
                    }

                    setTitle(document.title);
                    setType(document.type_);
                    setRegNumber(document.registration_number);
                    setContent(document.content);
                    setSecurityLevel(document.security_level);
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
            type,
            regNumber,
            securityLevel,
            content
        };

        const err = validateRegNumber(regNumber);

        if (err) {
            setError({message : err});
            return;
        }

        documentData.last_modified = new Date().toISOString().slice(0, 10);

        try {
            if (isEditMode) {
                await updateDocument(id, documentData);
            } else {
                documentData.date_created = documentData.last_modified;
                documentData.author_id = user.id;

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
                    label="Заголовок"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Input
                    label="Тип документа"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
                <Input
                    label="Регистрационный номер документа"
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    required
                />
                <Select
                    label="Гриф секретности"
                    value={securityLevel}
                    usersSequrityLevel={user.security_level}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                    options={securityLevels}
                />
                <Input
                    label="Содержание"
                    type="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <Button type="submit">Сохранить</Button>
            </form>
        </div>
    );
}

export default Form;
