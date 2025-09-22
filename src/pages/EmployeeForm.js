import { useAuth } from '../AuthContext';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, createEmployee, updateEmployee } from "../apiRequests";
import { Input, Button, Select, ErrorAlert, LoadingSpinner } from "../components/UiItems";
import { securityLevels, roles } from "../constants";
import "./EmployeeForm.css";

function EmployeeForm() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const { user } = useAuth();

    const [surname, setSurname] = useState('');
    const [name_, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [login_, setLogin] = useState('');
    const [role_, setRole] = useState(roles[0]);
    const [securityLevel, setSecurityLevel] = useState(0);
    const [passwordHash, setPasswordHash] = useState('');

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchEmployee = async () => {
                try {
                    const data = await getEmployeeById(id);

                    if (user.role_ !== 'администратор') {
                        setError({ message: 'Недостаточно прав для просмотра профиля сотрудника' });
                        navigate(`/employees`);
                        return;
                    }

                    setSurname(data.surname);
                    setName(data.name_);
                    setMiddleName(data.middle_name);
                    setLogin(data.login_);
                    setRole(data.role_);
                    setSecurityLevel(data.security_level);
                    setPasswordHash('');
                } catch (err) {
                    setError({ message: 'Не удалось загрузить данные сотрудника.' });
                } finally {
                    setLoading(false);
                }
            };
            fetchEmployee();
        }
    }, [id, isEditMode, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeData = {
            surname,
            name_: name_,
            middle_name: middleName,
            login_: login_,
            role_,
            security_level: securityLevel,
        };

        if (passwordHash) {
            employeeData.password_hash = passwordHash;
        }

        try {
            if (isEditMode) {
                await updateEmployee(id, employeeData);
            } else {
                await createEmployee(employeeData);
            }
            navigate('/employees');
        } catch (err) {
            setError({ message: isEditMode ? 'Не удалось обновить сотрудника.' : 'Не удалось добавить сотрудника.' });
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="employee-form-container">
            <h2>{isEditMode ? 'Профиль сотрудника' : 'Новый сотрудник'}</h2>
                {error && <ErrorAlert message={error.message} />}
            <form onSubmit={handleSubmit} className="employee-form">
                <Input label="Фамилия" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                <Input label="Имя" type="text" value={name_} onChange={(e) => setName(e.target.value)} required />
                <Input label="Отчество" type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                <Input label="Логин" type="text" value={login_} onChange={(e) => setLogin(e.target.value)} required />

                <Select label="Роль" value={role_} onChange={(e) => setRole(e.target.value)} options={roles} />
                <Select
                    label="Уровень доступа"
                    value={securityLevel}
                    usersSequrityLevel={user.security_level}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                    options={securityLevels}
                />

                <Input
                    label="Пароль"
                    type="password"
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                    required={!isEditMode}
                />

                <Button type="submit">Сохранить</Button>
                <Button type="button" onClick={() => navigate('/employees')}>Отмена</Button>
            </form>
        </div>
    );
}

export default EmployeeForm;
