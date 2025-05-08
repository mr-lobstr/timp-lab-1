import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import { ErrorAlert } from './components/UiItems';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
            <div className="App">
                <header className="App-header"><h1>Реестр документов</h1></header>
                <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/detail/:id" element={<PrivateRoute><Detail /></PrivateRoute>} />
                    <Route path="/add" element={<PrivateRoute><Form /></PrivateRoute>} />
                    <Route path="/edit/:id" element={<PrivateRoute><Form /></PrivateRoute>} />
                    <Route path="*" element={
                        <PrivateRoute><ErrorAlert message={"Ошибка 404. Ресурс не найден"}/></PrivateRoute>
                    } />
                </Routes>
                </main>
            </div>
        </Router>
        </AuthProvider>
    );
}

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return user ? children : <Navigate to="/login" />;
}

export default App;
