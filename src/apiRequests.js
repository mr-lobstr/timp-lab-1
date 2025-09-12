import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


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

export const getAllEmployees = async () => {
    try {
        const response = await api.get('/employees');
        console.log("Загрузка списка сотрудников");
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки списка сотрудников:", error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await api.get(`/employees/${id}`);
        console.log(`Загрузка сотрудника с id ${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка загрузки сотрудника с id ${id}:`, error);
        throw error;
    }
};

export const createEmployee = async (employee) => {
    try {
        const response = await api.post('/employees', employee);
        console.log("Создан сотрудник:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании сотрудника:", error);
        throw error;
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const response = await api.put(`/employees/${id}`, employee);
        console.log(`Обновлён сотрудник с id ${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при обновлении сотрудника с id ${id}:`, error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        await api.delete(`/employees/${id}`);
        console.log(`Удалён сотрудник с id ${id}`);
    } catch (error) {
        console.error(`Ошибка при удалении сотрудника с id ${id}:`, error);
        throw error;
    }
};

export const getAllIncidents = async () => {
    try {
        const response = await api.get('/incidents');
        console.log("Загрузка списка инцидентов");
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки списка инцидентов:", error);
        throw error;
    }
};

export const getIncidentById = async (id) => {
    try {
        const response = await api.get(`/incidents/${id}`);
        console.log(`Загрузка инцидента с id ${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка загрузки инцидента с id ${id}:`, error);
        throw error;
    }
};

export const createIncident = async (incident) => {
    try {
        const response = await api.post('/incidents', incident);
        console.log("Создан инцидент:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании инцидента:", error);
        throw error;
    }
};

export const updateIncident = async (id, incident) => {
    try {
        const response = await api.put(`/incidents/${id}`, incident);
        console.log(`Обновлён инцидент с id ${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при обновлении инцидента с id ${id}:`, error);
        throw error;
    }
};

export const deleteIncident = async (id) => {
    try {
        await api.delete(`/incidents/${id}`);
        console.log(`Удалён инцидент с id ${id}`);
    } catch (error) {
        console.error(`Ошибка при удалении инцидента с id ${id}:`, error);
        throw error;
    }
};
