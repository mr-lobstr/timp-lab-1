import { api } from './api';

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        console.log("Загрузка списка пользователей");
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки списка пользователей:", error);
        throw error;
    }
};
