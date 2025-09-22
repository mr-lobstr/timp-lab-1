import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Input, Button, ErrorAlert } from '../components/UiItems';
import "./LoginPage.css";

function LoginPage() {
    const [login_, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(login_, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className='login-page'>
            <h2>Вход</h2>
            {
                error && <ErrorAlert message={error} />
            }
            <form onSubmit={handleSubmit}>
                <Input
                    label="Имя пользователя"
                    type="text"
                    value={login_}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <Input
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Войти</Button>
            </form>
        </div>
    );
}

export default LoginPage;