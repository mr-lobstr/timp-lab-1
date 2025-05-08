import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllUsers } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (parseError) {
                    console.error('Ошибка при парсинге пользователя из localStorage:', parseError);
                    setError('Ошибка аутентификации');
                    localStorage.removeItem('user');
                }
            }
        
            setLoading(false);
        };
    
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const users = await getAllUsers();
            const foundUser = users.find(u => u.username === username && u.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
            } else {
                setError('Неверный логин или пароль');
                setUser(null);
                localStorage.removeItem('user');
                return false;
            }
            
            return true;
        } catch (error) {
            setError('Ошибка при входе в систему');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        logout,
        loading,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Загрузка...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
