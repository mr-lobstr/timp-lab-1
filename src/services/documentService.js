import { api } from './api';

export const getAllDocuments = async () => {
    try {
        const response = await api.get('/documents');
        console.log("Загрузка списка пользователей");
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки списка документов:", error);
        throw error;
    }
};

export const getDocumentById = async (id) => {
    try {
        const response = await api.get(`/documents/${id}`);
        console.log(`Загрузка документа с id ${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка загрузки документа с id ${id}:`, error);
        throw error;
    }
};

export const createDocument = async (document) => {
    try {
        const response = await api.post('/documents', document);
        console.log("Создан документ:", response.data);
    } catch (error) {
        console.error("Ошибка при создании документа:", error);
        throw error;
    }
};

export const updateDocument = async (id, document) => {
    try {
        const response = await api.put(`/documents/${id}`, document);
        console.log(`Обновлён документ с ${id}:`, response.data);
    } catch (error) {
        console.error(`Ошибка при обновлении документас ${id}:`, error);
        throw error;
    }
};

export const deleteDocument = async (id) => {
    try {
        await api.delete(`/documents/${id}`);
        console.log(`Удалён документ с id ${id}:`);
    } catch (error) {
        console.error(`Ошибка при удалении документа с id ${id}:`, error);
        throw error;
    }
};

