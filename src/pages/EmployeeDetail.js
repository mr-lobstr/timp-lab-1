import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, deleteEmployee } from '../apiRequests';
import { LoadingSpinner, ErrorAlert, Button } from '../components/UiItems';
import { useAuth } from '../AuthContext';
import { securityLevels } from '../constants';
import './EmployeeDetail.css';

function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employeeData = await getEmployeeById(id);

                if (user.role_ !== 'администратор') {
                    setError({ message: 'Недостаточно прав для просмотра профилей сотрудников.' });
                    navigate(`/employees`);
                    return;
                }

                setEmployee(employeeData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить профиль этого сотрудника?")) {
            try {
                await deleteEmployee(id);
                navigate('/employees');
            } catch (error) {
                setError({ message: 'Не удалось удалить профиль сотрудника.' });
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorAlert message={error.message} />;
    }

    if (!employee) {
        return <p>Профиль сотрудника не найден.</p>; 
    }

    const canChange = employee.security_level <= user.security_level;

    return (
        <div className='employee-detail'>
            <h2>Профиль сотрудника</h2>
            <div className='employee-detail-container'>
                <div className='employee-fio'><b>{employee.surname} {employee.name_} {employee.middle_name || ''}</b></div>
                <div className='employee-role_'><b>Роль:</b> {employee.role_}</div>
                <div className='employee-login'><b>Логин:</b> {employee.login_}</div>
                <div className='employee-security-level'><b>Уровень доступа</b>: {securityLevels[employee.security_level]}</div>
                {
                    canChange && <Button onClick={() => navigate(`/employees/edit/${employee.id}`)}>Редактировать</Button>
                }
                {
                    canChange && (user.id !== employee.id) && <Button onClick={handleDelete}>Удалить</Button>
                }
            </div>
        </div>
    );
}

export default EmployeeDetail;
