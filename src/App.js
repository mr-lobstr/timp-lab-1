import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { ErrorAlert } from './components/UiItems';
import LoginPage from './pages/LoginPage';
import AppHeader from "./components/AppHeader";
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';
import Employees from './pages/Employees';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetail from "./pages/EmployeeDetail";
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router> <AppContent /> </Router>
        </AuthProvider>
    );
}

function AppContent() {
    return (
        <div className="App">
            {<AppHeader></AppHeader>}
            <main>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/add" element={<PrivateRoute><Form /></PrivateRoute>} />
                <Route path="/detail/:id" element={<PrivateRoute><Detail /></PrivateRoute>} />
                <Route path="/edit/:id" element={<PrivateRoute><Form /></PrivateRoute>} />

                <Route path="/employees" element={<AdminRoute><Employees /></AdminRoute>} />
                <Route path="/employees/add" element={<AdminRoute><EmployeeForm /></AdminRoute>} />
                <Route path="/employees/:id" element={<AdminRoute><EmployeeForm /></AdminRoute>} />
                <Route path="/employees/detail/:id" element={<AdminRoute><EmployeeDetail /></AdminRoute>} />
                <Route path="/employees/edit/:id" element={<AdminRoute><EmployeeForm /></AdminRoute>} />

                <Route path="*" element={<ErrorAlert message={"Ошибка 404. Ресурс не найден"} />} />
            </Routes>
            </main>
        </div>
    );
}


function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;

    return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;
    if (!user) return <Navigate to="/login" />;

    if (user.role_ !== 'администратор') {
        return <ErrorAlert message={"Доступ запрещён. Требуются права администратора"} />;
    }

    return children;
}

export default App;
