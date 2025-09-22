import { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee } from '../apiRequests';
import { LoadingSpinner, ErrorAlert } from '../components/UiItems';
import EmployeeItem from '../components/EmployeeItem';
import PageContainer from '../components/PageContainer';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployees();
                setEmployees(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);


    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error.message} />;

    return (
        <PageContainer
            elems={employees}
            func={
                employees.map(emp => (
                    <EmployeeItem employee={emp} />
                ))
            }
            navigatePath="/employees/add"
            actionMess="Добавить сотрудника"
            elseMess="Не найдены."
        />
    );
}

export default Employees;
