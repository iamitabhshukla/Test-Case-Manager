import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path ? 'bg-indigo-800' : '';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-indigo-800">
                    TestCaseMgmt
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/dashboard" className={`block p-3 rounded hover:bg-indigo-800 ${isActive('/dashboard')}`}>
                        Dashboard
                    </Link>
                    <Link to="/projects" className={`block p-3 rounded hover:bg-indigo-800 ${isActive('/projects')}`}>
                        Projects
                    </Link>
                    <Link to="/test-cases" className={`block p-3 rounded hover:bg-indigo-800 ${isActive('/test-cases')}`}>
                        Test Cases
                    </Link>
                    <Link to="/executions" className={`block p-3 rounded hover:bg-indigo-800 ${isActive('/executions')}`}>
                        Executions
                    </Link>
                </nav>
                <div className="p-4 border-t border-indigo-800">
                    <div className="mb-2 text-sm text-indigo-300">Logged in as: {user?.username} ({user?.role})</div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {location.pathname.replace('/', '').charAt(0).toUpperCase() + location.pathname.slice(2)}
                    </h2>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
