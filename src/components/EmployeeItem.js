import { Link } from 'react-router-dom';
import './EmployeeItem.css';

function EmployeeItem({ employee, onClick }) {
    return (
        <li className="employee-item" onClick={onClick}>
            <Link to={`/employees/detail/${employee.id}`} className="employee-link">
                <div className="employee-name">
                    {employee.surname} {employee.name_} {employee.middle_name || ''}
                </div>
                <div className="employee-role">{employee.role_}</div>
            </Link>
        </li>
    );
}

export default EmployeeItem;
